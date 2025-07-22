import React, { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: number;
  nombres: string;
  email: string;
  username: string;
  telefono: string;
  address: string;
  role: 'admin' | 'user';
}

const AdminUsuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [openEdit, setOpenEdit] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setEditForm(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingUser(null);
    setEditForm({});
  };

  const actualizarUsuario = async () => {
    if (!editingUser) return;
    try {
      await API.put(`/users/${editingUser.id}`, editForm);
      fetchUsers();
      handleCloseEdit();
    } catch (error) {
      console.error('Error al actualizar usuario', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', color: 'black', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Lista de Usuarios Registrados
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Nombre</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Username</b></TableCell>
                <TableCell><b>Teléfono</b></TableCell>
                <TableCell><b>Dirección</b></TableCell>
                <TableCell><b>Rol</b></TableCell>
                <TableCell><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nombres}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.telefono}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => eliminarUsuario(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* MODAL DE EDICIÓN */}
        <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombres"
              name="nombres"
              value={editForm.nombres || ''}
              onChange={(e) => setEditForm({ ...editForm, nombres: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Correo"
              name="email"
              value={editForm.email || ''}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={editForm.telefono || ''}
              onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Dirección"
              name="address"
              value={editForm.address || ''}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              select
              label="Rol"
              name="role"
              value={editForm.role || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, role: e.target.value as 'admin' | 'user' })
              }
              fullWidth
              margin="dense"
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancelar</Button>
            <Button onClick={actualizarUsuario} variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminUsuarios;
