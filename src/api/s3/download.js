import API_BASE_URL from "../../utils/config";

export const downloadFile = async (fileKey) => {
    const response = await fetch(`${API_BASE_URL}/download?key=${encodeURIComponent(fileKey)}`);
    if (!response.ok) throw new Error("Failed to download file");
    return response.blob();
};
