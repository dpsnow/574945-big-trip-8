import {filtersData, getTripPointsData} from './data.js';
import {getRandomInt, renderElements, createElement} from './utils.js';

import {createFilter} from './template/filter-template.js';
import {TripPointEntity} from './trip-point/trip-point-entity.js';
import {TripPoint} from './trip-point/trip-point.js';
import {TripPointEdit} from './trip-point/trip-point-edit.js';

const NUMBER_TRIP_POINTS_ON_PAGE = 7;
const MAX_TRIP_POINTS = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const renderFilters = () => {
  const filterHtml = filtersData.map(createFilter).join(``);
  const filterElements = createElement(filterHtml);
  renderElements(filtersContainer, filterElements);
};

const renderTripPoints = (tripPointsData) => {

  // const tripPointsData = new Array(qty).fill(``).map(() => new TripPointEntity(tripPointData()));

  const tripPoitsElements = tripPointsData.map((data)=> {
    const pointData = new TripPointEntity(data);
    const tripPoint = new TripPoint(pointData);
    const editTripPoint = new TripPointEdit(pointData);

    tripPoint.onEdit = () => {
      editTripPoint.render();
      tripPointContainer.replaceChild(editTripPoint.element, tripPoint.element);
      tripPoint.unrender();
    };

    editTripPoint.onSubmit = (updateDate) => {
      tripPoint.update(updateDate);
      tripPoint.render();
      tripPointContainer.replaceChild(tripPoint.element, editTripPoint.element);
      editTripPoint.unrender();
    };

    return tripPoint.render();
  });

  renderElements(tripPointContainer, tripPoitsElements);
};


const init = () => {
  let tripPointsData = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  // console.log(`данные`, tripPointsData);

  renderFilters();
  renderTripPoints(tripPointsData);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      tripPointsData = getTripPointsData(getRandomInt(1, MAX_TRIP_POINTS));
      renderTripPoints(tripPointsData);
    }
  });
};

init();
