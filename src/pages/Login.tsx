import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api'; // Asegúrate de tener configurado este archivo para manejar axios con token

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // ✅ Corregido: usar "username" en vez de "email" como espera el backend
      const response = await API.post('/auth/login', {
        username: form.email,
        password: form.password,
      });

      const { token, role, id, username } = response.data;

      // Guardar datos en contexto y localStorage
      login({ id, username: username || form.email, role, token });

      // Redirección según el rol
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales inválidas o error al iniciar sesión');
    }
  };

  return (
    <Box>
      {/* 🔵 Encabezado blanco */}
      <Box sx={{ bgcolor: '#fff', py: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#000' }}>
          Estudio 616
        </Typography>
        <Typography sx={{ mt: 1, color: '#000' }}>
          Ingresa tus credenciales para acceder a nuestros servicios.
        </Typography>
      </Box>

      {/* 🟩 Formulario de login */}
      <Box sx={{ bgcolor: '#5f8279', color: 'white', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Formulario de Inicio de Sesión
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Por favor, completa los siguientes campos.
          </Typography>

          <TextField
            label="Correo Electrónico"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                onClick={() => navigate('/register')}
                variant="outlined"
                fullWidth
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#1c4532', '&:hover': { bgcolor: '#14532d' } }}
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 🟫 Footer */}
      <Box sx={{ bgcolor: '#0f2d27', color: 'white', py: 4 }}>
        <Container>
          <Typography variant="h6">Equipo de Atención al Cliente</Typography>
          <Typography sx={{ mb: 2, fontSize: '0.9rem' }}>
            Nuestro equipo está disponible para ayudarte
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/contact')}
            sx={{
              bgcolor: '#4b8378',
              '&:hover': { bgcolor: '#3b6f66' },
            }}
          >
            Contacta a un Agente
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
