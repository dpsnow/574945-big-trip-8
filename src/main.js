import {API} from './api.js';

import {updateGeneralInfo} from './utils/update-general-info.js';

import {showMsg} from './utils/utils.js';
import {renderFilters} from './utils/render-filters.js';
import {renderPoints} from './utils/render-points.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {AUTHORIZATION, END_POINT, MsgStatus} from './trip-points/trip-point-constants.js';

import {TripModel} from "./trip-model";

import {TripPointEntity} from './trip-point-entity.js';
import {PointEdit} from './trip-points/point-edit.js';

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-points`);

const boxMsg = document.querySelector(`.box-msg`);

const btnNewEvent = document.querySelector(`.trip-controls__new-event`);

let viewStatistics = false;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
// const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
// console.log(tripPointsEntities);
showMsg(MsgStatus.LOADING, boxMsg);
// tripPointsContainer.innerHTML = `<p style="text-align: center;">Loading route...</p>`;
renderFilters(filtersContainer);

api.getPoints()
.then((data) => {
  // console.log('getPoints', data);
  showMsg(``, boxMsg, false);
  const tripPointsEntities = new TripModel(data.map((it) => new TripPointEntity(it)));

  // console.log('tripPointsEntities', tripPointsEntities);
  // console.log('tripPointsEntities', tripPointsEntities);

  tripPointsEntities.sort(`day`);

  renderPoints(tripPointsEntities);

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
    // renderTripPoints(tripPointsEntities);

    // renderPoints(tripPointsContainer, tripPointsEntities);

    renderPoints(tripPointsEntities);
  });

  // фильтрация по времени
  filtersContainer.addEventListener(`change`, (evt) => {
    tripPointsEntities.filter(evt.target.value);

    if (viewStatistics) {
      updateStats(tripPointsEntities.data);
    } else {
      // renderTripPoints(tripPointsEntities);
      renderPoints(tripPointsEntities);
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
      // renderTripPoints(tripPointsEntities);
      renderPoints(tripPointsEntities, tripPointsContainer);
    }
  });

  // создание новой точки путешествия
  btnNewEvent.addEventListener(`click`, (evt) => {
    evt.target.disabled = true;

    const newPointEntity = new TripPointEntity(tripPointsEntities.dataForNewTripPoint);
    const editTripPointNew = new PointEdit(newPointEntity);

    // getNewPoint(newPointEntity);


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

          // renderTripPoints(tripPointsEntities);
          renderPoints(tripPointsEntities);
          updateGeneralInfo(tripPointsEntities.generalInfo);

          evt.target.disabled = false;
        });

    };

    editTripPointNew.onDelete = () => {
      // console.log(`onDelete [${i}]`, entitiesTripPoints.data[i]);
      evt.target.disabled = false;
    };

    // console.log(newPointEntity);
    // console.log(editTripPointNew);
    // editTripPointNew.render();

  });
})
.catch(() => {
  showMsg(MsgStatus.ERROR, boxMsg);
  // console.error(error);
});
