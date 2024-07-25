
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
  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await API.get(`/api/prices/${symbol}`);
        const { coinGeckoInfo, recentPrices } = response.data;

        
        const labels = recentPrices.map(entry => new Date(entry.timestamp));
        console.log(labels);
        const prices = recentPrices.map(entry => entry.price.usdt);

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

        setCoinInfo(coinGeckoInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPriceData();

    
    const intervalId = setInterval(fetchPriceData, 60000);

    return () => clearInterval(intervalId);
  }, [symbol]);

  return (
    <div className="chart-container w-full">
      <div className="coin-info text-center mb-5">
        {coinInfo && (
          <div className="coin-details flex flex-col items-center mt-6 shadow-lg">
            <img src={coinInfo.image} alt={coinInfo.name} className="coin-image w-24 h-24 rounded-full mb-2" />
            <h2 className="coin-name text-2xl font-bold text-gray-400">{coinInfo.name}</h2>
            <p className="coin-symbol text-lg text-gray-500">{coinInfo.symbol}</p>
          </div>
        )}
      </div>
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
              title: { display: true, text: 'Time' },
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

