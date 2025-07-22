import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    nombres: '',
    telefono: '',
    username: '',
    address: '',
    role: 'admin',         // 👈 se registra como admin
    claveAdmin: '',        // 👈 clave para validar admin
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        ...form
      });
      alert('Administrador registrado correctamente');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar usuario');
      console.error(error);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Encabezado */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        background: 'white',
        color: '#0c0c0c'
      }}>
        <h1 style={{ fontWeight: 'bold' }}>REGÍSTRATE COMO ADMINISTRADOR</h1>
        <p>Si ya cuentas con usuario y contraseña - inicia sesión</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#5e7f73',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Formulario */}
      <section style={{ backgroundColor: '#5e7f73', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '500px', margin: 'auto', color: 'white' }}>
          <h2>Formulario de Registro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="admin@admin.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                placeholder="Ej: Carlos Alberto"
                value={form.nombres}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="0999999999"
                value={form.telefono}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                placeholder="admin616"
                value={form.username}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Dirección</label>
              <input
                type="text"
                name="address"
                placeholder="Av. 10 de Agosto y Colón"
                value={form.address}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div>
              <label>Clave de Administrador</label>
              <input
                type="password"
                name="claveAdmin"
                placeholder="admin123"
                value={form.claveAdmin}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.6rem',
                background: 'transparent',
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Registrarse
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#23312f', padding: '2rem', color: 'white' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: '#58756d', width: '60px', height: '60px', borderRadius: '50%' }}></div>
          <div>
            <strong>Equipo de Atención al Cliente</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Listo para Ayudarte</p>
            <p>Nuestro equipo está disponible para responder a todas tus preguntas.</p>
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
