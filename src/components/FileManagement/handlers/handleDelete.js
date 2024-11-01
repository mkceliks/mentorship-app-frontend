import { deleteFile } from "../../../api/s3";
import { fetchFiles } from "./fetchFiles";

export const handleDelete = async (fileKey, setFiles) => {
    try {
        const response = await deleteFile(fileKey);

        if (response.ok) {  
            alert("File deleted successfully!");
            await fetchFiles(setFiles);
        } else {
            console.error("Failed to delete file:", response.statusText);
            alert("Failed to delete file.");
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        alert("An error occurred while deleting the file.");
    }
};
