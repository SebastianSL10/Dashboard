import React, { useState, useEffect } from 'react';

const TotalSalidas = () => {
    const [totalSalidas, setTotalSalidas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalSalidas = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=totalsalidas');
                const data = await response.json();
                setTotalSalidas(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de salidas');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalSalidas();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de salidas:', totalSalidas);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Salidas totales: </h2>
            <p className="text- font-bold">{totalSalidas} Salidas</p>
        </div>
    );
};

export default TotalSalidas;
