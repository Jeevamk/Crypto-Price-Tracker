import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  registerables
} from 'chart.js';
import 'chartjs-adapter-date-fns'; 
import API from '../../features/auth/api';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  ...registerables
);

const CoinGraph = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        
        const response = await API.get(`/api/prices/${symbol}`);
        const data = response.data;
        console.log(data);
        // Prepare data for the chart
        const labels = data.map(entry => new Date(entry.timestamp));
        const prices = data.map(entry => entry.price.usdt);

        console.log(prices);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Price (USDT)',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPriceData();

    
    const intervalId = setInterval(fetchPriceData, 60000);

    return () => clearInterval(intervalId);
  }, [symbol]);

  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)} USDT`,
              },
            },
          },
          scales: {
            x: {
              title: { display: `true`, text: 'Time' },
              type: 'time',  
              time: { unit: 'minute' },
              ticks: { maxRotation: 90, minRotation: 45 },
            },
            y: {
              title: { display: true, text: 'Price (USDT)' },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinGraph;