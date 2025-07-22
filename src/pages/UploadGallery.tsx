// src/pages/UploadGallery.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField } from '@mui/material';

const UploadGallery = () => {
  const [image, setImage] = useState<File | null>(null);
  const [projectId, setProjectId] = useState('');

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('projectId', projectId);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Imagen cargada con éxito');
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir imagen');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Subir Imagen a la Galería
      </Typography>
      <TextField
        fullWidth
        label="ID del Proyecto (opcional)"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" onClick={handleUpload}>
        Cargar Imagen
      </Button>
    </Box>
  );
};

export default UploadGallery;
