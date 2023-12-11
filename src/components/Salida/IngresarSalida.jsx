import React, { useState } from 'react';

function IngresarSalida({ onCancel, onDataUpdate }) {
    const [id_salida, setIdSalida] = useState('');
    const [fecha_salida, setFechaSalida] = useState('');
    const [responsable_salida, setResponsableSalida] = useState('');
    const [cant_salida, setCantSalida] = useState('');
    const [num_id, setNumId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const salida = {
            id_salida,
            fecha_salida,
            responsable_salida,
            cant_salida,
            num_id
        };

        fetch('http://52.154.73.74/api.php?apicall=createsalida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salida),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear la salida');
                } else {
                    setMessage('Salida creada correctamente');
                    setIdSalida('');
                    setFechaSalida('');
                    setResponsableSalida('');
                    setCantSalida('');
                    setNumId('');
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
            <h2 className="text-2xl font-bold mb-4">Agregar Salida</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="id_salida" className="block text-sm font-medium text-gray-700">
                        Id de la Salida:
                    </label>
                    <input
                        type="text"
                        id="id_salida"
                        value={id_salida}
                        onChange={e => setIdSalida(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="fecha_salida" className="block text-sm font-medium text-gray-700">
                        Fecha de Salida:
                    </label>
                    <input
                        type="text"
                        id="fecha_salida"
                        value={fecha_salida}
                        onChange={e => setFechaSalida(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="responsable_salida" className="block text-sm font-medium text-gray-700">
                        Responsable de Salida:
                    </label>
                    <input
                        type="text"
                        id="responsable_salida"
                        value={responsable_salida}
                        onChange={e => setResponsableSalida(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="cant_salida" className="block text-sm font-medium text-gray-700">
                        Cantidad de productos a salir:
                    </label>
                    <input
                        type="text"
                        id="cant_salida"
                        value={cant_salida}
                        onChange={e => setCantSalida(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="num_id" className="block text-sm font-medium text-gray-700">
                        Número de ID:
                    </label>
                    <input
                        type="text"
                        id="num_id"
                        value={num_id}
                        onChange={e => setNumId(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Crear Salida
                </button>
                <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 ml-6 rounded hover:bg-red-600" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default IngresarSalida;
