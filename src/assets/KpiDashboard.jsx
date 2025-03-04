import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaClock, FaUsers } from 'react-icons/fa';
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
      icon: <FaChartLine className="metric-icon" />,
      value: 'Productividad +30% ',
      description: 'Gracias a la integración y automatización implementada por Novasys, se optimizaron procesos internos y se redujeron tareas manuales, logrando un aumento del 30% en la eficiencia operativa.',
    },
    {
      key: 'responseTime',
      icon: <FaClock className="metric-icon" />,
      value: 'Tiempos de Respuesta -40%',
      description: 'La centralización de la información y la automatización de flujos permitieron responder de forma ágil a los clientes, reduciendo los tiempos de respuesta en un 40%.',
    },
    {
      key: 'managedClients',
      icon: <FaUsers className="metric-icon" />,
      value: 'Clientes  +10K',
      description: 'La consolidación de datos en una única plataforma facilitó el seguimiento y la fidelización, permitiendo gestionar de manera efectiva a más de 10,000 clientes.',
    },
  ];

  const handleCardClick = (key) => {
    setSelectedKpi(key);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="KPI">
      <div className="metrics-cards">
        {kpiCards.map((card) => (
          <div
            key={card.key}
            className={`metric-card visible ${selectedKpi === card.key ? 'active' : ''}`}
            onClick={() => handleCardClick(card.key)}
            style={{ cursor: 'pointer' }}
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
