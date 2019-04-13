import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import moment from 'moment';

// const moneyCtx = document.querySelector(`.statistic__money`);
// const transportCtx = document.querySelector(`.statistic__transport`);
// const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
// const BAR_HEIGHT = 55;

export class HorizontalChart {
  constructor(container, title, data, prefix) {
    // console.log('HorizontalChart', data);
    this._container = container;
    this._chart = new Chart(container, {
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
            // formatter: (val) => `${prefix}${val}`
            formatter: (value) => {
              if (prefix === `time`) {
                // console.log(`${value}`);
                return `${parseInt(moment.duration(value).asHours(), 10)}H`;
              }
              return `${prefix}${value}`;
            }
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
            minBarLength: 60
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        },
      }
    });
  }

  get chart() {
    return this._chart;
  }

  update(newData) {
    // console.log('обновление данных для статы', newData);
    // console.log('this.chart', this.chart);
    // console.log(`BAR_HEIGHT=${BAR_HEIGHT} * newData.labels.length=${newData.labels.length} = ${BAR_HEIGHT * newData.labels.length}`);
    this.chart.data.labels = newData.labels;
    this.chart.data.datasets[0].data = newData.values;
    // this._container.height = BAR_HEIGHT * newData.labels.length;
    this.chart.update({
      duration: 800,
      easing: `easeOutQuart`
    });
  }

}

