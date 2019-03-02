import {listFilter, listTripPoint} from './data.js';
import {getRandomInt, insertHtmlToElement, getNewListTripPoints} from './utils.js';

import {createFilter} from './templateFilter.js';
import {createTripPoint} from './templateTripPoint.js';

const COUNT_TRIP_POINT_FIRST = 4;
const MAX_TRIP_POINT = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const renderFilters = (container, parametrsFilters) => {
  const fragment = document.createDocumentFragment();
  const filters = parametrsFilters.map(createFilter);
  filters.forEach((element) => {
    insertHtmlToElement(element, fragment);
  });
  container.appendChild(fragment);
};

const renderTripPoint = (container, parametrsTripPoint) => {
  const fragment = document.createDocumentFragment();
  const tripPoints = parametrsTripPoint.map(createTripPoint);
  tripPoints.forEach((element) => {
    insertHtmlToElement(element, fragment);
  });
  container.appendChild(fragment);
};

const init = () => {
  const firstTripPoint = getNewListTripPoints(COUNT_TRIP_POINT_FIRST, listTripPoint);
  renderFilters(filtersContainer, listFilter);
  renderTripPoint(tripPointContainer, firstTripPoint);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newCounttripPoint = getRandomInt(1, MAX_TRIP_POINT);
      const randomTripPoint = getNewListTripPoints(newCounttripPoint, listTripPoint);
      renderTripPoint(tripPointContainer, randomTripPoint);
    }
  });
};

init();
