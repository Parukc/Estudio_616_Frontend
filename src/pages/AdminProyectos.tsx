import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AdminProyectos = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este proyecto?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter((p: any) => p.id !== id));
      setMessage('Proyecto eliminado exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      alert('No se pudo eliminar el proyecto.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#fefefe', minHeight: '100vh', color: 'black' }}>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          ADMINISTRACIÓN DE PROYECTOS
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
                  <Typography variant="body2">{project.category}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/editar-proyecto/${project.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(project.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProyectos;
