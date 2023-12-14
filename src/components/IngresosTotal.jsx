import React, { useState, useEffect } from 'react';

const IngresosTotal = () => {
    const [ingresosTotal, setIngresosTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIngresosTotal = async () => {
            try {
                const response = await fetch('http://localhost/API/api.php?apicall=totalingresos');
                const data = await response.json();
                setIngresosTotal(data.contenido); // Ajusta aquí la propiedad según la respuesta real
            } catch (error) {
                setError('Error al obtener el total de ingresos');
            } finally {
                setLoading(false);
            }
        };

        fetchIngresosTotal();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log('Total de ingresos:', ingresosTotal);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Ingresos totales: </h2>
            <p className="text- font-bold">{ingresosTotal} Ingresos</p>
        </div>
    );
};

export default IngresosTotal;
