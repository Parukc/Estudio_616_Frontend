// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ Importa la instancia de axios

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    nombres: '',
    telefono: '',
    username: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        ...form,
        role: 'user', // ✅ rol explícito
      });
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar usuario');
      console.error(error);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 🟦 Encabezado blanco */}
      <div style={{ background: '#ffffff', color: '#000', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold' }}>REGÍSTRATE COMO USUARIO</h2>
        <p>Si ya tienes cuenta, inicia sesión aquí:</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#5e7f73',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Iniciar Sesión
        </button>
      </div>

      {/* 🟩 Formulario */}
      <section style={{ backgroundColor: '#5e7f73', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '500px', margin: 'auto', color: 'white' }}>
          <h3>Formulario de Registro</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
            <input type="text" name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} required />
            <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />

            <button
              type="submit"
              style={{
                padding: '0.6rem',
                background: '#1c4532',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Registrarse
            </button>
          </form>
        </div>
      </section>

      {/* 🟫 Footer */}
      <footer style={{ background: '#23312f', padding: '2rem', color: 'white' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: '#58756d', width: '60px', height: '60px', borderRadius: '50%' }}></div>
          <div>
            <strong>Equipo de Atención al Cliente</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Listo para ayudarte</p>
            <p>Estamos disponibles para responder tus inquietudes.</p>
          </div>
          <button style={{
            background: '#58756d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}>
            Contacta a un Agente
          </button>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
