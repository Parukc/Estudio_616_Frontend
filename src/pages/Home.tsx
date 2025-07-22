import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Grid, Card, CardContent,
  CardMedia, Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 🟢 1. INTERFAZ para tipar correctamente los datos
interface GalleryItem {
  _id?: string;
  projectId: number;
  title: string;
  description: string;
  image: string;
  date?: string;
  category?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [project1, setProject1] = useState<GalleryItem | null>(null);
  const [project2, setProject2] = useState<GalleryItem | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/gallery')
      .then(res => {
        const data: GalleryItem[] = res.data;
        setProject1(data.find((item) => item.projectId === 1) || null);
        setProject2(data.find((item) => item.projectId === 2) || null);
      })
      .catch(err => {
        console.error('Error al obtener galería:', err);
      });
  }, []);

  return (
    <Box sx={{ bgcolor: '#fdfdfd', color: 'black' }}>
      {/* SECCIÓN HERO */}
      <Box sx={{ bgcolor: '#c6dad4', py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          CONSTRUYE TUS SUEÑOS...
        </Typography>
        <Typography variant="body1" gutterBottom>
          EXPLORA NUESTROS PROYECTOS Y CONTÁCTANOS PARA HACER REALIDAD TU HOGAR
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            sx={{ mr: 2, bgcolor: '#134e4a', color: '#fdfdfd' }}
            onClick={() => navigate('/contact')}
          >
            Contactar Ahora
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#134e4a' }}
            onClick={() => navigate('/projects')}
          >
            Ver Proyectos
          </Button>
        </Box>
      </Box>

      {/* SECCIÓN PROYECTOS */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" gutterBottom>Nuestros Proyectos</Typography>
        <Typography sx={{ mb: 4 }}>Seleccionados especialmente para ti.</Typography>
        <Grid container spacing={4}>
          {[project1, project2].map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: 350 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    project?.image && project.image !== ''
                      ? project.image
                      : project?.projectId === 1
                        ? 'https://architectureboard.wordpress.com/wp-content/uploads/2017/09/9676769931_9c4894b57e_k.jpg'
                        : 'https://architectureboard.wordpress.com/wp-content/uploads/2017/09/9676769931_9c4894b57e_k.jpg'
                  }
                  alt={project?.title || `Proyecto ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="h6">{project?.title || `Proyecto ${index + 1}`}</Typography>
                  <Typography>{project?.description || 'Coloca el contenido aquí'}</Typography>
                  <Button
                    variant="outlined"
                    sx={{ mt: 1, bgcolor: '#134e4a', color: '#fdfdfd' }}
                    onClick={() => navigate('/gallery')}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SECCIÓN SERVICIOS */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container>
          <Typography variant="h5" align="center" gutterBottom>
            Conoce más sobre Nuestros Servicios
          </Typography>
          <Typography align="center" sx={{ mb: 4 }}>
            Conoce más sobre los proyectos que podemos hacer realidad para ti
          </Typography>

          <Grid container spacing={4}>
            {[
              { title: "Construcción", text: "Construcciones de vivienda o comercio. 100% personalizadas." },
              { title: "Diseño de Interiores", text: "Restauramos y adaptamos tu espacio." },
              { title: "Realidad Virtual 3D", text: "Visualiza tu proyecto antes de construirlo." },
              { title: "Trámites", text: "Regularización y gestión de todo tipo de terrenos." }
            ].map((item, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">{item.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SECCIÓN TESTIMONIOS */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" gutterBottom>Testimonios de Nuestros Clientes</Typography>
        <Typography sx={{ mb: 4 }}>Lo que dicen nuestros clientes sobre nosotros.</Typography>
        <Grid container spacing={2}>
          {[
            { name: 'Elian Muriel', msg: '¡Excelente servicio!' },
            { name: 'Adriana Vargas', msg: 'Los mejores del mercado.' },
            { name: 'Fernando Castro', msg: 'Atención al cliente excepcional.' },
            { name: 'Carlos Sánchez', msg: 'Todo lo que diseñaron quedó perfecto.' }
          ].map((testimonial, idx) => (
            <Grid item xs={12} md={3} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{testimonial.name}</Typography>
                  <Typography variant="body2">{testimonial.msg}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SECCIÓN ATENCIÓN AL CLIENTE */}
      <Box sx={{ bgcolor: '#0f2d27', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h6">Equipo de Atención al Cliente</Typography>
          <Typography sx={{ mb: 2 }}>Nuestro equipo está disponible para ayudarte</Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#4b8378' }}
            onClick={() => navigate('/contact')}
          >
            Contacta a un Agente
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
