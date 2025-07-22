import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import API from '../api';

// ✅ Tipado correcto según tu entidad en PostgreSQL
interface Contact {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  telefono: string;
  fecha: string;
  comentario?: string;
}

const AdminContactos = () => {
  const [contactos, setContactos] = useState<Contact[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: number]: string }>({});
  const [modoEdicion, setModoEdicion] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    API.get('/contacts')
      .then((res) => setContactos(res.data))
      .catch((err) => console.error('Error al cargar contactos', err));
  }, []);

  const handleEliminar = (id: number) => {
    API.delete(`/contacts/${id}`)
      .then(() => {
        setContactos((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error('Error al eliminar contacto', err));
  };

  const handleGuardarComentario = (id: number) => {
    const nuevoComentario = comentarios[id];
    API.put(`/contacts/${id}`, { comentario: nuevoComentario })
      .then(() => {
        setModoEdicion((prev) => ({ ...prev, [id]: false }));
        setContactos((prev) =>
          prev.map((c) => (c.id === id ? { ...c, comentario: nuevoComentario } : c))
        );
      })
      .catch((err) => console.error('Error al guardar comentario', err));
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Mensajes Recibidos de Contacto
      </Typography>
      <Grid container spacing={2}>
        {contactos.map((contacto) => (
          <Grid item xs={12} md={6} key={contacto.id}>
            <Card sx={{ bgcolor: '#fff', color: '#000' }}>
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>{contacto.nombre}</strong> &lt;{contacto.correo}&gt;
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {contacto.mensaje}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  📞 Teléfono: {contacto.telefono}
                </Typography>
                <Typography variant="caption">
                  🕒 Recibido: {new Date(contacto.fecha).toLocaleString()}
                </Typography>

                <Box mt={2}>
                  {modoEdicion[contacto.id] ? (
                    <Box display="flex" gap={1}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Comentario"
                        value={comentarios[contacto.id] || ''}
                        onChange={(e) =>
                          setComentarios({ ...comentarios, [contacto.id]: e.target.value })
                        }
                      />
                      <IconButton
                        onClick={() => handleGuardarComentario(contacto.id)}
                        color="primary"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">
                        📝 Comentario: {contacto.comentario || 'Sin comentario'}
                      </Typography>
                      <IconButton
                        onClick={() => setModoEdicion({ ...modoEdicion, [contacto.id]: true })}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Box mt={1} textAlign="right">
                  <IconButton onClick={() => handleEliminar(contacto.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminContactos;
