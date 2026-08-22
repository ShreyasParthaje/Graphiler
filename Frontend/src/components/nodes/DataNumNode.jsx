import React from 'react'
import { Handle, Position } from "@xyflow/react"
import '../../styles/components/nodes/DataNumNode.css'

function DataNumNode() {
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
      </div>
    </div>
  )
}

export default DataNumNode
