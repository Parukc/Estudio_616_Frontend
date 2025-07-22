// src/pages/Gallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

interface Image {
  _id: string;
  url: string;
  projectId?: number;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/gallery`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setImages(data);
        } else if (Array.isArray(data.data)) {
          setImages(data.data);
        } else {
          console.error('Respuesta inválida:', data);
          setImages([]);
        }
      })
      .catch((err) => {
        console.error('Error al cargar galería:', err);
        setImages([]);
      });
  }, []);

  return (
    <Box sx={{ bgcolor: '#fdfdfd', minHeight: '100vh', py: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black' }}>
        Galería
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {images.length > 0 ? (
          images.map((img) => (
            <Grid item key={img._id} xs={12} sm={6} md={4} lg={3}>
              <Box
                component="img"
                src={img.url}
                alt="Imagen"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: 1,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  },
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4, color: 'gray' }}>
            No hay imágenes aún en la galería.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Gallery;
