import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';
import API from '../api'; // Asegúrate de tener esto configurado

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ evita que recargue la página
    setSuccess(false);
    setError('');

    try {
      await API.post('/contacts', form); // ✅ usa api.ts (axios con baseURL y token opcional)
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Error al enviar el mensaje:', err);
      setError('❌ Error al enviar el mensaje. Intenta más tarde.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff' }}>
        <Typography variant="h4" gutterBottom align="center" color="textPrimary">
          Contáctanos
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Mensaje enviado correctamente.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Nombre"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="phone"
            label="Teléfono"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            name="message"
            label="Mensaje"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={form.message}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
