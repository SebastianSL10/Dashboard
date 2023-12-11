import React, { useState, useEffect } from 'react';

function ActualizarPro({ producto, onCancel, onDataUpdate }) {
  const [id_producto, setIdProducto] = useState('');
  const [nom_producto, setNomProducto] = useState('');
  const [num_producto, setNumProducto] = useState('');
  const [valor_unitario, setValorUnitario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_categoria, setIdCategoria] = useState('');
  const [id_presentacion, setIdPresentacion] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (producto && producto.id_producto) {
      setIdProducto(producto.id_producto);
      setNomProducto(producto.nom_producto);
      setNumProducto(producto.num_producto);
      setValorUnitario(producto.valor_unitario);
      setDescripcion(producto.descripcion);
      setIdCategoria(producto.id_categoria);
      setIdPresentacion(producto.id_presentacion);
    }
  }, [producto]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const productoUpdate = {
      id_producto,
      nom_producto,
      num_producto,
      valor_unitario,
      descripcion,
      id_categoria,
      id_presentacion,
    };

    fetch('http://52.154.73.74/api.php?apicall=updateproducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoUpdate),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage('Error al actualizar el producto');
        } else {
          setMessage('Producto actualizado correctamente');
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
      <h3 className="text-2xl font-bold mb-4">Actualizar producto</h3>
      <form onSubmit={handleUpdate}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_producto">ID del producto:</label>
          <input
            type="text"
            id="id_producto"
            value={id_producto}
            onChange={e => setIdProducto(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="nom_producto">Nombre del producto:</label>
          <input
            type="text"
            id="nom_producto"
            value={nom_producto}
            onChange={e => setNomProducto(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="num_producto">Número del producto:</label>
          <input
            type="text"
            id="num_producto"
            value={num_producto}
            onChange={e => setNumProducto(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="valor_unitario">Valor unitario:</label>
          <input
            type="text"
            id="valor_unitario"
            value={valor_unitario}
            onChange={e => setValorUnitario(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_categoria">ID de la categoría:</label>
          <input
            type="text"
            id="id_categoria"
            value={id_categoria}
            onChange={e => setIdCategoria(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="id_presentacion">ID de la presentación:</label>
          <input
            type="text"
            id="id_presentacion"
            value={id_presentacion}
            onChange={e => setIdPresentacion(e.target.value)}
            className="mt-1 pt-2 block w-60 border border-gray text-sm border-2 rounded-md text-black shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-teal-600 hover:bg-teal-700 mt-4">Actualizar producto</button>
        <button type="button" className="px-4 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 ml-4" onClick={onCancel}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ActualizarPro;
