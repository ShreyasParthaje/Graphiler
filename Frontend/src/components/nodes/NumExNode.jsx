import React from 'react'
import { Handle, Position } from "@xyflow/react"
import '../../styles/components/nodes/NumExNode.css'

function NumExNode({ data }) {
  return (
    <div>
      <div className="NumExNodeNameTab">
        <h3>NumEx Node</h3>
      </div>
      <div className="NumExNodeMainSection">
        <Handle className="Handle" type="target" position={Position.Left} id="X" />
        <p>X</p>
        <Handle className="Handle" type="target" position={Position.Left} id="i" />
        <p>i</p>
        <Handle className="Handle" type="target" position={Position.Left} id="j" />
        <p>j</p>

        <Handle className="Handle" type="source" position={Position.Right} />
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
                backgroundColor: '#756F32',
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

export default NumExNode
