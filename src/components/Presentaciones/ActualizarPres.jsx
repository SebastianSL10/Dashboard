import React, { useState, useEffect } from 'react';

function ActualizarPres({ presentacion, onCancel, onDataUpdate }) {
  const [id_presentacion, setIdPresentacion] = useState('');
  const [nom_presentacion, setNomPresentacion] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (presentacion && presentacion.id_presentacion) {
      setIdPresentacion(presentacion.id_presentacion);
      setNomPresentacion(presentacion.nom_presentacion);
    }
  }, [presentacion]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const presentacionUpdate = {
      id_presentacion,
      nom_presentacion,
    };

    fetch('http://52.154.73.74/api.php?apicall=updatepresentacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presentacionUpdate),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al actualizar la presentación');
        } else {
          setMessage('Presentación actualizada correctamente');
          onDataUpdate();
        }
      })
      .catch(error => {
        setMessage('Error en la solicitud');
        console.log(error);
      });
  };

  return (
    <div className="ingresar-container">
      <h2 className="text-2xl font-bold mb-4">Actualizar presentación</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_presentacion">ID de la presentación:</label>
          <input
            type="text"
            id="id_presentacion"
            value={id_presentacion}
            onChange={e => setIdPresentacion(e.target.value)}
            className="mt-2 mb-4 p-2 block w-60 border border-gray-500 border-2 rounded-md text-black shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="nom_presentacion">Nombre de la presentación:</label>
          <input
            type="text"
            id="nom_presentacion"
            value={nom_presentacion}
            onChange={e => setNomPresentacion(e.target.value)}
            className="mt-1 mb-4 p-2 pt-2 block w-60 border border-gray-500 border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700" type="submit">
          Actualizar presentación
        </button>
        <button className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ActualizarPres;
