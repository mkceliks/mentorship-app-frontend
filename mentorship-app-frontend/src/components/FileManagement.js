// src/components/FileManagement.js

import React, { useEffect, useState } from "react";
import { listFiles, downloadFile, uploadFile } from "../api/s3Api";
import './FileManagement.css';

function FileManagement() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch file list on component mount
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const data = await listFiles();
            setFiles(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleDownload = async (fileKey) => {
        try {
            const blob = await downloadFile(fileKey);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileKey;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            await uploadFile(selectedFile);
            alert("File uploaded successfully!");
            setSelectedFile(null);
            fetchFiles();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <h1>File Management</h1>
            <h2>Files in Bucket</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.key}>
                        {file.key} ({file.size} bytes)
                        <button onClick={() => handleDownload(file.key)}>Download</button>
                    </li>
                ))}
            </ul>
            <hr />
            <h2>Upload a File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileManagement;
