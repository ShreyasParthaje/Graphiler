import { useState } from 'react'
import '../styles/components/ToolBar.css'

function ToolBar({ setNodes, setEdges }) {
  //Math Node List
  const [mathNodeListState, setMathNodeListState] = useState(false);
  const revealMathNodeList = ()=>{
    setConditionalNodeListState(false);
    setDataNodeListState(false);
    
    if(mathNodeListState===false){
      setMathNodeListState(true);
    }
    else{
      setMathNodeListState(false);
    }
  }

  //Conditional Node List
  const [conditionalNodeListState, setConditionalNodeListState] = useState(false);
  const revealConditionalNodeList = ()=>{
    setMathNodeListState(false);
    setDataNodeListState(false);
    
    if(conditionalNodeListState===false){
      setConditionalNodeListState(true);
    }
    else{
      setConditionalNodeListState(false);
    }
  }

  //Data Node List
  const [dataNodeListState, setDataNodeListState] = useState(false);
  const revealDataNodeList = ()=>{
    setMathNodeListState(false);
    setConditionalNodeListState(false);

    if(dataNodeListState===false){
      setDataNodeListState(true);
    }
    else{
      setDataNodeListState(false);
    }
  }

  //Spawn funtions
  const [nextId, setNextId]=useState(10000);

  //Spawn MathNum Node
  const spawnMathNum = ()=>{
    setMathNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      type: "mathNumNode",
      position: {x: 500, y:500},
      data: {label: 'MathNum'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn MathMatrix Node
  const spawnMathMatrix = ()=>{
    setMathNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      type: "mathMatrixNode",
      position: {x: 600, y:600},
      data: {label: 'MathMatrix'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn If Node
  const spawnIf = ()=>{
    setConditionalNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      position: {x: 700, y:600},
      data: {label: 'If'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));

  }

  //Spawn Else Node
  const spawnElse = ()=>{
    setConditionalNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      position: {x: 700, y:500},
      data: {label: 'Else'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn NumEx Node
  const spawnNumEx = ()=>{
    setConditionalNodeListState(false);
    setMathNodeListState(false);
    setDataNodeListState(false);

    const newNode = {
      id: nextId.toString(),
      type: "numExNode",
      position: {x: 800, y:500},
      data: {label: 'NumEx'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn Dataset Node
  const spawnDataset = ()=>{
    setDataNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      type: 'datasetNode',
      position: {x: 800, y:700},
      data: {label: 'Dataset'}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn DataNum Node
  const spawnDataNum = ()=>{
    setDataNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      type: 'dataNumNode',
      position: {x: 800, y: 700},
      data: {label: "DataNum"}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  //Spawn DataMatrix Node
  const spawnDataMatrix = ()=>{
    setDataNodeListState(false);
    const newNode = {
      id: nextId.toString(),
      type: 'dataMatrixNode',
      position: {x: 800, y: 700},
      data: {label: "DataMatrix"}
    };
    setNextId(nextId+1);
    setNodes((nodeSnapshot)=>nodeSnapshot.concat(newNode));
  }

  return (
    <div className="toolBar">
      <div 
      className="list" style={{display: (mathNodeListState===true)?('inline'):('none')}}>
        <button className="listButton" onClick={spawnMathNum}>MathNum</button>
        <button className="listButton" onClick={spawnMathMatrix}>MathMatrix</button>
      </div>
      <div 
      className="list" style={{display: (conditionalNodeListState===true)?('inline'):('none')}}>
        <button className="listButton" onClick={spawnIf}>If Node</button>
        <button className="listButton" onClick={spawnElse}>Else Node</button>
      </div>
      <div
      className="list" style={{display: (dataNodeListState===true)?('inline'):('none')}}>
        <button className='listButton' onClick={spawnDataset}>Dataset</button>
        <button className="listButton" onClick={spawnDataNum}>DataNum</button>
        <button className="listButton" onClick={spawnDataMatrix}>DataMatrix</button>
      </div>

      <div className="mathNodes" onClick={revealMathNodeList}>Math Nodes</div>
      <div className="conditionalNodes" onClick={revealConditionalNodeList}>Conditional Nodes</div>
      <div className="dataNodes" onClick={revealDataNodeList}>Data Nodes</div>
      <button className="NumEx" onClick={spawnNumEx}>NumEx</button>
    </div>
  )
}

export default ToolBar
