import {filtersData, getTripPointsData} from './data.js';
import {getRandomInt, renderElements, createElement} from './utils.js';

import {createFilter} from './template/filter-template.js';
import {TripPointEntity} from './trip-points/trip-point-entity.js';
import {TripPoint} from './trip-points/trip-point.js';
import {TripPointEdit} from './trip-points/trip-point-edit.js';

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
  const tripPoitsElements = [];

  console.log(`tripPointsData`, tripPointsData);

  // вариант через Entity
  tripPointsData.forEach((pointEntity, i) => {

    // tripPointsData.forEach((dataOneTripPoint, i) => {
    // const pointEntity = new TripPointEntity(dataOneTripPoint);
    const tripPoint = new TripPoint(pointEntity);
    const editTripPoint = new TripPointEdit(pointEntity);

    tripPoint.onEdit = () => {
      editTripPoint.render();
      tripPointContainer.replaceChild(editTripPoint.element, tripPoint.element);
      tripPoint.unrender();
    };

    editTripPoint.onSubmit = (updateDate) => {
      console.log(`updateDate`, updateDate);
      tripPointsData[i] = updateDate;

      tripPoint.update(updateDate);
      tripPoint.render();
      tripPointContainer.replaceChild(tripPoint.element, editTripPoint.element);
      editTripPoint.unrender();
    };

    editTripPoint.onDelete = () => {
      console.log(`dataOneTripPoint`, pointEntity);
      tripPointsData[i] = null;
      editTripPoint.unrender();
    };

    tripPoitsElements.push(tripPoint.render());
  });

  renderElements(tripPointContainer, tripPoitsElements);
};


const init = () => {
  // let tripPointsData = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  renderFilters();

  // вариант через Entity
  let inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
  renderTripPoints(tripPointsEntities);

  // renderTripPoints(tripPointsData);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      console.log(tripPointsEntities);

      // tripPointsData = getTripPointsData(getRandomInt(1, MAX_TRIP_POINTS));
      // renderTripPoints(tripPointsData);
    }
  });
};

init();
