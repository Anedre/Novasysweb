import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaClock, FaUsers, FaCogs } from 'react-icons/fa';
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

const RenzoKpiDashboard = () => {
  const [selectedKpi, setSelectedKpi] = useState('ticketEfficiency');
  const [animationKey, setAnimationKey] = useState(0);

  // Data sets actualizados para Renzo Costa
  const dataSets = {
    ticketEfficiency: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Eficiencia en Gestión de Tickets (%)',
          data: [10, 12, 15, 18, 20], // Crece hasta +20%
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
          label: 'Reducción de Tiempos de Respuesta (%)',
          data: [5, 10, 15, 25, 30], // Se incrementa la reducción hasta -30% (puedes ajustar la representación)
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    },
    marketingEffectiveness: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Efectividad en Campañas (%)',
          data: [10, 15, 18, 22, 25], // Crece hasta +25%
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    },
    integration: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Integración de Sistemas (%)',
          data: [50, 70, 85, 95, 100], // Llega a 100%
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255, 206, 86, 1)',
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
          text: 'Porcentaje (%)',
          color: '#666',
          font: { size: 14 },
        },
      },
    },
  };

  // KPI Cards para Renzo Costa
  const kpiCards = [
    {
      key: 'ticketEfficiency',
      icon: <FaChartLine className="metric-icon" />,
      value: 'Eficiencia Tickets +20%',
      description: 'Aumento del 20% en la eficiencia de gestión de tickets gracias a la centralización y automatización.',
    },
    {
      key: 'responseTime',
      icon: <FaClock className="metric-icon" />,
      value: 'Tiempos Respuesta -30%',
      description: 'Reducción del 30% en los tiempos de respuesta, mejorando la atención al cliente.',
    },
    {
      key: 'marketingEffectiveness',
      icon: <FaUsers className="metric-icon" />,
      value: 'Campañas +25%',
      description: 'Incremento del 25% en la efectividad de campañas de marketing con segmentación avanzada.',
    },
    {
      key: 'integration',
      icon: <FaCogs className="metric-icon" />,
      value: 'Integración 100%',
      description: 'Integración completa entre ERP, POS, eCommerce y Responsys, logrando una vista 360° de los clientes.',
    },
  ];

  const handleCardClick = (key) => {
    setSelectedKpi(key);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="KPIR">
      <div className="metrics-cardsR">
        {kpiCards.map((card) => (
          <div
            key={card.key}
            className={`metric-cardR visible ${selectedKpi === card.key ? 'active' : ''}`}
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

export default RenzoKpiDashboard;
