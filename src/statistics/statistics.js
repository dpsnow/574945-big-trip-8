import {HorizontalChart} from './horizontal-chart.js';
import {typeTripPoint, TypeStats} from '../trip-constants.js';

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


const getDataForStats = (allData, value) => {
  // console.log(allData);
  const variableForConvert = {};

  allData.forEach((it) => {
    if (it.isVisible) {
      let currentValue;

      switch (value) {
        case TypeStats.DURATION:
          currentValue = it[value].asMilliseconds();
          break;

        case TypeStats.COUNT:
          currentValue = 1;
          break;

        default:
          currentValue = it[value];
          break;
      }
      variableForConvert[it.type] = (variableForConvert[it.type] || 0) + currentValue;
    }
  });

  return {
    labels: Object.keys(variableForConvert).map((el) => `${typeTripPoint[el].icon} ${el.toUpperCase()}`),
    values: Object.values(variableForConvert)
  };
};

const toggleVisibilityStatistics = (value) => {
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
  moneyStats.update(getDataForStats(allData, TypeStats.PRICE));
  transportStats.update(getDataForStats(allData, TypeStats.COUNT));
  timeSpendStats.update(getDataForStats(allData, TypeStats.DURATION));
};

export {toggleVisibilityStatistics, initStats, updateStats};
