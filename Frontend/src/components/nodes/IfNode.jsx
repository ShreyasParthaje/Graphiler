import React, { useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import '../../styles/components/nodes/IfNode.css'

function IfNode() {
    const [selectedComparator, setSelectedComparator] = useState('equals')

    const comparatorButtons = [
        { id: 'equals', symbol: '=' },
        { id: 'notEquals', symbol: '≠' },
        { id: 'lessThanOrEquals', symbol: '≤' },
        { id: 'greaterThanOrEquals', symbol: '≥' },
        { id: 'greaterThan', symbol: '>' },
        { id: 'lessThan', symbol: '<' },
    ]

    return (
        <div className="if-node">
            <div className="IfNodeNameTab">
                <h3>If Node</h3>
            </div>
            <div className="IfNodeMainSection">
                <div className="if-node-var-row">
                    <Handle type="target" position={Position.Left} className="if-node-handle" />
                    <p>Var</p>
                </div>

                <div className="if-node-value-group">
                    <p>Value</p>
                    <input type="text" />
                </div>

                <div className="if-node-comparator-group">
                    <p>Comparator</p>
                    <div className="if-node-comparator-buttons">
                        {comparatorButtons.map((button) => (
                            <button
                                key={button.id}
                                type="button"
                                id={button.id}
                                className={selectedComparator === button.id ? 'selected' : ''}
                                onClick={() => setSelectedComparator(button.id)}
                            >
                                {button.symbol}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="receptacle"></div>
            </div>
        </div>
    )
}

export default IfNode
