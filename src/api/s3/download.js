import fetchWithAuth from "../../utils/fetchWithAuth";

export const downloadFile = async (fileKey) => {
    try {
      const response = await fetchWithAuth(`/download?file_name=${encodeURIComponent(fileKey)}`, {
        headers: {
          Accept: "application/octet-stream",
        },
        responseType: "text", 
      });
  
      const base64Data = response; 
      const contentType = "application/octet-stream"; 
  
      return { base64Data, contentType };
    } catch (error) {
      console.error("Error fetching the file:", error);
      throw new Error("Failed to download file");
    }
  };
  
  
