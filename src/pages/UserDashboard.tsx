import React from 'react';
import { Typography, Container } from '@mui/material';

const UserDashboard = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4">Bienvenido, Usuario</Typography>
      <Typography>Desde aquí podrás ver tus pedidos o interactuar con la plataforma.</Typography>
    </Container>
  );
};

export default UserDashboard;
