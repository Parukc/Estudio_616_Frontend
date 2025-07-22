import { Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import AgregarProyecto from './pages/AgregarProyecto';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import UploadGallery from './pages/UploadGallery';
import AdminContactos from './pages/AdminContactos';
import AdminRoute from './components/protected/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';
import CreateAdmin from './pages/CreateAdmin';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminProyectos from './pages/AdminProyectos';
import EditarProyecto from './pages/EditarProyecto'; // ✅ IMPORTACIÓN NUEVA

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Panel de usuario protegido */}
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Panel de administrador protegido */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Rutas exclusivas para administrador */}
        <Route
          path="/crear-proyecto"
          element={
            <AdminRoute>
              <AgregarProyecto />
            </AdminRoute>
          }
        />
        <Route
          path="/upload-gallery"
          element={
            <AdminRoute>
              <UploadGallery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <CreateAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contactos"
          element={
            <AdminRoute>
              <AdminContactos />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <AdminUsuarios />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/proyectos"
          element={
            <AdminRoute>
              <AdminProyectos />
            </AdminRoute>
          }
        />
        <Route
          path="/editar-proyecto/:id"
          element={
            <AdminRoute>
              <EditarProyecto />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
