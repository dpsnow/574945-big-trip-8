import {API} from './api.js';
import {renderElements, formatDate} from './utils.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {renderFilters} from './filters/render-filters.js';

import {AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';
import {TripPointEntity} from './trip-points/trip-point-entity.js';
import {TripPoint} from './trip-points/trip-point.js';
import {TripPointEdit} from './trip-points/trip-point-edit.js';

import {TripModel} from "./trip-model";
import {DayTrip} from "./day-trip/day-trip.js";

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-points`);

let viewStatistics = false;
let isSorted = false;
let daysTrip = new Map();


const renderTripPoints = (entitiesTripPoints) => {
  // daysTrip = new Map();
  daysTrip.clear();
  console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);
  tripPointsContainer.innerHTML = ``;

  let dayTrip;
  let oneDayTripPoint;

  let oneDayItems;

  entitiesTripPoints.data.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

    if (pointEntity === null || pointEntity.destination === undefined) {
      return;
    }

    let currentDay = pointEntity.getDay(entitiesTripPoints.generalInfo.startDate);
    let currentDate = pointEntity.date;

    let dayElement = daysTrip.get(currentDay);

    if (!dayElement) {
      oneDayTripPoint = new DayTrip(currentDay, formatDate(currentDate, `DD MMM`));
      oneDayTripPoint.render();
      oneDayItems = oneDayTripPoint.containerForPoints;

      dayTrip = currentDay;
    } else {
      oneDayItems = dayElement.querySelector('.trip-day__items');
    }

    // if (dayTrip !== currentDay) {
    //   oneDayTripPoint = new DayTrip(currentDay, formatDate(currentDate, `DD MMM`));
    //   oneDayTripPoint.render();

    //   dayTrip = currentDay;
    // }

    console.log('oneDayTripPoint', oneDayTripPoint);

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


      // daysTrip0.push(oneDayTripPoint.element);

      // console.log('daysTrip0', daysTrip0);
      console.log('oneDayItems', oneDayItems);

      // const oneDayItems = oneDayTripPoint.containerForPoints;
      oneDayItems.appendChild(tripPoint.render());
      // oneDayTripPoint.addPointElement(tripPoint.render());

      // daysTrip.push(tripPoint.render());
      console.log(oneDayTripPoint);
      daysTrip.set(dayTrip, oneDayTripPoint.element);
    }

  });

  console.log('daysTrip', daysTrip);

  renderElements(tripPointsContainer, daysTrip.values());
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
// const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
// console.log(tripPointsEntities);
tripPointsContainer.innerHTML = `<p style="text-align: center;">Loading route...</p>`;
renderFilters(filtersContainer);

api.getPoints()
  .then((data) => {
    // console.log('getPoints', data);
    const tripPointsEntities = new TripModel(data.map((it) => new TripPointEntity(it)));

    // console.log('tripPointsEntities', tripPointsEntities);
    console.log('tripPointsEntities', tripPointsEntities);

    tripPointsEntities.sort(`day`);

    renderTripPoints(tripPointsEntities);
    updateGeneralInfo(tripPointsEntities.generalInfo);

    return tripPointsEntities;
  })
  .then((tripPointsEntities) => {
    initStats();
    // сортировка
    document.querySelector(`.trip-sorting`).addEventListener(`change`, (evt) => {
      // console.log('Сортировка по ', evt.target.value);
      tripPointsEntities.sort(evt.target.value);
      renderTripPoints(tripPointsEntities);
    });

    // фильтрация по времени
    filtersContainer.addEventListener(`change`, (evt) => {
      tripPointsEntities.filter(evt.target.value);

      if (viewStatistics) {
        updateStats(tripPointsEntities.data);
      } else {
        renderTripPoints(tripPointsEntities);
      }
    });

    // показ статистики
    linkViewStatistics.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (!viewStatistics) {
        viewStatistics = toggleVisibilityStatistics(true);
        updateStats(tripPointsEntities.data);
      }
    });

    // показ точек путешествия
    linkViewTable.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (viewStatistics) {
        viewStatistics = toggleVisibilityStatistics(false);
        renderTripPoints(tripPointsEntities);
      }
    });

    // создание новой точки путешествия
    document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, () => {
      const newPointEntity = new TripPointEntity(tripPointsEntities.dataForNewTripPoint);
      const editTripPointNew = new TripPointEdit(newPointEntity);

      tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));

      editTripPointNew.onSubmit = (newData) => {
        // console.log(newData);
        return tripPointsEntities.add(newData)
          .then((response) => {
            console.log(response);

            const tripPointNewEntity = new TripPointEntity(response);
            const newTripPoint = new TripPoint(tripPointNewEntity);

            // проверить уже существующий контейнер день
            const dayNewTrip = tripPointNewEntity.getDay(tripPointsEntities.generalInfo.startDate);
            console.log('dayNewTrip', dayNewTrip);
            console.log('daysTrip', daysTrip);
            // console.log(daysTrip.get(dayNewTrip));

            let dayElement = daysTrip.get(dayNewTrip);

            if (!dayElement) {
              dayElement = new DayTrip(dayNewTrip, formatDate(tripPointNewEntity.date, `DD MMM`));
              dayElement.render();
              // dayElement = dayElement.containerForPoints;
              dayElement.containerForPoints.appendChild(newTripPoint.render());
              tripPointsContainer.appendChild(dayElement.element);
            } else {
              dayElement = dayElement.querySelector('.trip-day__items');
              dayElement.appendChild(newTripPoint.render());
            }

            console.log('tripPointsContainer', tripPointsContainer);
            console.log('dayElement', dayElement);

          })
          .then(() => {
            editTripPointNew.unrender();
          });

      };

      // console.log(newPointEntity);
      // console.log(editTripPointNew);
      // editTripPointNew.render();

    });
  })
  .catch((error) => {
    tripPointsContainer.innerHTML = `<p style="text-align: center;">Something went wrong while loading your route info. Check your connection or try again later</p>`;
    console.error(error);
  });
