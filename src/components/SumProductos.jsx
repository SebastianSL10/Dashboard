import React, { useState, useEffect } from 'react';

const SumProductos = () => {
    const [sumProductos, setSumPoductos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSumPoductos = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=contarproductos');
                const data = await response.json();
                setSumPoductos(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de productos');
            } finally {
                setLoading(false);
            }
        };

        fetchSumPoductos();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de productos:', sumProductos);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Productos iniciales: </h2>
            <p className="text- font-bold">{sumProductos} Productos</p>
        </div>
    );
};

export default SumProductos;
