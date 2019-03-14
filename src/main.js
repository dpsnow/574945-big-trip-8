import {filtersData, tripPointData} from './data.js';
import {getRandomInt, renderElements, createElement} from './utils.js';

import {createFilter} from './template-filter.js';
// import {createTripPoint} from './template-trip-point.js';
import {TripPoint} from './trip-point.js';
import {TripPointEdit} from './trip-point-edit.js';

const NUMBER_TRIP_POINTS_ON_PAGE = 7;
const MAX_TRIP_POINTS = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const renderFilters = () => {
  const filterHtml = filtersData.map(createFilter).join(``);
  const filterElements = createElement(filterHtml);
  renderElements(filtersContainer, filterElements);
};

const renderTripPoints = (qty) => {
  const tripPointsData = new Array(qty).fill(``).map(tripPointData);
  const tripPoitsElements = tripPointsData.map((pointData) => {
    const tripPoint = new TripPoint(pointData);
    const editTripPoint = new TripPointEdit(pointData);

    tripPoint.onEdit = () => {
      editTripPoint.render();
      tripPointContainer.replaceChild(editTripPoint.element, tripPoint.element);
      tripPoint.unrender();
    };

    editTripPoint.onSubmit = () => {
      tripPoint.render();
      tripPointContainer.replaceChild(tripPoint.element, editTripPoint.element);
      editTripPoint.unrender();
    };

    return tripPoint.render();
  });
  renderElements(tripPointContainer, tripPoitsElements);
};


const init = () => {
  renderFilters();
  renderTripPoints(NUMBER_TRIP_POINTS_ON_PAGE);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newQuantityTripPoint = getRandomInt(1, MAX_TRIP_POINTS);
      renderTripPoints(newQuantityTripPoint);
    }
  });
};

init();
