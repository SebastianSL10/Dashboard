import React, { useState } from 'react';

function IngresarLote({ onCancel, onDataUpdate }) {
    const [id_lote, setid_lote] = useState('');
    const [fecha_vencimiento, setfecha_vencimiento] = useState('');
    const [cant_lote, setcant_lote] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const lote = {
            id_lote,
            fecha_vencimiento,
            cant_lote
        };

        fetch('http://52.154.73.74/api.php?apicall=createlote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lote),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear el lote');
                } else {
                    setMessage('Lote creado correctamente');
                    setid_lote('');
                    setfecha_vencimiento('');
                    setcant_lote('');
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
            <h2 className="text-2xl font-bold mb-4">Ingresar Lotes</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="id_lote" className="block text-sm font-medium text-gray-700">
                        Id del Lote:
                    </label>
                    <input
                        type="text"
                        id="id_lote"
                        value={id_lote}
                        onChange={e => setid_lote(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="fecha_vencimiento" className="block text-sm font-medium text-gray-700">
                        Fecha de Vencimiento:
                    </label>
                    <input
                        type="text"
                        id="fecha_vencimiento"
                        value={fecha_vencimiento}
                        onChange={e => setfecha_vencimiento(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="cant_lote" className="block text-sm font-medium text-gray-700">
                        Cantidad de productos del lote:
                    </label>
                    <input
                        type="text"
                        id="cant_lote"
                        value={cant_lote}
                        onChange={e => setcant_lote(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Crear Lote
                </button>
                <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 ml-6 rounded hover:bg-red-600" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default IngresarLote;
