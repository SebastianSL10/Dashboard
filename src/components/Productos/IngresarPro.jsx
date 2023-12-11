import React, { useState } from 'react';

function IngresarPro({ onCancel, onDataUpdate }) {
  const [id_producto, setIdProducto] = useState('');
  const [nom_producto, setNomProducto] = useState('');
  const [num_producto, setNumProducto] = useState('');
  const [valor_unitario, setValorUnitario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_categoria, setIdCategoria] = useState('');
  const [id_presentacion, setIdPresentacion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const producto = {
      id_producto,
      nom_producto,
      num_producto,
      valor_unitario,
      descripcion,
      id_categoria,
      id_presentacion,
    };

    fetch('http://52.154.73.74/api.php?apicall=createproducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage('Error al crear el producto');
        } else {
          setMessage('Producto creado correctamente');
          setIdProducto('');
          setNomProducto('');
          setNumProducto('');
          setValorUnitario('');
          setDescripcion('');
          setIdCategoria('');
          setIdPresentacion('');
          onDataUpdate(); // Llama a la función de actualización de datos en el componente padre
        }
      })
      .catch((error) => {
        setMessage('Error en la solicitud');
        console.log(error);
      });
  };

  return (
    <div className="ingresar-container">
      <h2 className="text-2xl font-bold mb-4">Ingresar Producto</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="id_producto" className="block text-sm font-medium text-gray-700">
            ID Producto:
          </label>
          <input
            type="text"
            id="id_producto"
            value={id_producto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="nom_producto" className="block text-sm font-medium text-gray-700">
            Nombre Producto:
          </label>
          <input
            type="text"
            id="nom_producto"
            value={nom_producto}
            onChange={(e) => setNomProducto(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="num_producto" className="block text-sm font-medium text-gray-700">
            Número Producto:
          </label>
          <input
            type="text"
            id="num_producto"
            value={num_producto}
            onChange={(e) => setNumProducto(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="valor_unitario" className="block text-sm font-medium text-gray-700">
            Valor Unitario:
          </label>
          <input
            type="text"
            id="valor_unitario"
            value={valor_unitario}
            onChange={(e) => setValorUnitario(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="id_categoria" className="block text-sm font-medium text-gray-700">
            ID Categoría:
          </label>
          <input
            type="text"
            id="id_categoria"
            value={id_categoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
          <label htmlFor="id_presentacion" className="block text-sm font-medium text-gray-700">
            ID Presentación:
          </label>
          <input
            type="text"
            id="id_presentacion"
            value={id_presentacion}
            onChange={(e) => setIdPresentacion(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray border-2 rounded-md text-black shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Producto
        </button>
        <button className="ml-6 bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 rounded hover:bg-red-600" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default IngresarPro;
