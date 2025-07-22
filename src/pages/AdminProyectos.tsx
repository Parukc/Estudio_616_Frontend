import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import ProjectForm from '../components/ProjectForm';
import ProjectTable from '../components/ProjectTable';
import API from '../api';
import { Project } from '../types/project'; 

const AdminProyectos = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error al obtener proyectos', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este proyecto?');
    if (confirmDelete) {
      try {
        await API.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error al eliminar proyecto', error);
      }
    }
  };

  const handleFormClose = () => {
    setEditingProject(null);
    setShowForm(false);
    fetchProjects();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>Administrar Proyectos</Typography>
      <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
        Agregar Proyecto
      </Button>
      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
        />
      )}
    </Container>
  );
};

export default AdminProyectos;
