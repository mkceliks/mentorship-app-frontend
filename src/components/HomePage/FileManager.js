import React, { useEffect, useState } from "react";
import { fetchFiles } from "../FileManagement/handlers/fetchFiles";
import { handleDownload } from "../FileManagement/handlers/handleDownload";
import { handleUpload } from "../FileManagement/handlers/handleUpload";
import { handleFileChange } from "../FileManagement/handlers/handleFileChange";
import { isAuthenticated } from "../../utils/config";
import {
  Box,
  Typography,
  Button,
  List,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
  Card,
  CardActions,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function FileManager({ user }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) return;

    setLoading(true);
    fetchFiles(setFiles)
      .catch((error) => console.error("Error fetching files:", error))
      .finally(() => setLoading(false));

    setSelectedFile(null);
  }, []);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" gutterBottom>
        File Management for {user.details?.Name || "User"}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6">Files in Bucket</Typography>
          <Divider sx={{ my: 2 }} />
          {files && files.length > 0 ? (
            <List>
              {files.map((file) => (
                <Card
                  key={file.key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                    <Avatar>
                      <UploadFileIcon />
                    </Avatar>
                    <ListItemText
                      primary={file.item_name}
                      secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
                    />
                  </Box>
                  <CardActions>
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={() => handleDownload(file.key)}
                      color="primary"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </List>
          ) : (
            <Typography>No files available.</Typography>
          )}
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Upload a File</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <UploadBox onClick={() => document.getElementById("file-input").click()}>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, setSelectedFile)}
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
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                if (!selectedFile) {
                  alert("Please select a file before uploading.");
                  return;
                }
                handleUpload(selectedFile, setFiles, setSelectedFile, setLoading, user.email);
                setSelectedFile(null);
              }}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
