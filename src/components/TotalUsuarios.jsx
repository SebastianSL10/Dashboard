import React, { useState, useEffect } from 'react';

const TotalUsuarios = () => {
    const [totalUsuarios, setTotalUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalUsuarios = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=totalpersonas');
                const data = await response.json();
                setTotalUsuarios(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalUsuarios();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de usuarios:', totalUsuarios);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Total de Usuarios</h2>
            <p className="text- font-bold">{totalUsuarios} usuarios</p>
        </div>
    );
};

export default TotalUsuarios;
