import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <FormControl fullWidth>
      <FormLabel>Profile Picture</FormLabel>
      <UploadBox onClick={handleUploadClick}>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {!selectedFile ? (
          <Typography color="text.secondary">Click to select a file</Typography>
        ) : (
          <Typography>
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </Typography>
        )}
      </UploadBox>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => alert(`Uploading: ${selectedFile?.name || 'No file selected'}`)}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </FormControl>
  );
}
