import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/crear-proyecto');
  };

  return (
    <Box sx={{ bgcolor: '#fefefe', color: 'black' }}>
      {/* HERO INICIAL */}
      <Box sx={{ bgcolor: '#c6dad4', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Bienvenidos a Nuestro Portafolio
              </Typography>
              <Typography variant="body1" gutterBottom>
                Explora nuestros proyectos de arquitectura más destacados.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate('/contacto')}
                >
                  Contacto
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PROYECTOS */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Proyectos Destacados
        </Typography>
        <Typography variant="body1" gutterBottom>
          Descubre nuestros proyectos más innovadores.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {projects.map((project: any) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                {project.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2">
                    {project.category}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Tarjeta para agregar proyecto */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                border: '2px dashed #ccc',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
              onClick={handleAddProject}
            >
              <AddIcon fontSize="large" color="action" />
              <Typography variant="subtitle1" mt={1}>Agregar Proyecto</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ATENCIÓN AL CLIENTE */}
      <Box sx={{ bgcolor: '#0f2d25', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">Equipo de Atención al Cliente</Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: '#2e7d32',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  display: 'inline-block',
                  mt: 1
                }}
              >
                Listo para Ayudarte
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Nuestro equipo está disponible para responder a todas tus preguntas.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="right">
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate('/contacto')}
              >
                Contacta a un Agente
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Projects;
