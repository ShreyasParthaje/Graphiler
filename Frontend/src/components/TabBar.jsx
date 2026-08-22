import React from 'react'
import '../styles/components/TabBar.css'

function TabBar({ pageIndex, setPageIndex }) {
    
    return (
        <div className='tabBar'>
            <button 
            className={(pageIndex===0)?('activeButton'):('passiveButton')} 
            onClick={()=>setPageIndex(0)}>
                Dataset
            </button>

            <button 
            className={(pageIndex===1)?('activeButton'):('passiveButton')}
            onClick={()=>setPageIndex(1)}>
                Schema
            </button>
        </div>
    )
}

export default TabBar
