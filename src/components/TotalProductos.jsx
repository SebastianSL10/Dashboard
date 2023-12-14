import React, { useState, useEffect } from 'react';

const TotalProductos = () => {
    const [totalProductos, setTotalProductos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalProductos = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=totalproductos');
                const data = await response.json();
                setTotalProductos(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de Productos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalProductos();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de Productos:', totalProductos);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Productos totales: </h2>
            <p className="text- font-bold">{totalProductos} Productos</p>
        </div>
    );
};

export default TotalProductos;
