import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ gradient, bg, labels, datasetLabel, data }) => {
  let Chart = {
    data: canvas => {
      let ctx = canvas.getContext('2d');
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(0, gradient);

      return {
        labels: [...labels],
        datasets: [
          {
            label: datasetLabel,
            fill: true,
            backgroundColor: bg,
            hoverBackgroundColor: gradientStroke,
            borderColor: gradient,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [...data],
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              padding: 2,
              fontColor: '#9e9e9e',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 1,
              fontColor: '#9e9e9e',
            },
          },
        ],
      },
    },
  };

  return <Bar data={Chart.data} options={Chart.options} />;
};

export default BarChart;
