import React from 'react'
import { Handle, Position } from "@xyflow/react"
import '../../styles/components/nodes/NumExNode.css'

function NumExNode() {
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
      </div>
    </div>
  )
}

export default NumExNode
