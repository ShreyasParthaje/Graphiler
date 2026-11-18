import { useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import '../../styles/components/nodes/DataMatrixNode.css'

function DataMatrixNode({ data }) {
    const [m, setM] = useState(3);
    const [n, setN] = useState(3);

    let inputs = [];
    for (let i = 0; i < m; i++) {
        const rows = [];

        for (let j = 0; j < n; j++) {
            rows.push(
                <input key={`${i}-${j}`} type="number" />
            );
        }

        inputs.push(
            <div key={i}>
                {rows}
            </div>
        );
    }

    return (
        <div>
            <div className="DataMatrixNodeNameTab">
                <h3>DataMatrix Node</h3>
            </div>
            <div className="DataMatrixNodeMainSection">
                <div className="DimensionSection">
                    <p>i:</p>
                    <input type="number" defaultValue="3" onBlur={(e)=>{setM(e.target.value)}} />

                    <p>j:</p>
                    <input type="number" defaultValue="3" onBlur={(e)=>{setN(e.target.value)}} />
                </div>
                <div>
                    <p>Matrix</p>
                    <div>
                        {inputs}
                    </div>
                </div>
                <Handle type='target' className='handle' position={Position.left} />
                <Handle type='source' className='handle' position={Position.right} />

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
                                backgroundColor: '#396F33',
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

export default DataMatrixNode
