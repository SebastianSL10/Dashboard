import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { Ingresar, ActualizarCate, EliminarCate } from '../components';
import { FiEdit } from "react-icons/fi";

const Categorias = () => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchData = () => {
    fetch('http://localhost/API/api.php?apicall=readcategoria')
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
      <Header category="2" title="Categorias" />
      <div className="md:flex">
        <div className="w-full md:w-1/3 p-4">
          {showCreateForm && <Ingresar onDataUpdate={handleDataUpdate} />}
          {showDeleteForm && (
            <EliminarCate
              categoria={editedRecord}
              onCancel={() => setShowDeleteForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
          {showEditForm && (
            <ActualizarCate
              categoria={editedRecord}
              onCancel={() => setShowEditForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 p-4">
          <div className="overflow-x-auto ml-4">
            <table className="border-collapse w-full bg-emerald-100 border-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 bg-teal-300 border-2 ">ID Categoría</th>
                  <th className="py-2 px-4 bg-teal-300 border-2">Nombre Categoría</th>
                  <th className="py-2 px-4 bg-teal-300 border-2 acciones-columna">Acciones</th>
                </tr>
              </thead>
              <tbody className="border-blue-500">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id_categoria} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border">{item.id_categoria}</td>
                      <td className="py-2 px-4 border">{item.tipo_categoria}</td>
                      <td className="py-2 px-4 border acciones-columna">
                        <button className="bg-yellow-500 text-white py-1 px-2 rounded mr-2" type="button" onClick={() => handleEditClick(editedRecord)}><FiEdit /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-around">
              <button className="bg-teal-200 border-2 border-teal-500 text-black text-sm py-1 px-2 rounded hover:bg-teal-600" onClick={handleCreateClick}>
                Agregar nueva Categoría
              </button>
              <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 rounded hover:bg-red-600" onClick={() => handleDeleteClick(editedRecord)}>
                Eliminar categoría
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorias;
