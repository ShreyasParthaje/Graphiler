import React from 'react'
import runLogo from '../assets/run.svg'
import '../styles/components/ActionButton.css'

function Run() {
  return (
    <div>
      <button className='ActionButton'>
        <img src={runLogo} alt="run" style={{ display: 'block', width: '12px', height: '13px' }} />
      </button>
    </div>
  )
}

export default Run
