// src/pages/CreateAdmin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ Importamos instancia axios con baseURL

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    nombres: '',
    telefono: '',
    username: '',
    address: '',
    claveAdmin: '', // ✅ Campo requerido
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        ...form,
        role: 'admin',
      });
      alert('Administrador creado exitosamente');
      navigate('/admin');
    } catch (error) {
      alert('Error al crear administrador');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Crear Nuevo Administrador</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />
        <input type="password" name="claveAdmin" placeholder="Clave secreta para admins" value={form.claveAdmin} onChange={handleChange} required />
        
        <button type="submit" style={{ padding: '0.7rem', background: '#2d4f46', color: 'white', border: 'none', borderRadius: '5px' }}>
          Crear Administrador
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
