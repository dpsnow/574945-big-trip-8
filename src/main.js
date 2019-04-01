import {filtersData, getTripPointsData} from './data.js';
import {renderElements} from './utils.js';

import {horizontalChart} from './statistics.js';

import {Filter} from './filters/filter.js';

import {typeTripPoint} from './trip-points/trip-point-constants.js';
import {TripPointEntity} from './trip-points/trip-point-entity.js';
import {TripPoint} from './trip-points/trip-point.js';
import {TripPointEdit} from './trip-points/trip-point-edit.js';

const NUMBER_TRIP_POINTS_ON_PAGE = 7;
// const MAX_TRIP_POINTS = 10;

const tableContainer = document.getElementById(`table`);
const statsContainer = document.getElementById(`stats`);

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);

let viewStatistics = false;
let moneyStats;
let transportStats;


const filterTripPoint = (tripPoints, filterValue) => {
  // фильтрация по времени заменена на фильтрацию по цене для удобства
  switch (filterValue) {
    case `Future`:
      return tripPoints.forEach((point) => {
        if (point !== null) {
          // point.isVisible = Boolean(point.timeStart > Date.now());
          point.isVisible = point.price > 200;
        }
      });

    case `Past`:
      return tripPoints.forEach((point) => {

        if (point !== null) {
          // point.isVisible = Boolean(point.timeEnd < Date.now());
          point.isVisible = point.price < 100;
        }

      });

    default:
      return tripPoints.forEach((point) => {

        if (point !== null) {
          point.isVisible = true;
        }

      });
  }
};


const renderFilters = (dataFilters) => {
  const filterElements = [];

  dataFilters.forEach((data) => {
    const filter = new Filter(data);
    filter.render();
    filterElements.push(filter.element);
    filter.onFilter = () => {
      // console.log(`onFilter`, evt);
      // не понятно что должна выполнять функция, обработчик фильтра на строке 108
    };
  });

  // console.log(filterElements);
  renderElements(filtersContainer, filterElements);
};


const renderTripPoints = (entitiesTripPoints) => {
  // console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);

  const tripPoitsElements = [];

  entitiesTripPoints.forEach((pointEntity, i) => {

    if (pointEntity !== null && pointEntity.isVisible) {

      const tripPoint = new TripPoint(pointEntity);
      const editTripPoint = new TripPointEdit(pointEntity);

      tripPoint.onEdit = () => {
        editTripPoint.render();
        tripPointContainer.replaceChild(editTripPoint.element, tripPoint.element);
        tripPoint.unrender();
      };

      editTripPoint.onSubmit = (updateDate) => {
        // console.log(`updateDate [${i}]`, updateDate);
        entitiesTripPoints[i] = updateDate;

        tripPoint.update(updateDate);
        tripPoint.render();
        tripPointContainer.replaceChild(tripPoint.element, editTripPoint.element);
        editTripPoint.unrender();
        // console.log(`after update tripPointsData`, entitiesTripPoints);
      };


      editTripPoint.onDelete = () => {
        // console.log(`pointEntity [${i}]`, pointEntity);
        entitiesTripPoints[i] = null;
        editTripPoint.unrender();
      };

      tripPoitsElements.push(tripPoint.render());
    }
  });

  renderElements(tripPointContainer, tripPoitsElements);
};


const toggleVisibilityStatistics = (value) => {
  viewStatistics = value;
  linkViewStatistics.classList.toggle(`view-switch__item--active`, value);
  statsContainer.classList.toggle(`visually-hidden`, !value);

  linkViewTable.classList.toggle(`view-switch__item--active`, !value);
  tableContainer.classList.toggle(`visually-hidden`, value);
};


const renderStats = (allData) => {
  if (moneyStats !== undefined) {
    moneyStats.destroy();
  }
  if (transportStats !== undefined) {
    transportStats.destroy();
  }

  moneyStats = horizontalChart(moneyCtx, `MY MONEY`, getDataForStats(allData, `price`), `€ `);
  transportStats = horizontalChart(transportCtx, `TRANSPORT`, getDataForStats(allData), ``);
};


const getDataForStats = (allData, value = `count`) => {
  const variableForConvert = {};

  allData.forEach((it) => {
    if (it !== null && it.isVisible) {

      variableForConvert[it.type] = (variableForConvert[it.type] || 0) + (value === `count` ? 1 : it[value]);
    }
  });

  return {
    labels: Object.keys(variableForConvert).map((el) => `${typeTripPoint[el].icon} ${el.toUpperCase()}`),
    values: Object.values(variableForConvert)
  };
};


const init = () => {
  const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
  // console.log(tripPointsEntities);

  renderFilters(filtersData);
  renderTripPoints(tripPointsEntities);

  filtersContainer.addEventListener(`change`, (evt) => {
    tripPointContainer.innerHTML = ``;
    filterTripPoint(tripPointsEntities, evt.target.value);
    renderTripPoints(tripPointsEntities);

    if (viewStatistics) {
      renderStats(tripPointsEntities);
    }
  });

  linkViewStatistics.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    toggleVisibilityStatistics(true);

    renderStats(tripPointsEntities);
  });

  linkViewTable.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    toggleVisibilityStatistics(false);
  });

};

init();
