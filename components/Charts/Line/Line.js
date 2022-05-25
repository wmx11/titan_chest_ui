import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, type, chartLabel }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: '#00FDD5',
        },
        ticks: {
          color: '#00FDD5',
        },
      },
      y: {
        grid: {
          borderColor: '#00FDD5',
        },
        ticks: {
          color: '#00FDD5',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        color: '#fff',
        display: true,
        text: chartLabel,
      },
    },
  };

  const labels = data && data.labels;

  const dataSet = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: data && data.data,
        borderColor: '#00FDD5',
        backgroundColor: '#00FDD5',
        tension: 0.8,
        pointRadius: 2,
      },
    ],
  };

  return <Line options={options} data={dataSet} />;
};

export default LineChart;
