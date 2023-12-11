import React, { useState, useEffect } from 'react';

function ActualizarIngr({ ingreso, onCancel, onDataUpdate }) {
    const [id_ingreso, setIdIngreso] = useState('');
    const [fecha_ingreso, setFechaIngreso] = useState('');
    const [cant_producto, setCantProducto] = useState('');
    const [id_lote, setIdLote] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Asegurarse de que la categoría no sea null antes de acceder a sus propiedades
        if (ingreso && ingreso.id_ingreso) {
            // Setear el estado basado en la categoría existente
            setIdLote(ingreso.id_ingreso);
            setFechaIngreso(ingreso.fecha_ingreso);
            setCantProducto(ingreso.cant_producto);
            setIdLote(ingreso.id_lote);
        }
    }, [ingreso]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedIngreso = {
            id_ingreso,
            fecha_ingreso,
            cant_producto,
            id_lote
        };

        fetch('http://52.154.73.74/api.php?apicall=updateingreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedIngreso),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al actualizar el ingreso');
                } else {
                    setMessage('Ingreso actualizado correctamente');
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
            <h2 className="text-2xl font-bold mb-4">Actualizar Ingreso</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="id_ingreso">ID del ingreso:</label>
                    <input
                        type="text"
                        id="id_ingreso"
                        value={id_ingreso}
                        onChange={e => setIdIngreso(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        readOnly // Para que el campo sea de solo lectura
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fecha_ingreso">Fecha de Ingreso:</label>
                    <input
                        type="text"
                        id="fecha_ingreso"
                        value={fecha_ingreso}
                        onChange={e => setFechaIngreso(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="cant_producto">Cantidad de productos a ingresar:</label>
                    <input
                        type="text"
                        id="cant_producto"
                        value={cant_producto}
                        onChange={e => setCantProducto(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                        required
                    />
                </div>
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

export default ActualizarIngr;
