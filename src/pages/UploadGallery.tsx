// src/pages/UploadGallery.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import API from '../api';

const UploadGallery = () => {
  const [image, setImage] = useState<File | null>(null);
  const [projectId, setProjectId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('projectId', projectId);

    try {
      await API.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      console.error('Error al subir imagen:', err);
      setSuccess(false);
      setError('Error al subir la imagen');
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', py: 5 }}>
      <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Subir Imagen a la Galería
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="ID del Proyecto (opcional)"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <Button variant="contained" onClick={handleUpload}>
            Cargar Imagen
          </Button>

          {success && <Alert severity="success">Imagen subida con éxito</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default UploadGallery;
