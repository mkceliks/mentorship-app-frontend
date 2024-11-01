import API_BASE_URL from "../../utils/config";

export const downloadFile = async (fileKey) => {
    const response = await fetch(`${API_BASE_URL}/download?file_name=${encodeURIComponent(fileKey)}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to download file: ${errorText}`);
    }

    const base64Data = await response.text();
    const contentType = response.headers.get("Content-Type") || "application/octet-stream";

    return { base64Data, contentType };
};
