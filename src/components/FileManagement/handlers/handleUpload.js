import { uploadFile } from "../../../api/s3";
import { fetchFiles } from "./fetchFiles";
import { getIdToken } from "../../../utils/config";

export const handleUpload = async (selectedFile, setFiles, setSelectedFile, setLoading) => {
    if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
    }

    setLoading(true);
    const token = getIdToken();
    try {
        const response = await uploadFile(selectedFile, token);

        if (response.ok) {
            alert("File uploaded successfully!");
            setSelectedFile(null);
            await fetchFiles(setFiles);
        } else {
            const errorText = await response.text();
            console.error("Failed to upload file:", errorText);
            alert(`Failed to upload file: ${errorText}`);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
    } finally {
        setLoading(false);
    }
};
