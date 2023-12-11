import React, { useState } from 'react';

function IngresarPer({ onDataUpdate }) {
    const [num_id, setnum_id] = useState('');
    const [tipo_id, settipo_id] = useState('');
    const [prim_nombre, setprim_nombre] = useState('');
    const [segun_nombre, setsegun_nombre] = useState('');
    const [prim_apellido, setprim_apellido] = useState('');
    const [segun_apellido, setsegun_apellido] = useState('');
    const [telefono, settelefono] = useState('');
    const [direccion, setdireccion] = useState('');
    const [nom_usuario, setnom_usuario] = useState('');
    const [contra_usuario, setcontra_usuario] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const persona = {
            num_id,
            tipo_id,
            prim_nombre,
            segun_nombre,
            prim_apellido,
            segun_apellido,
            telefono,
            direccion,
            nom_usuario,
            contra_usuario,
        };

        fetch('http://52.154.73.74/api.php?apicall=createpersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear la persona');
                } else {
                    setMessage('Persona creada correctamente');
                    setnum_id('');
                    settipo_id('');
                    setprim_nombre('');
                    setsegun_nombre('');
                    setprim_apellido('');
                    setsegun_apellido('');
                    settelefono('');
                    setdireccion('');
                    setnom_usuario('');
                    setcontra_usuario('');
                    onDataUpdate(); // Llama a la función de actualización de datos en el componente padre
                }
            })
            .catch(error => {
                setMessage('Error en la solicitud');
                console.log(error);
            });
    };

    return (
        <div className="ingresar-container w-3/4">
            <h3 className="text-2xl font-bold mb-4">Ingresar Personas</h3>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="num_id" className="block text-xs font-medium text-gray-700">
                        Número de identificación:
                    </label>
                    <input
                        type="text"
                        id="num_id"
                        value={num_id}
                        onChange={e => setnum_id(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="tipo_id" className="block text-xs font-medium text-gray-700">
                        Tipo de Id:
                    </label>
                    <input
                        type="text"
                        id="tipo_id"
                        value={tipo_id}
                        onChange={e => settipo_id(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="prim_nombre" className="block text-xs font-medium text-gray-700">
                        Primer Nombre:
                    </label>
                    <input
                        type="text"
                        id="prim_nombre"
                        value={prim_nombre}
                        onChange={e => setprim_nombre(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="segun_nombre" className="block text-xs font-medium text-gray-700">
                        Segundo Nombre:
                    </label>
                    <input
                        type="text"
                        id="segun_nombre"
                        value={segun_nombre}
                        onChange={e => setsegun_nombre(e.target.value)}
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="prim_apellido" className="block text-xs font-medium text-gray-700">
                        Primer Apellido:
                    </label>
                    <input
                        type="text"
                        id="prim_apellido"
                        value={prim_apellido}
                        onChange={e => setprim_apellido(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="segun_apellido" className="block text-xs font-medium text-gray-700">
                        Segundo Apellido:
                    </label>
                    <input
                        type="text"
                        id="segun_apellido"
                        value={segun_apellido}
                        onChange={e => setsegun_apellido(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="telefono" className="block text-xs font-medium text-gray-700">
                        Teléfono:
                    </label>
                    <input
                        type="text"
                        id="telefono"
                        value={telefono}
                        onChange={e => settelefono(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="direccion" className="block text-xs font-medium text-gray-700">
                        Dirección:
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={e => setdireccion(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="nom_usuario" className="block text-xs font-medium text-gray-700">
                        Nombre de Usuario:
                    </label>
                    <input
                        type="text"
                        id="nom_usuario"
                        value={nom_usuario}
                        onChange={e => setnom_usuario(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                    <label htmlFor="contra_usuario" className="block text-xs font-medium text-gray-700">
                        Contraseña de Usuario:
                    </label>
                    <input
                        type="password"
                        id="contra_usuario"
                        value={contra_usuario}
                        onChange={e => setcontra_usuario(e.target.value)}
                        required
                        className="mt-1 pt-2 block w-50 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Crear Persona
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default IngresarPer;
