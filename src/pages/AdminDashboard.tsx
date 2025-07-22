// src/pages/AdminDashboard.tsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#f4f4f4', minHeight: '100vh', p: 4, color: '#1e1e1eff' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Panel de Administrador
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Accede rápidamente a tus herramientas administrativas.
      </Typography>

      <Grid container spacing={4}>
        {/* Proyectos */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e1f5fe' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Proyectos
              </Typography>
              <Typography variant="body2" gutterBottom>
                Visualiza y administra todos los proyectos creados.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/projects')}
              >
                Ver Proyectos
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={() => navigate('/crear-proyecto')}
              >
                Crear Proyecto
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Galería */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ede7f6' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Galería
              </Typography>
              <Typography variant="body2" gutterBottom>
                Gestiona imágenes del portafolio visual.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/gallery')}
              >
                Ver Galería
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={() => navigate('/upload-gallery')}
              >
                Subir Imagen
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Contactos */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contactos
              </Typography>
              <Typography variant="body2" gutterBottom>
                Revisa los mensajes de contacto recibidos.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/admin/contactos')}
              >
                Ver Contactos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
