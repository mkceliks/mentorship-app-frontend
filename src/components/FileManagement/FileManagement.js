import React, { useEffect, useState } from "react";
import { fetchFiles } from "./handlers/fetchFiles";
import { handleDownload } from "./handlers/handleDownload";
import { handleDelete } from "./handlers/handleDelete";
import { handleUpload } from "./handlers/handleUpload";
import { handleFileChange } from "./handlers/handleFileChange";
import './FileManagement.css';

function FileManagement() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchFiles(setFiles)
            .catch((error) => console.error("Error fetching files:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="FileManagement">
            <h1>File Management</h1>

            {loading && <p>Loading...</p>}

            <h2>Files in Bucket</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.key}>
                        {file.key} ({file.size} bytes)
                        <button onClick={() => handleDownload(file.key)}>Download</button>
                        <button className="delete" onClick={() => handleDelete(file.key, setFiles)}>Delete</button>
                    </li>
                ))}
            </ul>
            <hr />

            <h2>Upload a File</h2>
            <input type="file" onChange={(e) => handleFileChange(e, setSelectedFile)} />
            <button onClick={() => handleUpload(selectedFile, setFiles, setSelectedFile, setLoading)}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}

export default FileManagement;
