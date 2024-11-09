export const handleFileChange = (event, setSelectedFile) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedFile(file);
    }
};
