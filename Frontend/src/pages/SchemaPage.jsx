import { useEffect, useState, useCallback } from 'react'
import { ReactFlow, Panel, Background, applyNodeChanges, applyEdgeChanges, addEdge, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import '../styles/pages/SchemaPage.css'

import ToolBar from '../components/ToolBar';
import TabBar from '../components/TabBar';

import DatasetNode from '../components/nodes/DatasetNode.jsx'
import NumExNode from '../components/nodes/NumExNode.jsx';
import DataNumNode from '../components/nodes/DataNumNode.jsx';
import DataMatrixNode from '../components/nodes/DataMatrixNode.jsx';
import MathNumNode from '../components/nodes/MathNumNode.jsx';
import MathMatrixNode from '../components/nodes/MathMatrixNode.jsx';

const nodeTypes={
  datasetNode: DatasetNode,
  numExNode: NumExNode,
  dataNumNode: DataNumNode,
  dataMatrixNode: DataMatrixNode,
  mathNumNode: MathNumNode,
  mathMatrixNode: MathMatrixNode,
};

function SchemaPage({ pageIndex, setPageIndex }) {
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Node and Edge change and connection handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (changes) => setEdges((edgesSnapshot) => addEdge(changes, edgesSnapshot)),
    []
  );

  return (
    <div className='SchemaSection'>
      <ReactFlow style={{width: '100%', height: '100%'}} 
      nodes={nodes} edges={edges} nodeTypes={nodeTypes}
      onEdgesChange={onEdgesChange} onNodesChange={onNodesChange} onConnect={onConnect}>
        <Panel position='top-center'>
          <TabBar pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </Panel>
        <Panel position='bottom-center'>
          <ToolBar setNodes={setNodes} setEdges={setEdges} />
        </Panel>
        <Background color='white' bgColor='#2B2E37' />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default SchemaPage
