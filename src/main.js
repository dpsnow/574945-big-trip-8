import {API} from './api.js';
import {renderElements, formatDate} from './utils.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {renderFilters} from './filters/render-filters.js';

import {AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';
import {TripPointEntity} from './trip-points/trip-point-entity.js';
import {TripPoint} from './trip-points/trip-point.js';
import {TripPointEdit} from './trip-points/trip-point-edit.js';

import {TaskModel} from './task-model.js';

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-points`);
const oneDayTripPointsTemplate = tripPointsContainer.querySelector(`.trip-day`);

let viewStatistics = false;


const renderTripPoints = (entitiesTripPoints) => {
  console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);
  tripPointsContainer.innerHTML = ``;

  const tripPoitsElements = [];
  let count = 0;
  let currentDay;
  // let isEditMode;
  let oneDayTripPointContainer;

  entitiesTripPoints.data.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

    if (pointEntity === null || pointEntity.destination === undefined) {
      return;
    }

    if (currentDay !== pointEntity.day) {
      oneDayTripPointContainer = oneDayTripPointsTemplate.cloneNode(true);
      currentDay = pointEntity.day;
      oneDayTripPointContainer.querySelector(`.trip-day__title`).textContent = formatDate(currentDay, `DD MMM`);

      ++count;
      oneDayTripPointContainer.querySelector(`.trip-day__number`).textContent = count;


    }

    if (pointEntity.isVisible) {

      const tripPoint = new TripPoint(pointEntity);
      const editTripPoint = new TripPointEdit(pointEntity);

      tripPoint.onEdit = () => {
        // if (isEditMode) {
        //   editTripPoint.onCancelEditMode();
        // }
        editTripPoint.update(pointEntity);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        tripPoint.unrender();

        // isEditMode = true;

      };

      tripPoint.onAddOffer = () => {
        // tripPoint.update(entitiesTripPoints[i]);
        // console.log(`updateDate [${i}]`);

        return entitiesTripPoints.update(tripPoint.toRaw)
            .then((updatedData) => {
              // console.log(' tripPoint.onAddOffer', updatedData);
              entitiesTripPoints.data[i].update(updatedData);
              tripPoint.update(entitiesTripPoints.data[i]);
              updateGeneralInfo(entitiesTripPoints.generalInfo, `totalPrice`);
            });
      };

      editTripPoint.onSubmit = (newData) => {
        // console.log(`updateDate [${i}]`, updateDate);
        return entitiesTripPoints.update(newData)
            .then((updatedData) => {
              entitiesTripPoints.data[i].update(updatedData);

              tripPoint.update(entitiesTripPoints.data[i]);
              tripPoint.render();
              oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
              editTripPoint.unrender();
              updateGeneralInfo(entitiesTripPoints.generalInfo, `all`);
            });
      };

      editTripPoint.onDelete = () => {
        // console.log(`onDelete [${i}]`, entitiesTripPoints.data[i]);

        return entitiesTripPoints.delete(entitiesTripPoints.data[i].id)
            .then(() => {
              // console.log(' entitiesTripPoints.update', updatedData);
              delete entitiesTripPoints.data[i];
              // editTripPoint.unrender();
              updateGeneralInfo(entitiesTripPoints.generalInfo);
            });
      };

      editTripPoint.onCancelEditMode = () => {
        tripPoint.render();
        oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
        editTripPoint.unrender();

        // isEditMode = false;

      };

      tripPoitsElements.push(oneDayTripPointContainer);
      const oneDayItems = oneDayTripPointContainer.querySelector(`.trip-day__items`);
      oneDayItems.appendChild(tripPoint.render());

      // tripPoitsElements.push(tripPoint.render());
    }

  });

  renderElements(tripPointsContainer, tripPoitsElements);
};


const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const init = () => {
  // const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  // const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
  // console.log(tripPointsEntities);
  tripPointsContainer.innerHTML = `<p style="text-align: center;">Loading route...</p>`;

  api.getPoints()
  .then((data) => {
    // console.log('getPoints', data);
    const tripPointsEntities = data.map((it) => new TripPointEntity(it));
    const tripPointsEntities0 = new TaskModel(data.map((it) => new TripPointEntity(it)));

    // console.log('tripPointsEntities', tripPointsEntities);
    console.log('tripPointsEntities0', tripPointsEntities0);

    // tripPointsContainer.innerHTML = ``;
    // renderTripPoints(tripPointsEntities);
    renderTripPoints(tripPointsEntities0);

    updateGeneralInfo(tripPointsEntities0.generalInfo);

    // renderFilters(filtersData);
    renderFilters(filtersContainer);

    initStats();

    // сортировка
    document.querySelector(`.trip-sorting`).addEventListener(`change`, (evt) => {
      // console.log('Сортировка по ', evt.target.value);
      // tripPointsContainer.innerHTML = ``;
      tripPointsEntities0.sort(evt.target.value);
      renderTripPoints(tripPointsEntities0);
    });

    // фильтрация по времени
    filtersContainer.addEventListener(`change`, (evt) => {
      // tripPointsContainer.innerHTML = ``;

      tripPointsEntities0.filter(evt.target.value);
      // filterTripPoint(tripPointsEntities, evt.target.value);

      if (viewStatistics) {
        updateStats(tripPointsEntities0.data);
      } else {
        // renderTripPoints(tripPointsEntities);
        renderTripPoints(tripPointsEntities0);
      }
    });

    // показ статистики
    linkViewStatistics.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      viewStatistics = toggleVisibilityStatistics(true);
      updateStats(tripPointsEntities);
    });

    // показ точек путешествия
    linkViewTable.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      viewStatistics = toggleVisibilityStatistics(false);
      renderTripPoints(tripPointsEntities0);
    });

    // создание новой точки путешествия
    document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, () => {

      const newPointEntity = new TripPointEntity(tripPointsEntities0.dataForNewTripPoint);
      const editTripPointNew = new TripPointEdit(newPointEntity);

      editTripPointNew.onSubmit = (newData) => {
        // console.log(newData);
        return tripPointsEntities0.add(newData)
        .then(() => {
          editTripPointNew.unrender();
        });

      };

      // console.log(newPointEntity);
      // console.log(editTripPointNew);
      // editTripPointNew.render();

      tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));
    });
  })
  .catch(() => {
    tripPointsContainer.innerHTML = `<p style="text-align: center;">Something went wrong while loading your route info. Check your connection or try again later</p>`;
    // console.log(response);
  });

};


init();

