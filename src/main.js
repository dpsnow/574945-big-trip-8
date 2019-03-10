import {filters, getTripPoint} from './data.js';
import {getRandomInt, renderElements} from './utils.js';

import {createFilter} from './template-filter.js';
import {createTripPoint} from './template-trip-point.js';

const NUMBER_TRIP_POINTS_ON_PAGE = 7;
const MAX_TRIP_POINTS = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const init = () => {
  const firstTripPoint = new Array(NUMBER_TRIP_POINTS_ON_PAGE).fill(``).map(getTripPoint);
  renderElements(filtersContainer, filters, createFilter);
  renderElements(tripPointContainer, firstTripPoint, createTripPoint);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newQuantityTripPoint = getRandomInt(1, MAX_TRIP_POINTS);
      const randomTripPoints = new Array(newQuantityTripPoint).fill(``).map(getTripPoint);
      renderElements(tripPointContainer, randomTripPoints, createTripPoint);
    }
  });
};

init();
