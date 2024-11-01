import { downloadFile } from "../../../api/s3";

export const handleDownload = async (fileKey) => {
    try {
        const { base64Data, contentType } = await downloadFile(fileKey);

        const link = document.createElement("a");
        link.href = `data:${contentType};base64,${base64Data}`;
        link.download = fileKey;
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 
    } catch (error) {
        console.error("Error downloading file:", error);
        alert("An error occurred while downloading the file.");
    }
};