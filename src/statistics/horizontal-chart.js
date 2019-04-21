import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import moment from 'moment';

class HorizontalChart {
  constructor(container, title, data, prefix) {
    // console.log('HorizontalChart', data);
    this._container = container;
    this._chart = new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: data.labels,
        datasets: [{
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
            formatter: (value) => {
              if (prefix === `time`) {
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
    this.chart.update({
      duration: 800,
      easing: `easeOutQuart`
    });
  }

}

export {HorizontalChart};
