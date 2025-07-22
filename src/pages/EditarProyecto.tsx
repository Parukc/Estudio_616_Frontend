import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Grid, Snackbar, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const EditarProyecto = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ← ID del proyecto desde la URL
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
  });

  const [previewImage, setPreviewImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setForm(res.data);
        setPreviewImage(res.data.image);
      } catch (error) {
        console.error('Error al cargar proyecto:', error);
        alert('No se pudo cargar el proyecto.');
      }
    };

    fetchProject();
  }, [id]);

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

  const handleUpdate = async () => {
    if (!form.title || !form.description || !form.image) {
      alert("Completa título, descripción e imagen.");
      return;
    }

    try {
      await API.put(`/projects/${id}`, form);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/projects'), 2000);
    } catch (err) {
      console.error('Error al actualizar el proyecto:', err);
      alert("Ocurrió un error al actualizar.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          EDITAR PROYECTO
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título del proyecto"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={form.description}
              onChange={handleChange}
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
              onClick={handleUpdate}
            >
              ACTUALIZAR PROYECTO
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Proyecto actualizado exitosamente.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditarProyecto;
