// src/pages/AdminContactos.tsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

const AdminContactos = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get('/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error('Error al obtener mensajes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Mensajes Recibidos de Contacto
      </Typography>

      <Paper elevation={4} sx={{ bgcolor: '#ffffff', color: '#000', p: 2 }}>
        <List>
          {contacts.length === 0 ? (
            <Typography align="center" sx={{ p: 2 }}>
              No hay mensajes por el momento.
            </Typography>
          ) : (
            contacts.map((contact) => (
              <React.Fragment key={contact.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {contact.name} &lt;{contact.email}&gt;
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {contact.message}
                        </Typography>
                        {contact.phone && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            📞 Teléfono: {contact.phone}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          🕓 Recibido: {new Date(contact.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default AdminContactos;
