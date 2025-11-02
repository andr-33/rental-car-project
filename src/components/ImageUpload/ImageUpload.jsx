import { useState, useCallback, useRef } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || null);
    
  const inputRef = useRef(null);
  const { translation } = useLanguage();

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

  const handleClick = () => {
    if(preview) return;

    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const hanldeDelete = () => {
    setPreview(null);
    onChange(null);
  };

  return (

    <Paper
      elevation={0}
      sx={{
        border: 2,
        borderColor: 'grey.300',
        borderStyle: preview ? 'solid' : 'dashed',
        borderRadius: 2,
        height: 175,
        maxHeight: 175,
        textAlign: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: preview ? 'grey.300' : 'primary.main',
          backgroundColor: 'action.hover'
        }
      }}
      onClick={handleClick}
    >
      {preview ? (
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
          <Box sx={{
            position: 'absolute',
            top: '0%',
            right: '0%',
          }}>
            <IconButton 
              onClick={hanldeDelete}
              color='error'
            >
              <Delete/>
            </IconButton>
          </Box>
          <Box
          component="img"
          src={preview}
          alt="Preview"
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          px: 1
        }}>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {translation('clickUpload')}
          </Typography>
        </Box>
      )}
      <Box
        component={'input'}
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files[0];
          handleFile(file);
        }}
      />
    </Paper>
  );
};

export default ImageUpload;