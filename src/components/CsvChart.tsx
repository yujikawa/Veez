import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Dependencies count',
    },
  },
};

const labels = ['SQL 1', 'SQL 2'];

export const data = {
  labels,
  datasets: [
    {
      label: 'SQL count',
      data: [20, 30],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const style = {
  backgroundColor: "white",
  width: '100%',
  height: '100%',
}

export const CsvChart = () => {
  return  (
    <Bar style={style} options={options} data={data} />
  )
}