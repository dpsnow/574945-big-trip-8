import {API} from './api.js';

import {showMsg} from './utils/utils.js';
import {renderFilters} from './utils/render-filters.js';
import {renderPoints} from './utils/render-points.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {AUTHORIZATION, END_POINT, MsgStatus, TypeSort} from './trip-constants.js';
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
showMsg(MsgStatus.LOADING, boxMsg);
renderFilters(filtersContainer);

api.getPoints()
.then((data) => {
  showMsg(``, boxMsg, false);
  const tripPointsEntities = new TripModel(data.map((it) => new PointEntity(it)));
  tripPointsEntities.sort(TypeSort.DAY);
  renderPoints(tripPointsEntities);
  updateGeneralInfo(tripPointsEntities.generalInfo);

  return tripPointsEntities;
})
.then((tripPointsEntities) => {
  initStats();
  document.querySelector(`.trip-sorting`).addEventListener(`change`, (evt) => {
    tripPointsEntities.sort(evt.target.value);
    renderPoints(tripPointsEntities);
  });

  filtersContainer.addEventListener(`change`, (evt) => {
    tripPointsEntities.filter(evt.target.value);

    if (viewStatistics) {
      updateStats(tripPointsEntities.data);
    } else {
      renderPoints(tripPointsEntities);
    }
  });

  linkViewStatistics.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (!viewStatistics) {
      viewStatistics = toggleVisibilityStatistics(true);
      updateStats(tripPointsEntities.data);
    }
  });

  linkViewTable.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (viewStatistics) {
      viewStatistics = toggleVisibilityStatistics(false);
      renderPoints(tripPointsEntities, tripPointsContainer);
    }
  });

  btnNewEvent.addEventListener(`click`, (evt) => {
    const newPointEntity = new PointEntity(tripPointsEntities.dataForNewTripPoint);
    const editTripPointNew = new PointEdit(newPointEntity);
    tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));
    evt.target.disabled = true;

    editTripPointNew.onSubmit = (newData) => {
      return tripPointsEntities.add(newData)
        .then((response) => {
          const newTripPointNewEntity = new PointEntity(response);
          tripPointsEntities.data.push(newTripPointNewEntity);
          renderPoints(tripPointsEntities);
          updateGeneralInfo(tripPointsEntities.generalInfo);
          evt.target.disabled = false;
        });

    };

    editTripPointNew.onDelete = () => {
      evt.target.disabled = false;
    };
  });
})
.catch(() => {
  showMsg(MsgStatus.ERROR, boxMsg);
});
