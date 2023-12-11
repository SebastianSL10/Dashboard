import React, { useState, useEffect } from 'react';

function ActualizarPer({ persona, onCancel, onDataUpdate }) {
  const [num_id, setNumId] = useState('');
  const [tipo_id, setTipoId] = useState('');
  const [prim_nombre, setPrimNombre] = useState('');
  const [segun_nombre, setSegunNombre] = useState('');
  const [prim_apellido, setPrimApellido] = useState('');
  const [segun_apellido, setSegunApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nom_usuario, setNomUsuario] = useState('');
  const [contra_usuario, setContraUsuario] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (persona && persona.num_id) {
      setNumId(persona.num_id);
      setTipoId(persona.tipo_id);
      setPrimNombre(persona.prim_nombre);
      setSegunNombre(persona.segun_nombre || '');
      setPrimApellido(persona.prim_apellido);
      setSegunApellido(persona.segun_apellido || '');
      setTelefono(persona.telefono);
      setDireccion(persona.direccion);
      setNomUsuario(persona.nom_usuario);
      setContraUsuario(persona.contra_usuario);
    }
  }, [persona]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const personaUpdate = {
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

    fetch('http://52.154.73.74/api.php?apicall=updatepersona', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personaUpdate),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al actualizar la persona');
        } else {
          setMessage('Persona actualizada correctamente');
          onDataUpdate();
          onCancel();
        }
      })
      .catch(error => {
        setMessage('Error en la solicitud');
        console.log(error);
      });
  };

  return (
    <div className="ingresar-container">
      <h3 className="text-2xl font-bold mb-4">Actualizar persona</h3>
      <form onSubmit={handleUpdate}>
        {/* Resto de tu código para los campos de entrada */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="num_id">ID de la persona:</label>
          <input
            type="text"
            id="num_id"
            value={num_id}
            onChange={e => setNumId(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="tipo_id">Tipo de Id:</label>
          <input
            type="text"
            id="tipo_id"
            value={tipo_id}
            onChange={e => setTipoId(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="prim_nombre">Primer Nombre:</label>
          <input
            type="text"
            id="prim_nombre"
            value={prim_nombre}
            onChange={e => setPrimNombre(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="segun_nombre">Segundo Nombre:</label>
          <input
            type="text"
            id="segun_nombre"
            value={segun_nombre}
            onChange={e => setSegunNombre(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="prim_apellido">Primer Apellido:</label>
          <input
            type="text"
            id="prim_apellido"
            value={prim_apellido}
            onChange={e => setPrimApellido(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="segun_apellido">Segundo Apellido:</label>
          <input
            type="text"
            id="segun_apellido"
            value={segun_apellido}
            onChange={e => setSegunApellido(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="nom_usuario">Nombre de Usuario:</label>
          <input
            type="text"
            id="nom_usuario"
            value={nom_usuario}
            onChange={e => setNomUsuario(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contra_usuario">Contraseña de Usuario:</label>
          <input
            type="text"
            id="contra_usuario"
            value={contra_usuario}
            onChange={e => setContraUsuario(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700 mt-4">Actualizar persona</button>
        <button type="button" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" onClick={onCancel}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ActualizarPer;
