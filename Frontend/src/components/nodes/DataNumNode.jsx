import React from 'react'
import { Handle, Position } from "@xyflow/react"
import '../../styles/components/nodes/DataNumNode.css'

function DataNumNode({ data }) {
  return (
    <div>
      <div className="DataNumNodeNameTab">
        <h3>DataNum Node</h3>
      </div>
      <div className="DataNumNodeMainSection">
        <Handle className='handle' type="target" position={Position.Left} />
        <p>Set</p>

        <p>Number</p>
        <input type="number" />

        <Handle className='handle' type="source" position={Position.Right} />
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
                backgroundColor: '#774835',
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

export default DataNumNode
