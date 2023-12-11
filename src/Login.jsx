import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [nomUsuario, setNomUsuario] = useState('');
  const [contraUsuario, setContraUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Validar que los campos estén completos antes de enviar la solicitud de inicio de sesión
      if (!nomUsuario || !contraUsuario) {
        setError('Por favor, completa todos los campos.');
        return;
      }

      // Realiza la solicitud de inicio de sesión a la API
      const response = await fetch('http://52.154.73.74/api.php?apicall=readpersona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom_usuario: nomUsuario, contra_usuario: contraUsuario }), // Cambiado aquí
      });

      if (response.ok) {
        // El inicio de sesión fue exitoso, realiza redirección
        navigate('/inicio');
      } else {
        // El inicio de sesión falló, maneja el error
        setError('Inicio de sesión fallido');
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nomUsuario}
          onChange={(e) => setNomUsuario(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraUsuario}
          onChange={(e) => setContraUsuario(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default Login;
