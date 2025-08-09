import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const KpiDashboard = () => {
  const [selectedKpi, setSelectedKpi] = useState('productivity');
  const [animationKey, setAnimationKey] = useState(0);

  const dataSets = {
    productivity: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Productividad (%)',
          data: [20, 22, 25, 28, 30],
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(0, 123, 255, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        },
      ],
    },
    responseTime: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Reducción en tiempos de respuesta (%)',
          data: [10, 15, 20, 35, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    },
    managedClients: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Clientes gestionados (K)',
          data: [5, 7, 9, 10, 10.5],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        title: {
          display: true,
          text: 'Año',
          color: '#666',
          font: { size: 14 },
        },
      },
      y: {
        display: true,
        grid: { color: '#eee' },
        title: {
          display: true,
          text: 'Crecimiento (%)',
          color: '#666',
          font: { size: 14 },
        },
      },
    },
  };

  const kpiCards = [
    {
      key: 'productivity',
      icon: <span className="metric-icon" role="img" aria-label="gráfico">📈</span>,
      value: 'Productividad +30% ',
      description: 'Gracias a la integración y automatización implementada por Novasys...',
    },
    {
      key: 'responseTime',
      icon: <span className="metric-icon" role="img" aria-label="reloj">⏱️</span>,
      value: 'Tiempos de Respuesta -40%',
      description: 'La centralización de la información y la automatización de flujos...',
    },
    {
      key: 'managedClients',
      icon: <span className="metric-icon" role="img" aria-label="clientes">👥</span>,
      value: 'Clientes +10K',
      description: 'La consolidación de datos en una única plataforma facilitó el seguimiento...',
    },
  ];




  const handleHover = (key) => {
  if (key !== selectedKpi) {
    setSelectedKpi(key);
    setAnimationKey(prev => prev + 1);
  }
};
  return (
    <div className="KPI">
      <div className="metrics-cards">
        {kpiCards.map((card) => (
          <div
            key={card.key}
            className={`metric-card visible ${selectedKpi === card.key ? 'active' : ''}`}
            onMouseEnter={() => handleHover(card.key)}
            onFocus={() => handleHover(card.key)}   // teclado
            // opcional: deja onClick como fallback para móviles sin hover
            onClick={() => handleHover(card.key)}
          >
            {card.icon}
            <h3>{card.value}</h3>
            <p>{card.description}</p>
          </div>

        ))}
      </div>

      <div key={animationKey} className={`chart-container ${selectedKpi ? 'expanded' : ''}`}>
        <Line data={dataSets[selectedKpi]} options={options} />
      </div>
    </div>
  );
};

export default KpiDashboard;
