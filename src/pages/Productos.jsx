import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { IngresarPro, ActualizarPro, EliminarPro } from '../components';

const Productos = () => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchData = () => {
    fetch('http://localhost/API/api.php?apicall=readproducto')
      .then(response => response.json())
      .then(data => setData(data.contenido))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataUpdate = () => {
    fetchData();
  };

  const handleEditClick = (record) => {
    setShowEditForm(true);
    setEditedRecord(record);
  };

  const handleDeleteClick = (record) => {
    setShowDeleteForm(true);
    setEditedRecord(record);
  };

  const handleCreateClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div className="m-2 md:m-10 mt-24 bg-white rounded-3xl">
      <Header category="1" title="Productos" />
      <div className="md:flex">
        <div className="w-full md:w-1/3 p-4">
          {showCreateForm && <IngresarPro onDataUpdate={handleDataUpdate} />}
          {showDeleteForm && (
            <EliminarPro
              persona={editedRecord}
              onCancel={() => setShowDeleteForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
          {showEditForm && (
            <ActualizarPro
              persona={editedRecord}
              onCancel={() => setShowEditForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
        </div>
        <div className="w-3/4 md:w-2/3 p-4 ">
          <div className="overflow-x-auto ml-2">
            <table className="border-collapse w-full bg-emerald-100 border-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">ID Producto</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">Nombre Producto</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">Número de Productos</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">Valor Unitario</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">Descripción</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">ID Categoría</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 text-xs">ID Presentación</th>
                </tr>
              </thead>
              <tbody className="border-blue-500">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id_producto} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border text-sm">{item.id_producto}</td>
                      <td className="py-2 px-4 border text-sm">{item.nom_producto}</td>
                      <td className="py-2 px-4 border text-sm">{item.num_producto}</td>
                      <td className="py-2 px-4 border text-sm">{item.valor_unitario}</td>
                      <td className="py-2 px-4 border text-sm">{item.descripcion}</td>
                      <td className="py-2 px-4 border text-sm">{item.id_categoria}</td>
                      <td className="py-2 px-4 border text-sm">{item.id_presentacion}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-around">
              <button className="bg-teal-200 border-2 border-teal-500 text-black text-sm py-1 px-1 rounded hover:bg-teal-600" onClick={handleCreateClick}>
                Agregar nuevo producto
              </button>
              <button className="bg-yellow-200 border-2 border-yellow-500 text-black text-sm py-1 px-3 rounded hover:bg-yellow-600" type="button" onClick={() => handleEditClick(editedRecord)}>
                Editar producto
              </button>
              <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-1 rounded hover:bg-red-600" onClick={() => handleDeleteClick(editedRecord)}>
                Eliminar producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
