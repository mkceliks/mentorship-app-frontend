import { listFiles } from "../../../api/s3";

export const fetchFiles = async (setFiles) => {

    try {
        const data = await listFiles();
        setFiles(data);
    } catch (error) {
        console.error("Error fetching files:", error);
    }
};
