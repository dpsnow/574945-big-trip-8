import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// const moneyCtx = document.querySelector(`.statistic__money`);
// const transportCtx = document.querySelector(`.statistic__transport`);
// const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться

const BAR_HEIGHT = 55;
// moneyCtx.height = BAR_HEIGHT * 6;
// transportCtx.height = BAR_HEIGHT * 4;
// timeSpendCtx.height = BAR_HEIGHT * 4;

export const horizontalChart = (container, title, data) => {
  container.height = BAR_HEIGHT * data.labels.length;

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      // labels: [`✈️ FLY`, `🏨 STAY`, `🚗 DRIVE`, `🏛️ LOOK`, `🏨 EAT`, `🚕 RIDE`],
      labels: data.labels,
      datasets: [{
        // data: [400, 300, 200, 160, 150, 100],
        data: data.values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: title || ``,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};
