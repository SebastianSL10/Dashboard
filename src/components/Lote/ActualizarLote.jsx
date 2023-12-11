import React, { useState, useEffect } from 'react';

function ActualizarLote({ lote, onCancel, onDataUpdate }) {
    const [id_lote, setIdLote] = useState('');
    const [fecha_vencimiento, setFechaVencimiento] = useState('');
    const [cant_lote, setCantLote] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Asegurarse de que la categoría no sea null antes de acceder a sus propiedades
        if (lote && lote.id_lote) {
            // Setear el estado basado en la categoría existente
            setIdLote(lote.id_lote);
            setFechaVencimiento(lote.fecha_vencimiento);
            setCantLote(lote.cant_lote);
        }
    }, [lote]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedLote = {
            id_lote,
            fecha_vencimiento,
            cant_lote
        };

        fetch('http://52.154.73.74/api.php?apicall=updatelote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLote),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al actualizar el lote');
                } else {
                    setMessage('Lote actualizado correctamente');
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
            <h2 className="text-2xl font-bold mb-4">Actualizar Lote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="id_lote">ID del lote:</label>
                    <input
                        type="text"
                        id="id_lote"
                        value={id_lote}
                        onChange={e => setIdLote(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        readOnly // Para que el campo sea de solo lectura
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fecha_vencimiento">Fecha de Vencimiento:</label>
                    <input
                        type="text"
                        id="fecha_vencimiento"
                        value={fecha_vencimiento}
                        onChange={e => setFechaVencimiento(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="cant_lote">Cantidad de productos del lote:</label>
                    <input
                        type="text"
                        id="cant_lote"
                        value={cant_lote}
                        onChange={e => setCantLote(e.target.value)}
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

export default ActualizarLote;
