import React from 'react'
import uploadLogo from '../assets/upload.svg'
import downloadLogo from '../assets/download.svg'
import '../styles/components/ActionButton.css'

function UploadDownload() {
    return (
        <div>
            <button className='ActionButton'>
                <img src={uploadLogo} alt="upload" />
            </button>
            <button className='ActionButton'>
                <img src={downloadLogo} alt="download" />
            </button>
        </div>
    )
}

export default UploadDownload
