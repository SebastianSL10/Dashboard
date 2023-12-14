import React, { useState, useEffect } from 'react';

function ActualizarSalida({ salida, onCancel, onDataUpdate }) {
    const [id_salida, setIdSalida] = useState('');
    const [fecha_salida, setFechaSalida] = useState('');
    const [responsable_salida, setResponsableSalida] = useState('');
    const [num_id, setNumId] = useState('');
    const [cant_salida, setCantSalida] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Asegurarse de que la salida no sea null antes de acceder a sus propiedades
        if (salida && salida.id_salida) {
            // Setear el estado basado en la salida existente
            setIdSalida(salida.id_salida);
            setFechaSalida(salida.fecha_salida);
            setResponsableSalida(salida.responsable_salida);
            setNumId(salida.num_id);
            setCantSalida(salida.cant_salida);
            
        }
    }, [salida]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSalida = {
            id_salida,
            fecha_salida,
            responsable_salida,
            num_id,
            cant_salida
            
        };

        fetch('http://52.154.73.74/api.php?apicall=updatesalida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSalida),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al actualizar la salida');
                } else {
                    setMessage('Salida actualizada correctamente');
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
            <h2 className="text-2xl font-bold mb-4">Actualizar Salida</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="id_salida">ID de la Salida:</label>
                    <input
                        type="text"
                        id="id_salida"
                        value={id_salida}
                        onChange={e => setIdSalida(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        readOnly // Para que el campo sea de solo lectura
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fecha_salida">Fecha de Salida:</label>
                    <input
                        type="text"
                        id="fecha_salida"
                        value={fecha_salida}
                        onChange={e => setFechaSalida(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="responsable_salida">Responsable de Salida:</label>
                    <input
                        type="text"
                        id="responsable_salida"
                        value={responsable_salida}
                        onChange={e => setResponsableSalida(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="num_id">Número de ID:</label>
                    <input
                        type="text"
                        id="num_id"
                        value={num_id}
                        onChange={e => setNumId(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        readOnly // Para que el campo sea de solo lectura
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="cant_salida">Cantidad de productos a salir:</label>
                    <input
                        type="text"
                        id="cant_salida"
                        value={cant_salida}
                        onChange={e => setCantSalida(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700">
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

export default ActualizarSalida;
