import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import imagenLogo from './Logo_R&R.png';

const LoginPage = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Validar que ambos campos estén completos
      if (!username || !password) {
        setError('Por favor, ingresa tu nombre de usuario y contraseña.');
        return;
      }

      // Realizar la llamada a la API para validar las credenciales
      const response = await axios.post(
        'http://52.154.73.74/api.php?apicall=validateUserCredentials',
        { nom_usuario: username, contra_usuario: password }
      );

      // Verificar si las credenciales son válidas
      if (response.data && response.data.contenido) {
        // Redirigir al usuario al dashboard
        navigate('/inicio');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="mr-60 bg-lime-500 p-10 rounded shadow-md flex flex-col items-center">
        <img
          className="w-40 h-40 rounded-full mb-4"
          src={imagenLogo} // Utiliza la variable importada
          alt="Imagen de usuario"
        />
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Inicio de sesión</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="username">
                Nombre de Usuario:
              </label>
              <input
                className="w-80 border p-2 rounded focus:outline-none focus:border-gray-900"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="password">
                Contraseña:
              </label>
              <input
                className="w-80 border p-2 rounded focus:outline-none focus:border-gray-900"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-white hover:bg-lime-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 font-bold text-lg p-2 rounded-md">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
