import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import API from '../api';

const Solicitud = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipoProyecto: '',
    descripcion: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/contacts', {
        nombre: form.nombre,
        correo: form.correo,
        telefono: form.telefono,
        mensaje: `Tipo de Proyecto: ${form.tipoProyecto}. Descripción: ${form.descripcion}`,
      });
      setSuccess(true);
      setForm({
        nombre: '',
        correo: '',
        telefono: '',
        tipoProyecto: '',
        descripcion: '',
      });
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#000000' }}>
          Solicita Información para tu Proyecto
        </Typography>

        <form onSubmit={handleSubmit}>
          {['nombre', 'correo', 'telefono', 'tipoProyecto', 'descripcion'].map((field, idx) => (
            <TextField
              key={field}
              fullWidth
              required={field !== 'telefono'}
              label={
                field === 'tipoProyecto'
                  ? 'Tipo de Proyecto (casa, local...) *'
                  : field === 'descripcion'
                  ? 'Descripción del Proyecto *'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              margin="normal"
              multiline={field === 'descripcion'}
              minRows={field === 'descripcion' ? 4 : 1}
              InputProps={{
                style: { backgroundColor: '#ffffff', color: '#000000' },
              }}
              InputLabelProps={{
                style: { color: '#000000' },
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: '#1976d2' }}
          >
            ENVIAR SOLICITUD
          </Button>
        </form>

        {/* Notificación éxito */}
        <Snackbar
          open={success}
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Solicitud enviada correctamente.
          </Alert>
        </Snackbar>

        {/* Notificación error */}
        <Snackbar
          open={error}
          autoHideDuration={5000}
          onClose={() => setError(false)}
        >
          <Alert onClose={() => setError(false)} severity="error">
            Ocurrió un error al enviar la solicitud. Intenta más tarde.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Solicitud;
