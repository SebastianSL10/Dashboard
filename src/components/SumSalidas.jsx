import React, { useState, useEffect } from 'react';

const SumSalidas = () => {
    const [sumSalidas, setSumSalidas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSumSalidas = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=contarsalidas');
                const data = await response.json();
                setSumSalidas(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de Salidas');
            } finally {
                setLoading(false);
            }
        };

        fetchSumSalidas();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de Salidas:', sumSalidas);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Salidas realizadas: </h2>
            <p className="text- font-bold">{sumSalidas} Salidas</p>
        </div>
    );
};

export default SumSalidas;
