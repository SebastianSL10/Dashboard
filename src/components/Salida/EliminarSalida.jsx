import React, { useState } from 'react';

function EliminarSalida({ onCancel, onDataUpdate }) {
    const [id_salida, setIdSalida] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const salida = {
            id_salida,
        };

        fetch('http://52.154.73.74/api.php?apicall=deletesalida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salida),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al eliminar la salida');
                } else {
                    setMessage('Salida eliminada correctamente');
                    setIdSalida('');
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
            <h2 className="text-2xl font-bold mb-4">Eliminar salida</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="id_salida">ID de la salida:</label>
                    <input
                        type="text"
                        id="id_salida"
                        value={id_salida}
                        onChange={e => setIdSalida(e.target.value)}
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

export default EliminarSalida;
