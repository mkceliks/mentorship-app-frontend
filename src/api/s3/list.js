import API_BASE_URL from "../../utils/config";

export const listFiles = async () => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) throw new Error("Failed to fetch file list");
    return response.json();
};

export const fetchFiles = async () => {
    try {
        const data = await listFiles();
        return data;
    } catch (error) {
        console.error("Error fetching files:", error);
        return null;
    }
};
