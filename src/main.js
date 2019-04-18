import {API} from './api.js';
import {renderElements, formatDate} from './utils.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import moment from 'moment';

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

const btnNewEvent = document.querySelector(`.trip-controls__new-event`);

let viewStatistics = false;
let edtingMode = null;

let daysTrip = [];


const renderTripPoints = (entitiesTripPoints) => {
  tripPointsContainer.innerHTML = ``;
  daysTrip = [];

  // entitiesTripPoints.sort(stateSort);

  console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);

  let dayTrip;

  let allDaysTrip = [];
  let oneDayTripPoint;


  entitiesTripPoints.data.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

    if (pointEntity === null || pointEntity.destination === undefined) {
      return;
    }

    let currentDay = pointEntity.getDay(entitiesTripPoints.generalInfo.startDate);
    let currentDate = pointEntity.date;
    let oneDayItems;

    console.log('currentDay', currentDay);
    console.log('currentDate', currentDate);



    if (dayTrip !== currentDay) {
      oneDayTripPoint = new DayTrip(currentDay, formatDate(currentDate, `DD MMM`));
      // oneDayTripPoint = new DayTrip(currentDay, moment(currentDate).format('DD MMM'));
      oneDayTripPoint.render();
      dayTrip = currentDay;
    }

    console.log('oneDayTripPoint', oneDayTripPoint);

    if (pointEntity.isVisible) {

      const tripPoint = new TripPoint(pointEntity);
      const editTripPoint = new TripPointEdit(pointEntity);

      daysTrip.push(oneDayTripPoint.element);

      oneDayItems = oneDayTripPoint.containerForPoints;


      editTripPoint.onCancelEditMode = () => {
        tripPoint.render();
        oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
        editTripPoint.unrender();

        // isEditMode = false;

        edtingMode = null;

      };

      editTripPoint.onSubmit = (newData) => {
        // console.log(`updateDate [${i}]`, updateDate);
        return entitiesTripPoints.update(newData)
            .then((updatedData) => {
              entitiesTripPoints.data[i].update(updatedData);

              tripPoint.update(entitiesTripPoints.data[i]);

              // старый варинт без изменений контейнера дня
              // tripPoint.render();
              // oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
              // editTripPoint.unrender();

              // обновлять все точки вместо замены, из-за того что нужно обновлять контейнер дни путешествий
              renderTripPoints(entitiesTripPoints);

              updateGeneralInfo(entitiesTripPoints.generalInfo, `all`);
              edtingMode = null;
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

              // обновлять все
              renderTripPoints(entitiesTripPoints);
              edtingMode = null;
            });
      };

      tripPoint.onEdit = () => {
        // console.log(edtingMode);
        if (edtingMode !== null) {
          edtingMode.closeEditPoint();
        }

        editTripPoint.update(pointEntity);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        edtingMode = editTripPoint;
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


      oneDayItems.appendChild(tripPoint.render());
    }

  });

  // console.log('daysTrip', daysTrip);

  renderElements(tripPointsContainer, daysTrip);
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
      // stateSort = evt.target.value;
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
    btnNewEvent.addEventListener(`click`, () => {
      btnNewEvent.disabled = true;

      const newPointEntity = new TripPointEntity(tripPointsEntities.dataForNewTripPoint);
      const editTripPointNew = new TripPointEdit(newPointEntity);
      tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));

      editTripPointNew.onSubmit = (newData) => {
        // console.log(newData);
        return tripPointsEntities.add(newData)
          .then((response) => {
            console.log(response);
            const newTripPointNewEntity = new TripPointEntity(response);
            // const newTripPoint = new TripPoint(tripPointNewEntity);
            console.log(newTripPointNewEntity);
            console.log(tripPointsEntities);
            tripPointsEntities.data.push(newTripPointNewEntity);

            renderTripPoints(tripPointsEntities);
            updateGeneralInfo(tripPointsEntities.generalInfo);

            btnNewEvent.disabled = false;
          });

      };

      editTripPointNew.onDelete = () => {
        // console.log(`onDelete [${i}]`, entitiesTripPoints.data[i]);
        return btnNewEvent.disabled = false;
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
