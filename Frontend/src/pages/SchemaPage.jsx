import { useEffect, useState, useCallback } from 'react'
import { ReactFlow, Panel, Background, applyNodeChanges, applyEdgeChanges, addEdge, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import '../styles/pages/SchemaPage.css'

import ToolBar from '../components/ToolBar';
import TabBar from '../components/TabBar';
import Run from '../components/Run.jsx'
import UploadDownload from '../components/UploadDownload.jsx'

import DatasetNode from '../components/nodes/DatasetNode.jsx'
import NumExNode from '../components/nodes/NumExNode.jsx';
import DataNumNode from '../components/nodes/DataNumNode.jsx';
import DataMatrixNode from '../components/nodes/DataMatrixNode.jsx';
import MathNumNode from '../components/nodes/MathNumNode.jsx';
import MathMatrixNode from '../components/nodes/MathMatrixNode.jsx';
import IfNode from '../components/nodes/IfNode.jsx';
import ElseNode from '../components/nodes/ElseNode.jsx';

const NODE_WIDTH = 267;
const NAME_TAB_WIDTH = 175;
const NAME_TAB_HEIGHT = 30;
const NAME_TAB_X_OFFSET = (NODE_WIDTH - NAME_TAB_WIDTH) / 2;
const SNAP_RADIUS = 80;

const DEFAULT_NODE_HEIGHT = {
  ifNode: 202,
  elseNode: 79,
  datasetNode: 212,
  numExNode: 212,
  dataNumNode: 212,
  dataMatrixNode: 212,
  mathNumNode: 212,
  mathMatrixNode: 212,
};

const getNodeHeight = (node) => {
  if (typeof node?.measured?.height === 'number' && node.measured.height > 0) return node.measured.height;
  if (typeof node?.height === 'number' && node.height > 0) return node.height;
  return DEFAULT_NODE_HEIGHT[node.type] ?? 212;
};

const getAbsoluteNodePosition = (node, nodeMap) => {
  if (!node) return { x: 0, y: 0 };

  let x = node.position.x;
  let y = node.position.y;
  let parentId = node.parentId;
  const seen = new Set();

  while (parentId && !seen.has(parentId)) {
    seen.add(parentId);
    const parentNode = nodeMap.get(parentId);
    if (!parentNode) break;
    x += parentNode.position.x;
    y += parentNode.position.y;
    parentId = parentNode.parentId;
  }

  return { x, y };
};

const getReceptacleRect = (node) => {
  const nodeMap = new Map([[node.id, node]]);
  const absolutePosition = getAbsoluteNodePosition(node, nodeMap);
  const nodeHeight = getNodeHeight(node);
  const left = absolutePosition.x + NAME_TAB_X_OFFSET;
  const top = absolutePosition.y + nodeHeight - NAME_TAB_HEIGHT;

  return {
    left,
    top,
    right: left + NAME_TAB_WIDTH,
    bottom: top + NAME_TAB_HEIGHT,
  };
};

const getReceptacleRectWithMap = (node, nodeMap) => {
  const absolutePosition = getAbsoluteNodePosition(node, nodeMap);
  const nodeHeight = getNodeHeight(node);
  const left = absolutePosition.x + NAME_TAB_X_OFFSET;
  const top = absolutePosition.y + nodeHeight - NAME_TAB_HEIGHT;

  return {
    left,
    top,
    right: left + NAME_TAB_WIDTH,
    bottom: top + NAME_TAB_HEIGHT,
  };
};

const getRectCenter = (rect) => ({
  x: (rect.left + rect.right) / 2,
  y: (rect.top + rect.bottom) / 2,
});

const buildChildMap = (nodesSnapshot) => {
  const childMap = new Map();

  for (const node of nodesSnapshot) {
    if (node.parentId && !childMap.has(node.parentId)) {
      childMap.set(node.parentId, node.id);
    }
  }

  return childMap;
};

const isEligibleReceptacleHost = (node, childMap) => {
  const isConditionalNode = node.type === 'ifNode' || node.type === 'elseNode';
  const isAlreadyInChain = Boolean(node.parentId) || childMap.has(node.id);
  const hasChainChild = childMap.has(node.id);

  return !hasChainChild && (isConditionalNode || isAlreadyInChain);
};

const isDescendantOf = (potentialDescendantId, rootId, childMap) => {
  const seen = new Set();
  let childId = childMap.get(rootId);

  while (childId && !seen.has(childId)) {
    if (childId === potentialDescendantId) return true;
    seen.add(childId);
    childId = childMap.get(childId);
  }

  return false;
};

const getDescendantIds = (startId, childMap) => {
  const descendantIds = new Set();
  const stack = [startId];

  while (stack.length > 0) {
    const currentId = stack.pop();
    const childId = childMap.get(currentId);
    if (!childId || descendantIds.has(childId)) continue;
    descendantIds.add(childId);
    stack.push(childId);
  }

  return Array.from(descendantIds);
};

const getChainRootId = (nodeId, nodeMap) => {
  let currentId = nodeId;
  const seen = new Set();

  while (currentId && !seen.has(currentId)) {
    seen.add(currentId);
    const parentId = nodeMap.get(currentId)?.parentId;
    if (!parentId || !nodeMap.has(parentId)) return currentId;
    currentId = parentId;
  }

  return nodeId;
};

const normalizeChainData = (nodesSnapshot) => {
  const nodeIds = new Set(nodesSnapshot.map((node) => node.id));
  const sanitizedNodes = nodesSnapshot.map((node) => {
    const {
      chainParentId,
      chainChildId,
      chainRootId,
      chainUnitId,
      showChainReceptacle,
      ...remainingData
    } = node.data ?? {};

    const isValidParent = node.parentId && nodeIds.has(node.parentId) && node.parentId !== node.id;

    return {
      ...node,
      ...(isValidParent ? {} : { parentId: undefined }),
      data: {
        ...remainingData,
      },
    };
  });

  const childMap = buildChildMap(sanitizedNodes);
  const nodeMap = new Map(sanitizedNodes.map((node) => [node.id, node]));

  return sanitizedNodes.map((node) => {
    const inChain = Boolean(node.parentId) || childMap.has(node.id);
    if (!inChain) return node;

    const rootId = getChainRootId(node.id, nodeMap);
    const isTail = !childMap.has(node.id);
    const shouldShowReceptacle = isTail && node.type !== 'ifNode' && node.type !== 'elseNode';

    return {
      ...node,
      data: {
        ...node.data,
        chainRootId: rootId,
        chainUnitId: rootId,
        ...(shouldShowReceptacle ? { showChainReceptacle: true } : {}),
      },
    };
  });
};

const nodeTypes = {
  datasetNode: DatasetNode,
  numExNode: NumExNode,
  dataNumNode: DataNumNode,
  dataMatrixNode: DataMatrixNode,
  mathNumNode: MathNumNode,
  mathMatrixNode: MathMatrixNode,
  ifNode: IfNode,
  elseNode: ElseNode,
};

const START_ID=1000;

function SchemaPage({ pageIndex, setPageIndex }) {
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nextId, setNextId] = useState(START_ID);

  // Node and Edge change and connection handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => normalizeChainData(applyNodeChanges(changes, nodesSnapshot))),
    []
  );

  const onNodeDragStart = useCallback(
    (_event, draggedNode) => {
      setNodes((nodesSnapshot) => {
        const nodeMap = new Map(nodesSnapshot.map((node) => [node.id, node]));
        const draggedSnapshot = nodeMap.get(draggedNode.id);
        if (!draggedSnapshot?.parentId) return nodesSnapshot;

        const absolutePosition = getAbsoluteNodePosition(draggedSnapshot, nodeMap);
        const detachedNodes = nodesSnapshot.map((node) => {
          if (node.id !== draggedNode.id) return node;
          return {
            ...node,
            parentId: undefined,
            position: absolutePosition,
          };
        });

        return normalizeChainData(detachedNodes);
      });
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (changes) => setEdges((edgesSnapshot) => addEdge(changes, edgesSnapshot)),
    []
  );

  const onNodeDragStop = useCallback(
    (_event, draggedNode) => {
      setNodes((nodesSnapshot) => {
        const draggedSnapshot = nodesSnapshot.find((node) => node.id === draggedNode.id);
        if (!draggedSnapshot) return nodesSnapshot;

        const nodeMap = new Map(nodesSnapshot.map((node) => [node.id, node]));
        const childMap = buildChildMap(nodesSnapshot);
        const draggedAbsolutePosition = getAbsoluteNodePosition(draggedSnapshot, nodeMap);
        const draggedTabRect = {
          left: draggedAbsolutePosition.x + NAME_TAB_X_OFFSET,
          top: draggedAbsolutePosition.y,
          right: draggedAbsolutePosition.x + NAME_TAB_X_OFFSET + NAME_TAB_WIDTH,
          bottom: draggedAbsolutePosition.y + NAME_TAB_HEIGHT,
        };
        const draggedCenter = getRectCenter(draggedTabRect);

        let bestHost = null;
        let bestDistance = Number.POSITIVE_INFINITY;

        for (const candidate of nodesSnapshot) {
          if (candidate.id === draggedNode.id) continue;
          if (!isEligibleReceptacleHost(candidate, childMap)) continue;
          if (isDescendantOf(candidate.id, draggedNode.id, childMap)) continue;

          const receptacleRect = getReceptacleRectWithMap(candidate, nodeMap);
          const receptacleCenter = getRectCenter(receptacleRect);
          const distance = Math.hypot(
            receptacleCenter.x - draggedCenter.x,
            receptacleCenter.y - draggedCenter.y
          );

          if (distance <= SNAP_RADIUS && distance < bestDistance) {
            bestDistance = distance;
            bestHost = candidate;
          }
        }

        if (!bestHost) {
          return normalizeChainData(nodesSnapshot);
        }

        const snappedNodes = nodesSnapshot.map((node) => {
          if (node.id === draggedNode.id) {
            const hostAbsolutePosition = getAbsoluteNodePosition(bestHost, nodeMap);
            const hostReceptacleRect = getReceptacleRectWithMap(bestHost, nodeMap);

            const snappedAbsoluteX = hostReceptacleRect.left - NAME_TAB_X_OFFSET;
            const snappedAbsoluteY = hostReceptacleRect.top;

            return {
              ...node,
              parentId: bestHost.id,
              position: {
                x: snappedAbsoluteX - hostAbsolutePosition.x,
                y: snappedAbsoluteY - hostAbsolutePosition.y,
              },
            };
          }

          return node;
        });

        return normalizeChainData(snappedNodes);
      });
    },
    [setNodes]
  );

  return (
    <div className='SchemaSection'>
      <ReactFlow style={{ width: '100%', height: '100%' }}
        nodes={nodes} edges={edges} nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange} onNodesChange={onNodesChange} onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        elevateNodesOnSelect={false}
        onNodeDragStop={onNodeDragStop}>
        <Panel position='top-center'>
          <TabBar pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </Panel>
        <Panel position='bottom-center'>
          <ToolBar nextId={nextId} setNextId={setNextId} setNodes={setNodes} setEdges={setEdges} />
        </Panel>
        <Panel position='top-right'>
          <Run />
        </Panel>
        <Panel position='top-left'>
          <UploadDownload schema={{ nodes, edges }} setNodes={setNodes} setEdges={setEdges} setNextId={setNextId} />
        </Panel>
        <Background color='white' bgColor='#2B2E37' />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default SchemaPage
