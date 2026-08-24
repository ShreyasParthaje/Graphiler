import { useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import '../../styles/components/nodes/MathMatrixNode.css'

function MathMatrixNode() {
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
            <div className="MathMatrixNodeNameTab">
                <h3>MathMatrix Node</h3>
            </div>
            <div className="MathMatrixNodeMainSection">
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
            </div>
        </div>
    )
}

export default MathMatrixNode
