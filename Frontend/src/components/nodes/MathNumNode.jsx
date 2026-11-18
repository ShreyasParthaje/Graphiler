import { useState } from 'react'
import { Position, Handle } from '@xyflow/react'
import '../../styles/components/nodes/MathNumNode.css'

function MathNumNode({ data }) {
    const [listOfHandles, setListOfHandles] = useState(["x1", "x2", "x3"]);

    const changeNumOfExpressions = (e) => {
        let narr = [];
        for (let i = 1; i <= e.target.value; i++) {
            narr.push(`x${i}`);
        }
        setListOfHandles(narr);
    }

    return (
        <div>
            <div className="MathNumNodeNameTab">
                <h3>MathNum Node</h3>
            </div>
            <div className="MathNumNodeMainSection">
                {
                    listOfHandles.map(
                        (item) => {
                            return (
                                <>
                                    <p>{item}</p>
                                    <Handle className="Handle" id={listOfHandles.indexOf(item)} position={Position.Left} type='target' />
                                </>
                            )
                        }
                    )
                }

                <p>Number of Variables</p>
                <input type="number" defaultValue="3" onBlur={changeNumOfExpressions} />
                <p>Expression</p>
                <input type="text" />

                <p>Output</p>
                <Handle className="Handle" type="source" position={Position.Right} />

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
                                backgroundColor: '#356479',
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

export default MathNumNode
