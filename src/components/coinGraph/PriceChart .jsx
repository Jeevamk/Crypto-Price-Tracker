import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

// Register all necessary components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const PriceChart = () => {
  // Dummy data
  const dummyData = [
    { time: '2024-07-24T00:00:00Z', price: 100 },
    { time: '2024-07-24T00:01:00Z', price: 105 },
    { time: '2024-07-24T00:02:00Z', price: 103 },
    { time: '2024-07-24T00:03:00Z', price: 108 },
    { time: '2024-07-24T00:04:00Z', price: 107 },
    { time: '2024-07-24T00:05:00Z', price: 110 },
  ];

  const chartData = {
    labels: dummyData.map(entry => entry.time),
    datasets: [
      {
        label: 'Price',
        data: dummyData.map(entry => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Price: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        title: {
          display: true,
          text: 'Time',
          color: '#ccc', 
        },
        ticks: {
          color: '#ccc',
        },
        
      },
      y: {
        title: {
          display: true,
          text: 'Price (USDT)',
          color: '#ccc', 
        },
        ticks: {
          color: '#ccc', // Gray color for Y-axis labels
        },
        
      },
    },
    layout: {
      padding: 10,
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;
