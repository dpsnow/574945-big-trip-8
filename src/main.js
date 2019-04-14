import {filtersData} from './data.js';
import {Filter} from './filters/filter.js';

import {API} from './api.js';
import {renderElements, formatDate} from './utils.js';
import {updateGeneralInfo} from './utils/update-general-info.js';

import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/statistics.js';

import {AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';
import {TripPointEntity} from './trip-points/trip-point-entity.js';
import {TripPoint} from './trip-points/trip-point.js';
import {TripPointEdit} from './trip-points/trip-point-edit.js';

const linkViewStatistics = document.querySelector(`.view-switch a[href*=stats]`);
const linkViewTable = document.querySelector(`.view-switch a[href*=table]`);

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-points`);
const oneDayTripPointsTemplate = tripPointsContainer.querySelector(`.trip-day`);

let viewStatistics = false;

const filterTripPoint = (tripPoints, filterValue) => {
  // фильтрация по времени заменена на фильтрацию по цене для удобства
  switch (filterValue) {
    case `Future`:
      return tripPoints.forEach((point) => {
        // point.isVisible = Boolean(point.timeStart > Date.now());
        if (point === null) {
          return;
        }

        point.isVisible = point.price >= 1000;
      });

    case `Past`:
      return tripPoints.forEach((point) => {
        // point.isVisible = Boolean(point.timeEnd < Date.now());
        if (point === null) {
          return;
        }

        point.isVisible = point.price < 1000;
      });

    default:
      return tripPoints.forEach((point) => {
        if (point === null) {
          return;
        }
        point.isVisible = true;
      });
  }
};


const renderFilters = (dataFilters) => {
  const filterElements = [];

  dataFilters.forEach((data) => {
    const filter = new Filter(data);
    filter.render();
    filterElements.push(filter.element);
    filter.onFilter = () => {
      // console.log(`onFilter`, evt);
      // не понятно что должна выполнять функция, обработчик фильтра на строке 108
    };
  });

  // console.log(filterElements);
  renderElements(filtersContainer, filterElements);
};


const renderTripPoints = (entitiesTripPoints) => {
  // console.log(`fn renderTripPoints (tripPointsData = `, entitiesTripPoints);

  const tripPoitsElements = [];
  let count = 0;
  let currentDay;
  // let isEditMode;
  let oneDayTripPointContainer;

  entitiesTripPoints.forEach((pointEntity, i) => {
    // console.log('pointEntity', pointEntity);
    // console.log(formatDate(pointEntity.day, `DD MMM`));

    if (pointEntity === null) {
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
        editTripPoint.update(entitiesTripPoints[i]);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        tripPoint.unrender();

        // isEditMode = true;

      };

      tripPoint.onAddOffer = () => {
        tripPoint.update(entitiesTripPoints[i]);
        // console.log(`updateDate [${i}]`);
        tripPoint.element.classList.remove(`shake`);

        // data преобразованная для сервера
        api.updateTask(tripPoint.toRaw)
        .then((task) => {
          entitiesTripPoints[i].update(task);
          tripPoint.update(entitiesTripPoints[i]);
          // console.log(`after update tripPointsData`, entitiesTripPoints);
        })
        .then(updateGeneralInfo(entitiesTripPoints, `totalPrice`))
        .catch(() => {
          // console.log('Нужно потрясти карточку и не закрывать');
          tripPoint.element.classList.add(`shake`);
        });
      };

      editTripPoint.onSubmit = (updateDate) => {
        // console.log(`updateDate [${i}]`, updateDate);
        editTripPoint.element.classList.remove(`shake`);

        api.updateTask(updateDate)
        .then((task) => {
          // console.log('api.updateTask', task);
          entitiesTripPoints[i].update(task);
          tripPoint.update(entitiesTripPoints[i]);
          tripPoint.render();
          oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
          editTripPoint.unrender();
          // console.log(`after update tripPointsData`, entitiesTripPoints);
          // isEditMode = false;
        })
        .then(updateGeneralInfo(entitiesTripPoints, `all`))
        .catch(() => {
          // console.error(`Ошибка при обновлении`);

          editTripPoint.element.classList.add(`shake`);
          editTripPoint.element.querySelector(`button[type=submit]`).textContent = `Save`;
          editTripPoint.element.querySelector(`button[type=submit]`).disabled = false;
          editTripPoint.element.querySelector(`button[type=reset]`).disabled = false;
        });

      };

      editTripPoint.onDelete = () => {
        // console.log(`onDelete [${i}]`, entitiesTripPoints[i]);
        editTripPoint.element.classList.remove(`shake`);
        api.deleteTask(entitiesTripPoints[i].id)
        .then(() => {
          entitiesTripPoints[i] = null;
          editTripPoint.unrender();
          // обновить шапку проекта
          updateGeneralInfo(entitiesTripPoints);
          // isEditMode = false;
          // console.log(`after delete tripPointsData`, entitiesTripPoints);
        })
        .catch(() => {
          editTripPoint.element.classList.add(`shake`);
          editTripPoint.element.querySelector(`button[type=reset]`).textContent = `Delete`;
          editTripPoint.element.querySelector(`button[type=submit]`).disabled = false;
          editTripPoint.element.querySelector(`button[type=reset]`).disabled = false;
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


// не факт что нужгл
// const sortByDay = (array) => {
//   array.sort((a, b) => {
//     console.log(a.timeStart, b.timeStart);
//     return a.timeStart - b.timeStart;
//   });
// };

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
    // console.log('tripPointsEntities', tripPointsEntities);


    tripPointsContainer.innerHTML = ``;
    renderTripPoints(tripPointsEntities);

    updateGeneralInfo(tripPointsEntities, `all`);

    renderFilters(filtersData);

    initStats();

    // сортировка
    document.querySelector(`.trip-sorting`).addEventListener(`change`, () => {
      // console.log('Сортировка по ', evt.target.value);
    });

    // фильтрация по времени
    filtersContainer.addEventListener(`change`, (evt) => {
      tripPointsContainer.innerHTML = ``;
      filterTripPoint(tripPointsEntities, evt.target.value);

      if (viewStatistics) {
        updateStats(tripPointsEntities);
      } else {
        renderTripPoints(tripPointsEntities);
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
      renderTripPoints(tripPointsEntities);
    });

    // создание новой точки путешествия
    document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, () => {

      const fakeDataForNewPoint = {
        _isVisible: true,
        isNewTripPoint: true,
        id: 9999,
        [`date_from`]: ``,
        [`date_to`]: ``,
        type: `taxi`,
        destination: {name: `Moscow`, description: ``, pictures: []},
        [`is_favorite`]: false,
        [`base_price`]: 0,
        offers: [],
      };

      const newPointEntity = new TripPointEntity(fakeDataForNewPoint);
      const editTripPointNew = new TripPointEdit(newPointEntity);
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

