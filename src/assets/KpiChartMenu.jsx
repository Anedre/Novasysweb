import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registro de componentes necesarios en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const KpiChartMenu = () => {
  // Estado para el KPI seleccionado
  const [selectedKpi, setSelectedKpi] = useState('productivity');

  // Ejemplo de datasets para cada KPI (puedes ajustar los valores y etiquetas según tus datos reales)
  const dataSets = {
    productivity: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Productividad (%)',
          data: [20, 22, 25, 28, 30], // En 2023 (año del proyecto) se muestra el 30%
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
        },
      ],
    },
    responseTime: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Reducción en tiempos de respuesta (%)',
          data: [10, 15, 20, 35, 40],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    managedClients: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Clientes gestionados (K)',
          data: [5, 7, 9, 10, 10.5],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
  };

  // Opciones básicas para el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Manejador para cambiar el KPI seleccionado
  const handleKpiChange = (e) => {
    setSelectedKpi(e.target.value);
  };

  return (
    <div className="kpi-chart-menu">
      {/* Menú de selección */}
      <select value={selectedKpi} onChange={handleKpiChange}>
        <option value="productivity">Aumento de Productividad</option>
        <option value="responseTime">Reducción en Tiempos de Respuesta</option>
        <option value="managedClients">Clientes Gestionados</option>
      </select>

      {/* Contenedor del gráfico */}
      <div style={{ width: '300px', height: '200px', margin: '1rem auto' }}>
        <Bar data={dataSets[selectedKpi]} options={options} />
      </div>
    </div>
  );
};

export default KpiChartMenu;
