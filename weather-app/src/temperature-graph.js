import Chart from 'chart.js';
import { format } from 'date-fns';

function createTemperatureGraph(data, numHours) {
  function createTimeLabels() {
    const timeLabels = [];
    for (let hoursPassed = 0; hoursPassed <= numHours; hoursPassed += 1) {
      const date = new Date();
      date.setHours(date.getHours() + hoursPassed);
      timeLabels.push(format(date, 'haaa'));
    }

    return timeLabels;
  }

  function createTemperatureData() {
    return data.hourly.map((hourlyData) => parseFloat(hourlyData.temp, 10)).splice(0, numHours + 1);
  }

  Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 0.6)';
  const $graph = document.createElement('canvas');
  const ctx = $graph.getContext('2d');
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: createTimeLabels(),
      datasets: [{
        label: 'Temperature',
        data: createTemperatureData(),
        borderColor: Array(numHours + 1).fill('rgba(179, 228, 243, 0.9)'),
        backgroundColor: 'rgba(179, 228, 243, 0.1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            display: true,
            color: 'rgba(255, 255, 255, 0.05)',
            zeroLineColor: 'transparent',
          },
          scaleLabel: {
            display: true,
            labelString: '°C',
          },
          ticks: {
            beginAtZero: true,
          },
        }],
        xAxes: [{
          gridLines: {
            drawBorder: false,
            display: true,
            color: 'rgba(255, 255, 255, 0.05)',
            zeroLineColor: 'transparent',
          },
        }],
      },
    },
  });

  $graph.classList.add('graph');
  return $graph;
}

export default createTemperatureGraph;
