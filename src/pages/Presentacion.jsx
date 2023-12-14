import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { IngresarPres, ActualizarPres, EliminarPres } from '../components';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useStateContext } from '../contexts/ContextProvider';

const Presentacion = () => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { currentColor, currentMode } = useStateContext();

  const fetchData = () => {
    fetch('http://52.154.73.74/api.php?apicall=readpresentacion')
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
      <Header category="2" title="Presentaciones" />
      <div className="md:flex">
        <div className="w-full md:w-1/3 p-4">
          {showCreateForm && <IngresarPres onDataUpdate={handleDataUpdate} />}
          {showDeleteForm && (
            <EliminarPres
              presentacion={editedRecord}
              onCancel={() => setShowDeleteForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
          {showEditForm && (
            <ActualizarPres
              presentacion={editedRecord}
              onCancel={() => setShowEditForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 p-4">
          <div className="overflow-x-auto ml-4">
            <table className="border-collapse w-full border-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 px-4 bg-gray-500 border-2">ID Presentación</th>
                  <th className="py-2 px-4 bg-gray-500 border-2">Nombre de la Presentación</th>
                  <th className="py-2 px-4 bg-gray-500 border-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id_presentacion} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border">{item.id_presentacion}</td>
                      <td className="py-2 px-4 border">{item.nom_presentacion}</td>
                      <td className="py-2 px-4 border">
                        <button className="bg-yellow-500 text-white py-1 px-2 rounded mr-0" type="button" onClick={() => handleEditClick(editedRecord)}><FiEdit /></button>
                        <button className="bg-red-600 text-white py-1 px-2 rounded ml-10" onClick={() => handleDeleteClick(editedRecord)}><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-around">
              <button
                className="border-2 border-gray-300 text-black text-sm py-1 px-2 rounded"
                style={{ backgroundColor: currentColor }} onClick={handleCreateClick}>
                Agregar nueva presentación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
