import React from 'react'
import runLogo from '../assets/run.svg'
import '../styles/components/ActionButton.css'

function Run() {
  const triggerSchemaToCode = ()=>{
    console.log("Schema to code conversion process started");
  };

  return (
    <div>
      <button className='ActionButton'>
        <img onClick={triggerSchemaToCode} src={runLogo} alt="run" style={{ display: 'block', width: '12px', height: '13px' }} />
      </button>
    </div>
  )
}

export default Run
