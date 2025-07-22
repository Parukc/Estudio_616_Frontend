// src/pages/NewProject.tsx

// src/pages/NewProject.tsx

import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Grid, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ esta línea es la clave


const NewProject = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
  });

  const [previewImage, setPreviewImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
          setForm({ ...form, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });

      // Vista previa si es URL
      if (name === 'image' && value.startsWith('http')) {
        setPreviewImage(value);
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.image) {
      alert("Completa título, descripción e imagen.");
      return;
    }

    try {
      await API.post('/projects', form);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/projects'), 2000);
    } catch (err) {
      console.error('Error al guardar el proyecto:', err);
      alert("Ocurrió un error al guardar. Verifica la conexión.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          REGISTRO DE PROYECTOS
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título del proyecto"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ingrese el título"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ingrese la descripción"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Categoría"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Ej: Residencial, Comercial"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha (YYYY-MM-DD)"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Imagen del proyecto
            </Typography>
            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Subir desde el PC
              <input type="file" hidden name="image" accept="image/*" onChange={handleChange} />
            </Button>
            <TextField
              fullWidth
              label="...o pega una URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://misitio.com/imagen.jpg"
            />
          </Grid>

          {/* Vista previa */}
          {previewImage && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <img
                  src={previewImage}
                  alt="Vista previa"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              GUARDAR PROYECTO
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Proyecto guardado exitosamente.
        </Alert>
      </Snackbar>

      {/* Sección final de contacto */}
      <Box sx={{ bgcolor: '#0f2d25', color: 'white', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">Equipo de Atención al Cliente</Typography>
              <Typography variant="caption" sx={{
                bgcolor: '#2e7d32', px: 1, py: 0.5, borderRadius: 1,
                display: 'inline-block', mt: 1
              }}>
                Listo para Ayudarte
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Nuestro equipo está disponible para responder a todas tus preguntas.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="right">
              <Button variant="contained" color="success">Contacta a un Agente</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default NewProject;
