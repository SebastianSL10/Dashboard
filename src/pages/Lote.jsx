import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { IngresarLote, ActualizarLote, EliminarLote } from '../components';
import { FiEdit } from "react-icons/fi";

const Lote = () => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchData = () => {
    fetch('http://localhost/API/api.php?apicall=readlote')
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
      <Header category="5" title="Lotes" />
      <div className="md:flex">
        <div className="w-full md:w-1/3 p-4">
          {showCreateForm && <IngresarLote onDataUpdate={handleDataUpdate} />}
          {showDeleteForm && (
            <EliminarLote
              lote={editedRecord}
              onCancel={() => setShowDeleteForm(false)}
              onDataUpdate={handleDataUpdate}
            />
          )}
          {showEditForm && (
            <ActualizarLote
              lote={editedRecord}
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
                  <th className="py-2 px-4 bg-teal-300 border-2">ID Lote</th>
                  <th className="py-2 px-4 bg-teal-300 border-2">Fecha de Vencimiento</th>
                  <th className="py-2 px-4 bg-teal-300 border-2">Cantidad de Lote</th>
                  <th className="py-2 px-4 bg-teal-300 border-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="border-blue-500">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id_lote} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border">{item.id_lote}</td>
                      <td className="py-2 px-4 border">{item.fecha_vencimiento}</td>
                      <td className="py-2 px-4 border">{item.cant_lote}</td>
                      <td className="py-2 px-4 border">
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
                Agregar nuevo lote
              </button>
              <button className="bg-red-200 border-2 border-red-500 text-black text-sm py-1 px-2 rounded hover:bg-red-600" onClick={() => handleDeleteClick(editedRecord)}>
                Eliminar lote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lote;
