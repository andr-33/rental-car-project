import { useState, useCallback } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const ImageUpload = ({ value, onChange }) => {
  const { translation } = useLanguage();
  const [preview, setPreview] = useState(value || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setPreview(imageUrl);
        onChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    const input = document.createElementranslation('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      handleFile(file);
    };
    input.click();
  };

  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        {translation('carDialog.uploadImage')}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          border: 2,
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          borderStyle: 'dashed',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {translation('carDialog.imagePreview')}
            </Typography>
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                maxWidth: '100%',
                maxHeight: 200,
                borderRadius: 1,
                mt: 1
              }}
            />
          </Box>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {translation('carDialog.dragDropText')}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ImageUpload;