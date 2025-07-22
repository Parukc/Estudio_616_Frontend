import React, { useEffect, useState } from 'react';
import API from '../api';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface Solicitud {
  _id: string;
  nombre: string;
  correo: string;
  telefono: string;
  tipoProyecto: string;
  descripcion: string;
  fecha: string;
  comentario?: string;
}

const AdminSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  const fetchSolicitudes = async () => {
    try {
      const res = await API.get('/orders');
      setSolicitudes(res.data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  const handleComentarioChange = (index: number, value: string) => {
    const nuevasSolicitudes = [...solicitudes];
    nuevasSolicitudes[index].comentario = value;
    setSolicitudes(nuevasSolicitudes);
  };

  const handleSaveComentario = async (id: string, comentario: string) => {
    try {
      await API.put(`/orders/${id}`, { comentario });
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al actualizar comentario:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/orders/${id}`);
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {solicitudes.map((solicitud, index) => (
        <Grid item xs={12} md={6} key={solicitud._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{solicitud.nombre}</Typography>
              <Typography>📧 {solicitud.correo}</Typography>
              <Typography>📞 {solicitud.telefono}</Typography>
              <Typography>🏗️ {solicitud.tipoProyecto}</Typography>
              <Typography>📝 {solicitud.descripcion}</Typography>
              <Typography>📅 Recibido: {new Date(solicitud.fecha).toLocaleString()}</Typography>

              <TextField
                fullWidth
                label="Comentario"
                value={solicitud.comentario || ''}
                onChange={(e) => handleComentarioChange(index, e.target.value)}
                sx={{ mt: 2 }}
              />
              <IconButton onClick={() => handleSaveComentario(solicitud._id, solicitud.comentario || '')}>
                <SaveIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => handleDelete(solicitud._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminSolicitudes;
