import { useState } from 'react'
import { Position, Handle } from '@xyflow/react'
import '../../styles/components/nodes/MathNumNode.css'

function MathNumNode() {
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
                                    <Handle className='handle' id={listOfHandles.indexOf(item)} position={Position.Left} type='target' />
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
                <Handle className='handle' type="source" position={Position.Right} />
            </div>
        </div>
    )
}

export default MathNumNode
