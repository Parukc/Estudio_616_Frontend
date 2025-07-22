import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import API from '../api';

interface MenuItem {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface Pedido {
  items: MenuItem[];
}

const UserOrderPanel = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [pedido, setPedido] = useState<MenuItem[]>([]);

  useEffect(() => {
    API.get('/menu-items')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('Error al cargar el menú:', err));
  }, []);

  const agregarAlPedido = (item: MenuItem) => {
    setPedido([...pedido, item]);
  };

  const cancelarPedido = () => {
    setPedido([]);
  };

  const confirmarPedido = () => {
    const pedidoDTO = {
      items: pedido.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion,
      })),
    };

    API.post('/orders', pedidoDTO)
      .then(() => {
        alert('Pedido enviado correctamente ✅');
        setPedido([]);
      })
      .catch((err) => console.error('Error al enviar pedido:', err));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Menú de Productos
      </Typography>
      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Card sx={{ bgcolor: '#f8f8f8' }}>
              <CardContent>
                <Typography variant="h6">{item.nombre}</Typography>
                <Typography variant="body2">{item.descripcion}</Typography>
                <Typography variant="subtitle1">${item.precio}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => agregarAlPedido(item)}>
                  Agregar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h5">Pedido Actual</Typography>
        {pedido.length === 0 ? (
          <Typography>No has agregado productos todavía.</Typography>
        ) : (
          <ul>
            {pedido.map((item, index) => (
              <li key={index}>
                {item.nombre} - ${item.precio}
              </li>
            ))}
          </ul>
        )}
        {pedido.length > 0 && (
          <Box mt={2} display="flex" gap={2}>
            <Button color="error" onClick={cancelarPedido}>
              Cancelar
            </Button>
            <Button color="primary" variant="contained" onClick={confirmarPedido}>
              Confirmar Pedido
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserOrderPanel;
