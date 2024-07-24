// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const CoinGraph = ({ symbol }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchPriceHistory = async () => {
//       try {
//         const response = await fetch(`/api/coins/${symbol}/price-history`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching price history:', error);
//       }
//     };

//     fetchPriceHistory();

//     // Polling every minute to update the graph
//     const intervalId = setInterval(fetchPriceHistory, 60 * 1000);
//     return () => clearInterval(intervalId);
//   }, [symbol]);

//   const chartData = {
//     labels: data.map(price => new Date(price.timestamp).toLocaleTimeString()),
//     datasets: [
//       {
//         label: 'Price (USDT)',
//         data: data.map(price => price.usdt),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true
//       }
//     ]
//   };

//   return (
//     <div>
//       <h2>{symbol} Price History</h2>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default CoinGraph;


import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import 'chartjs-adapter-date-fns'; // Import the date adapter

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

const CoinGraph = ({ symbol }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(`/api/prices/${symbol}`);
        const data = await response.json();

        // Prepare data for the chart
        const labels = data.map(entry => new Date(entry.timestamp));
        const prices = data.map(entry => entry.price.usdt);

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

    // Refresh data every minute
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
              title: { display: true, text: 'Time' },
              type: 'time',  // Use 'time' type for X-axis
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

