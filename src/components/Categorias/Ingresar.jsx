import React, { useState } from 'react';

function IngresarCate({ onCancel, onDataUpdate }) {
    const [tipo_categoria, settipo_categoria] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoria = {
            tipo_categoria,
        };

        fetch('http://52.154.73.74/api.php?apicall=createcategoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear la categoría');
                } else {
                    setMessage('Categoría creada correctamente');
                    settipo_categoria('');
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
            <h2 className="text-2xl font-bold mb-4">Ingresar Categorías</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="tipo_categoria" className="block text-sm font-medium text-gray-700">
                        Nombre de la categoría:
                    </label>
                    <input
                        type="text"
                        id="tipo_categoria"
                        value={tipo_categoria}
                        onChange={e => settipo_categoria(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Crear Categoría
                </button>
                <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 rounded hover:bg-red-600" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default IngresarCate;
