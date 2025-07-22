// src/pages/Gallery.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardMedia } from '@mui/material';
import API from '../api';

interface ImageItem {
  _id: string;
  url: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    API.get('/gallery')
      .then((res) => setImages(res.data))
      .catch((err) => console.error('Error al cargar la galería:', err));
  }, []);

  return (
    <Box sx={{ bgcolor: '#f0f0f0', minHeight: '100vh', p: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Galería
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {images.map((img) => (
          <Grid item key={img._id}>
            <CardMedia
              component="img"
              image={img.url}
              alt="imagen de galería"
              sx={{
                width: 300,
                height: 200,
                objectFit: 'cover',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
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
