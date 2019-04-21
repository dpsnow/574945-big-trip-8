import {API} from './api.js';

import {showMsg} from './utils/utils.js';
import {renderFilters} from './utils/render-filters.js';
import {renderPoints} from './utils/render-points.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {AUTHORIZATION, END_POINT, MsgStatus} from './trip-constants.js';
import {PointEntity} from './trip-points/trip-point-entity.js';
import {PointEdit} from './trip-points/point-edit.js';
import {TripModel} from "./trip-model";


const boxMsg = document.querySelector(`.box-msg`);

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const btnNewEvent = document.querySelector(`.trip-controls__new-event`);
const tripPointsContainer = document.querySelector(`.trip-points`);


let viewStatistics = false;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// console.log(tripPointsEntities);
showMsg(MsgStatus.LOADING, boxMsg);
renderFilters(filtersContainer);

api.getPoints()
.then((data) => {
  // console.log('getPoints', data);
  showMsg(``, boxMsg, false);
  const tripPointsEntities = new TripModel(data.map((it) => new PointEntity(it)));

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
    renderPoints(tripPointsEntities);
  });

  // фильтрация по времени
  filtersContainer.addEventListener(`change`, (evt) => {
    tripPointsEntities.filter(evt.target.value);

    if (viewStatistics) {
      updateStats(tripPointsEntities.data);
    } else {
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
      renderPoints(tripPointsEntities, tripPointsContainer);
    }
  });

  // создание новой точки путешествия
  btnNewEvent.addEventListener(`click`, (evt) => {
    evt.target.disabled = true;

    const newPointEntity = new PointEntity(tripPointsEntities.dataForNewTripPoint);
    const editTripPointNew = new PointEdit(newPointEntity);

    tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));

    editTripPointNew.onSubmit = (newData) => {
      // console.log(newData);
      return tripPointsEntities.add(newData)
        .then((response) => {
          // console.log(response);
          const newTripPointNewEntity = new PointEntity(response);
          // const newTripPoint = new TripPoint(tripPointNewEntity);
          // console.log(newTripPointNewEntity);
          // console.log(tripPointsEntities);
          tripPointsEntities.data.push(newTripPointNewEntity);

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

  });
})
.catch(() => {
  showMsg(MsgStatus.ERROR, boxMsg);
  // console.error(error);
});
