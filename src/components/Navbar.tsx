// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#004d40' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Estudio 616
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/projects">
            Proyectos
          </Button>
          <Button color="inherit" component={Link} to="/gallery">
            Galería
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contacto
          </Button>

          {/* Botones visibles solo para admin */}
          {user?.role === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/crear-proyecto">
                Nuevo Proyecto
              </Button>
              <Button color="inherit" component={Link} to="/upload-gallery">
                Cargar Imagen
              </Button>
              <Button color="inherit" component={Link} to="/admin/contactos">
                Admin Contactos
              </Button>
              <Button color="inherit" component={Link} to="/admin/usuarios">
                Admin Usuarios
              </Button>
              <Button color="inherit" component={Link} to="/admin/proyectos">
                Admin Proyectos
              </Button>
            </>
          )}

          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              Cerrar sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
