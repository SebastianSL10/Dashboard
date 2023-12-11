import React, { useState } from 'react';

function AgregarIngr({ onCancel, onDataUpdate }) {
    const [id_ingreso, setid_ingreso] = useState('');
    const [fecha_ingreso, setfecha_ingreso] = useState('');
    const [cant_producto, setcant_producto] = useState('');
    const [id_lote, setid_lote] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const lote = {
            id_ingreso,
            fecha_ingreso,
            cant_producto,
            id_lote
        };

        fetch('http://52.154.73.74/api.php?apicall=createingreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingreso),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear el ingreso');
                } else {
                    setMessage('Ingreso creado correctamente');
                    setid_ingreso('');
                    setfecha_ingreso('');
                    setcant_producto('');
                    setid_lote('');
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
            <h2 className="text-2xl font-bold mb-4">Agregar Ingreso</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="id_ingreso" className="block text-sm font-medium text-gray-700">
                        Id del Ingreso:
                    </label>
                    <input
                        type="text"
                        id="id_ingreso"
                        value={id_ingreso}
                        onChange={e => setid_ingreso(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-700">
                        Fecha de Ingreso:
                    </label>
                    <input
                        type="text"
                        id="fecha_ingreso"
                        value={fecha_ingreso}
                        onChange={e => setfecha_ingreso(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="cant_producto" className="block text-sm font-medium text-gray-700">
                        Cantidad de productos a ingresar:
                    </label>
                    <input
                        type="text"
                        id="cant_producto"
                        value={cant_producto}
                        onChange={e => setcant_producto(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
                    />
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
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Crear Ingreso
                </button>
                <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 ml-6 rounded hover:bg-red-600" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AgregarIngr;
