import React, { useState, useEffect } from 'react';

function ActualizarCate({ categoria, onCancel, onDataUpdate }) {
  const [id_categoria, setIdCategoria] = useState('');
  const [tipo_categoria, setTipoCategoria] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Asegurarse de que la categoría no sea null antes de acceder a sus propiedades
    if (categoria && categoria.id_categoria) {
      // Setear el estado basado en la categoría existente
      setIdCategoria(categoria.id_categoria);
      setTipoCategoria(categoria.tipo_categoria);
    }
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategoria = {
      id_categoria,
      tipo_categoria,
    };

    fetch('http://52.154.73.74/api.php?apicall=updatecategoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategoria),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al actualizar la categoría');
        } else {
          setMessage('Categoría actualizada correctamente');
          onDataUpdate(); // Actualizar los datos de la tabla después de la actualización
        }
      })
      .catch(error => {
        setMessage('Error en la solicitud');
        console.log(error);
      });
  };

  return (
    <div className="Actualizar-container">
      <h2 className="text-2xl font-bold mb-4">Actualizar categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_categoria">ID de la categoría:</label>
          <input
            type="text"
            id="id_categoria"
            value={id_categoria}
            onChange={e => setIdCategoria(e.target.value)}
            className="mt-2 mb-4 p-2 block w-1/3 border border-gray-500 border-2 rounded-md text-black shadow-sm"
            required // Para que el campo sea de solo lectura
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="tipo_categoria">Nombre de la categoría:</label>
          <input
            type="text"
            id="tipo_categoria"
            value={tipo_categoria}
            onChange={e => setTipoCategoria(e.target.value)}
            className="mt-2 mb-4 p-2 block w-1/3 border border-gray-500 border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700">
          Actualizar
        </button>
        <button className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ActualizarCate;
