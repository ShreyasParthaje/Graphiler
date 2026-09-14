import React from 'react'
import uploadLogo from '../assets/upload.svg'
import downloadLogo from '../assets/download.svg'
import '../styles/components/ActionButton.css'

function UploadDownload({schema}) {
    function triggerSchemaToFile(){
        const jsonString = JSON.stringify(schema, null, 2);

        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "schema.json";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    return (
        <div>
            <button className='ActionButton'>
                <img src={uploadLogo} alt="upload" />
            </button>
            <button className='ActionButton' onClick={triggerSchemaToFile}>
                <img src={downloadLogo} alt="download" />
            </button>
        </div>
    )
}

export default UploadDownload
