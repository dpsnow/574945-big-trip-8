import {HorizontalChart} from './horizontal-chart.js';
import {typeTripPoint} from '../trip-points/trip-point-constants.js';

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const tableContainer = document.getElementById(`table`);
const statsContainer = document.getElementById(`stats`);

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

let moneyStats;
let transportStats;
let timeSpendStats;


const getDataForStats = (allData, value = `count`) => {
  // console.log(allData);
  const variableForConvert = {};

  allData.forEach((it) => {
    if (it.isVisible) {
      if (value === `duration`) {
        variableForConvert[it.type] = (variableForConvert[it.type] || 0) + it[value].asMilliseconds();
      } else {
        variableForConvert[it.type] = (variableForConvert[it.type] || 0) + (value === `count` ? 1 : it[value]);
      }
    }
  });


  return {
    labels: Object.keys(variableForConvert).map((el) => `${typeTripPoint[el].icon} ${el.toUpperCase()}`),
    values: Object.values(variableForConvert)
  };
};

const toggleVisibilityStatistics = (value) => {
  // viewStatistics = value;
  linkViewStatistics.classList.toggle(`view-switch__item--active`, value);
  statsContainer.classList.toggle(`visually-hidden`, !value);

  linkViewTable.classList.toggle(`view-switch__item--active`, !value);
  tableContainer.classList.toggle(`visually-hidden`, value);
  return value;
};

const initStats = () => {
  moneyStats = new HorizontalChart(moneyCtx, `MY MONEY`, [], `€ `);
  transportStats = new HorizontalChart(transportCtx, `TRANSPORT`, [], ``);
  timeSpendStats = new HorizontalChart(timeSpendCtx, `TIME SPEND`, [], `time`);
};

const updateStats = (allData) => {
  moneyStats.update(getDataForStats(allData, `price`));
  transportStats.update(getDataForStats(allData));
  timeSpendStats.update(getDataForStats(allData, `duration`));

  // moneyStats = new HorizontalChart(moneyCtx, `MY MONEY`, getDataForStats(allData, `price`), `€ `);
  // transportStats = new HorizontalChart(transportCtx, `TRANSPORT`, getDataForStats(allData), ``);
};

export {toggleVisibilityStatistics, initStats, updateStats};
