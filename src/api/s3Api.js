// src/api/s3Api.js
const API_BASE_URL = process.env.REACT_APP_STAGE === "staging"
    ? process.env.REACT_APP_STAGING_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const listFiles = async () => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) throw new Error("Failed to fetch file list");
    return response.json();
};

export const downloadFile = async (fileKey) => {
    const response = await fetch(`${API_BASE_URL}/download?key=${fileKey}`);
    if (!response.ok) throw new Error("Failed to download file");
    return response.blob();
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload file");
    return response.json();
};
