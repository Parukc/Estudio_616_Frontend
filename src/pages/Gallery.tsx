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
        setImages(Array.isArray(data) ? data : data.data || []);
      })
      .catch((err) => {
        console.error('Error al cargar la galería:', err);
        setImages([]);
      });
  }, []);

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', px: 2, py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#000' }}>
        Galería
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {images.map((img) => (
          <Grid item key={img._id} xs={12} sm={6} md={4} lg={3}>
            <Box
              component="img"
              src={img.url}
              alt="Imagen de galería"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
