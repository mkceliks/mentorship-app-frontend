import fetchWithAuth from "../../utils/fetchWithAuth";

export const listFiles = async () => {
    try {
        const response = await fetchWithAuth("/list");
        return response;
    } catch (error) {
        console.error("Error fetching file list:", error);
        throw new Error("Failed to fetch file list");
    }
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
