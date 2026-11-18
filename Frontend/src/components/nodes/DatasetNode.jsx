import React from 'react'
import { Position, Handle } from '@xyflow/react'
import '../../styles/components/nodes/DatasetNode.css'

function DatasetNode({ data }) {
  return (
    <div>
      <div className="DatasetNodeNameTab">
        <h3>Dataset Node</h3>
      </div>

      <div className="DatasetNodeMainSection">
        <Handle className="handle" type="target" position={Position.Left} id="i_start" />
        <p>i_start</p>

        <Handle className="handle" type="target" position={Position.Left} id="i_end" />
        <p>i_end</p>
        <Handle className="handle" type="target" position={Position.Left} id="j_start" />
        <p>j_start</p>
        <Handle className="handle" type="target" position={Position.Left} id="j_end" />
        <p>j_end</p>

        <Handle className="handle" type="source" position={Position.Right} />
        <p>Output</p>

        {data?.showChainReceptacle && (
          <div
            style={{
              width: '175px',
              height: '30px',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              backgroundColor: 'transparent',
              borderRadius: '5px 5px 0 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#433173',
                clipPath: 'path("M 0 30 L 5 5 A 5 5 0 0 1 10 0 H 165 A 5 5 0 0 1 170 5 L 175 30 Z")',
                WebkitClipPath: 'path("M 0 30 L 5 5 A 5 5 0 0 1 10 0 H 165 A 5 5 0 0 1 170 5 L 175 30 Z")',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DatasetNode
