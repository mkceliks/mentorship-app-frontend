export const handleFileChange = async (event, setSelectedFile) => {
    const file = event.target.files[0];
    if (file) {
        const base64File = await toBase64(file);
        setSelectedFile({ file, base64File });
    }
};

const toBase64 = (file) => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
