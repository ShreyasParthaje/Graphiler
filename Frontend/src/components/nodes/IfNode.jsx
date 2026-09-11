import React from 'react'
import { Handle, Position } from '@xyflow/react'
import '../../styles/components/nodes/IfNode.css'

const SNAP_RADIUS = 50

function IfNode() {

    return (
        <div>
            <div className="IfNodeNameTab">
                <h3>If Node</h3>
            </div>
            <div className="IfNodeMainSection">
                <Handle type="target" position={Position.Left} />
                <p>Var</p>
                <div>
                    <p>Value</p>
                    <input type="text" />
                </div>
                <div>
                    <p>Comparator</p>
                    <div>
                        <button id="equals" >=</button>
                        <button id="notEquals">≠</button>
                        <button id="lessThanOrEquals">≤</button>
                        <button id="greaterThanOrEquals">≥</button>
                        <button id="greaterThan">&gt;</button>
                        <button id="lessThan">&lt;</button>
                    </div>
                </div>
                <div className="receptacle"></div>
            </div>
        </div>
    )
}

export default IfNode
