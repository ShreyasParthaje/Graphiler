import { useRef } from 'react'
import uploadLogo from '../assets/upload.svg'
import downloadLogo from '../assets/download.svg'
import '../styles/components/ActionButton.css'

function UploadDownload({ schema, setNodes, setEdges, setNextId }) {
    const fileInputRef = useRef(null);
    const triggerSchemaToFile = () => {
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

    const triggerFileToSchema = () => {
        const userConfirmed = confirm("Uploading a file overwrites the existing schema you have generated. Do you wish to proceed ?")

        if (userConfirmed) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const fileContent = await file.text();

            const parsedData = JSON.parse(fileContent);

            setNodes(parsedData.nodes);
            setEdges(parsedData.edges);
            setNextId(nodes.at(-1).id+1);
            console.log("Successfully parsed JSON:", parsedData);

        } catch (error) {
            console.error("Error reading or parsing the file. Ensure it is valid JSON.", error);
        } finally {
            event.target.value = null;
        }
    }

    return (
        <div>
            <button className='ActionButton' onClick={triggerFileToSchema}>
                <img src={uploadLogo} alt="upload" />
            </button>
            <button className='ActionButton' onClick={triggerSchemaToFile}>
                <img src={downloadLogo} alt="download" />
            </button>
            <input accept=".json" onChange={handleFileChange} ref={fileInputRef} type="file" style={{ display: 'none' }} />
        </div>
    )
}

export default UploadDownload
