import React, { useState } from 'react';

function IngresarPres({ onCancel, onDataUpdate }) {
    const [nom_presentacion, setnom_presentacion] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const presentacion = {
            nom_presentacion,
        };

        fetch('http://52.154.73.74/api.php?apicall=createpresentacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(presentacion),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear la presentación');
                } else {
                    setMessage('Presentación creada correctamente');
                    setnom_presentacion('');
                    onDataUpdate(); // Llama a la función de actualización de datos en el componente padre
                }
            })
            .catch(error => {
                setMessage('Error en la solicitud');
                console.log(error);
            });
    };

    return (
        <div className="ingresar-container">
            <h2 className="text-2xl font-bold mb-4">Ingresar Presentaciones</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="nom_presentacion" className="block text-sm font-medium text-gray-700">
                        Nombre de la presentación:
                    </label>
                    <input
                        type="text"
                        id="nom_presentacion"
                        value={nom_presentacion}
                        onChange={e => setnom_presentacion(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Crear presentación
                </button>
                <button className="ml-8 bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 rounded hover:bg-red-600" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default IngresarPres;