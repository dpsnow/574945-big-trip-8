import {API} from './api.js';
import {renderElements, formatDate} from './utils/utils.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {renderFilters} from './utils/render-filters.js';
import {showMsg, cleanNode} from './utils/view-utils.js';

import {DayTrip} from "./day-trip/day-trip.js";

import {AUTHORIZATION, END_POINT, TypeInfo, MsgStatus} from './trip-points/trip-point-constants.js';
import {TripPointEntity} from './trip-point-entity.js';
import {Point} from './trip-points/point.js';
import {PointEdit} from './trip-points/point-edit.js';

import {TripModel} from "./trip-model";

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-points`);
// const boxMsg = document.querySelector(`.box-msg`);

const btnNewEvent = document.querySelector(`.trip-controls__new-event`);

let viewStatistics = false;
let edtingMode = null;

let allDaysTrip = [];

const renderTripPoints = (entitiesTripPoints) => {
  let oneDayTrip;
  allDaysTrip = [];

  cleanNode(tripPointsContainer);
  // tripPointsContainer.innerHTML = ``;
  let dayTrip;

  // entitiesTripPoints.sort(stateSort);

  // console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);

  entitiesTripPoints.data.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

    if (pointEntity === null || pointEntity.destination === undefined) {
      return;
    }

    let currentDay = pointEntity.getDay(entitiesTripPoints.generalInfo.startDate);
    let currentDate = pointEntity.date;
    let oneDayItems;

    if (dayTrip !== currentDay) {
      oneDayTrip = new DayTrip(currentDay, formatDate(currentDate, `DD MMM`));
      // oneDayTripPoint = new DayTrip(currentDay, moment(currentDate).format('DD MMM'));
      oneDayTrip.render();
      dayTrip = currentDay;
    }

    // console.log('oneDayTripPoint', oneDayTripPoint);

    if (pointEntity.isVisible) {

      const tripPoint = new Point(pointEntity);
      const editTripPoint = new PointEdit(pointEntity);

      allDaysTrip.push(oneDayTrip.element);

      oneDayItems = oneDayTrip.containerForPoints;


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
              // console.log('entitiesTripPoints', entitiesTripPoints);
              renderTripPoints(entitiesTripPoints);

              updateGeneralInfo(entitiesTripPoints.generalInfo);
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
          edtingMode.close();
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
              updateGeneralInfo(entitiesTripPoints.generalInfo, TypeInfo.TOTAL_PRICE);
            });
      };


      oneDayItems.appendChild(tripPoint.render());
    }

  });

  // console.log('daysTrip', daysTrip);

  renderElements(tripPointsContainer, allDaysTrip);
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
// const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
// console.log(tripPointsEntities);
showMsg(MsgStatus.LOADING);
// tripPointsContainer.innerHTML = `<p style="text-align: center;">Loading route...</p>`;
renderFilters(filtersContainer);

api.getPoints()
  .then((data) => {
    // console.log('getPoints', data);
    showMsg(``, false);
    const tripPointsEntities = new TripModel(data.map((it) => new TripPointEntity(it)));

    // console.log('tripPointsEntities', tripPointsEntities);
    // console.log('tripPointsEntities', tripPointsEntities);

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
      const editTripPointNew = new PointEdit(newPointEntity);
      tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));

      editTripPointNew.onSubmit = (newData) => {
        // console.log(newData);
        return tripPointsEntities.add(newData)
          .then((response) => {
            // console.log(response);
            const newTripPointNewEntity = new TripPointEntity(response);
            // const newTripPoint = new TripPoint(tripPointNewEntity);
            // console.log(newTripPointNewEntity);
            // console.log(tripPointsEntities);
            tripPointsEntities.data.push(newTripPointNewEntity);

            renderTripPoints(tripPointsEntities);
            updateGeneralInfo(tripPointsEntities.generalInfo);

            btnNewEvent.disabled = false;
          });

      };

      editTripPointNew.onDelete = () => {
        // console.log(`onDelete [${i}]`, entitiesTripPoints.data[i]);
        btnNewEvent.disabled = false;
      };

      // console.log(newPointEntity);
      // console.log(editTripPointNew);
      // editTripPointNew.render();

    });
  })
  .catch(() => {
    showMsg(MsgStatus.ERROR);
    // console.error(error);
  });
