import React, { useState } from 'react';

function EliminarPer({ onCancel, onDataUpdate }) {
  const [num_id, setnum_id] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const persona = {
      num_id,
    };

    fetch('http://52.154.73.74/api.php?apicall=deletepersona', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(persona),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al eliminar la persona');
        } else {
          setMessage('Persona eliminada correctamente');
          setnum_id('');
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
      <h2 className="text-2xl font-bold mb-4">Eliminar persona</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="num_id">ID de la persona:</label>
          <input
            type="text"
            id="num_id"
            value={num_id}
            onChange={e => setnum_id(e.target.value)}
            className="mt-2 mb-4 p-2 block w-1/3 border border-red-500 border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700">Eliminar</button>
        <button type="button" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" onClick={onCancel}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EliminarPer;
