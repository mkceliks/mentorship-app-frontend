import { downloadFile } from "../../../api/s3";

export const handleDownload = async (fileKey) => {
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
        alert("An error occurred while downloading the file.");
    }
};
