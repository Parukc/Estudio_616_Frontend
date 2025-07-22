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
  const [url, setUrl] = useState('');
  const [projectId, setProjectId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!url) {
      setError('La URL no puede estar vacía');
      return;
    }

    try {
      await API.post('/gallery', {
        url,
        projectId: projectId ? parseInt(projectId) : undefined,
      });

      setSuccess(true);
      setError('');
      setUrl('');
      setProjectId('');
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
          Añadir Imagen a la Galería
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="URL de la imagen"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            fullWidth
            label="ID del Proyecto (opcional)"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <Button variant="contained" onClick={handleUpload}>
            Guardar Imagen
          </Button>

          {success && <Alert severity="success">Imagen guardada con éxito</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default UploadGallery;
