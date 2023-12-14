import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { IngresarPer, ActualizarPer, EliminarPer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Personas = () => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { currentColor, currentMode } = useStateContext();

  const fetchData = () => {
    fetch('http://52.154.73.74/api.php?apicall=readpersona')
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
      <Header category="4" title="Personas" />
      <div className="md:flex">
        <div className="w-full md:w-1/3 p-4">
          {showCreateForm && <IngresarPer onDataUpdate={handleDataUpdate} />}
          {showDeleteForm && (
            <EliminarPer
              persona={editedRecord}
              onCancel={() => setShowDeleteForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
          {showEditForm && (
            <ActualizarPer
              persona={editedRecord}
              onCancel={() => setShowEditForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
        </div>
        <div className="w-3/4 md:w-2/3 p-4 ">
          <div className="overflow-x-auto ml-2">
            <table className="border-collapse w-full border-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Num ID</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Tipo de ID</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Nombres</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Apellidos</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Teléfono</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Dirección</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Username</th>
                  <th className="py-2 px-4 bg-gray-500 border-2 text-xs">Contraseña de Usuario</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.num_id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border text-sm">{item.num_id}</td>
                      <td className="py-2 px-4 border text-sm">{item.tipo_id}</td>
                      <td className="py-2 px-4 border text-sm">{item.prim_nombre} {item.segun_nombre}</td>
                      <td className="py-2 px-4 border text-sm">{item.prim_apellido} {item.segun_apellido}</td>
                      <td className="py-2 px-4 border text-sm">{item.telefono}</td>
                      <td className="py-2 px-4 border text-sm">{item.direccion}</td>
                      <td className="py-2 px-4 border text-sm">{item.nom_usuario}</td>
                      <td className="py-2 px-4 border text-sm">{item.contra_usuario}</td>
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
              <button
                className="border-2 border-gray-300 text-black text-sm py-1 px-2 rounded"
                style={{ backgroundColor: currentColor }} onClick={handleCreateClick}>
                Agregar nueva persona
              </button>
              <button className="bg-yellow-200 border-2 border-yellow-500 text-black text-sm py-1 px-3 rounded hover:bg-yellow-600" type="button" onClick={() => handleEditClick(editedRecord)}>
                Editar usuario
              </button>
              <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-1 rounded hover:bg-red-600" onClick={() => handleDeleteClick(editedRecord)}>
                Eliminar persona
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personas;
