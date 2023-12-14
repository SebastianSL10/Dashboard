import React, { useState, useEffect } from 'react';

const SumIngresos = () => {
    const [sumIngresos, setSumIngresos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSumIngresos = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=contaringresos');
                const data = await response.json();
                setSumIngresos(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de ingresos');
            } finally {
                setLoading(false);
            }
        };

        fetchSumIngresos();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de Ingresos:', sumIngresos);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Ingresos realizados: </h2>
            <p className="text- font-bold">{sumIngresos} Ingresos</p>
        </div>
    );
};

export default SumIngresos;
