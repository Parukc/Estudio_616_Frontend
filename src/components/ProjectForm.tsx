// Al inicio
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import API from '../api';
import { Project } from '../types/types';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const [form, setForm] = useState<Project>({
    name: '',
    description: '',
    category: '',
    image: '',
    date: '',
  });

  useEffect(() => {
    if (project) setForm(project);
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (project) {
        await API.put(`/projects/${project.id}`, form);
      } else {
        await API.post('/projects', form);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar proyecto', error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} fullWidth />
          <TextField label="Categoría" name="category" value={form.category} onChange={handleChange} fullWidth />
          <TextField label="Fecha" name="date" type="date" value={form.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="URL de imagen" name="image" value={form.image} onChange={handleChange} fullWidth />
          <Button variant="contained" onClick={handleSubmit}>
            {project ? 'Actualizar' : 'Crear'}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
