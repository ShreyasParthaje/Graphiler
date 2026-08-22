import React from 'react'
import { Position, Handle } from '@xyflow/react'
import '../../styles/components/nodes/DatasetNode.css'

function DatasetNode() {
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
      </div>
    </div>
  )
}

export default DatasetNode
