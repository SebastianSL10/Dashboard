import React, { useState } from 'react';

function EliminarIngr({ onCancel, onDataUpdate }) {
  const [id_ingreso, setid_ingreso] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingreso = {
      id_ingreso,
    };

    fetch('http://52.154.73.74/api.php?apicall=deleteingreso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingreso),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al eliminar el ingreso');
        } else {
          setMessage('Ingreso eliminado correctamente');
          setid_ingreso('');
          onDataUpdate(); // Actualizar los datos de la tabla después de la eliminación
        }
      })
      .catch(error => {
        setMessage('Error en la solicitud');
        console.log(error);
      });
  };

  return (
    <div className="Delete-container">
      <h2 className="text-2xl font-bold mb-4">Eliminar ingreso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_ingreso">ID del ingreso:</label>
          <input
            type="text"
            id="id_ingreso"
            value={id_ingreso}
            onChange={e => setid_ingreso(e.target.value)}
            className="mt-2 mb-4 p-2 block w-1/3 border border-red-500 border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700">Eliminar</button>
        <button className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" type="button" onClick={onCancel}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EliminarIngr;
