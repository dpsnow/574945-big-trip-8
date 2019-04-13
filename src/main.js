import {filtersData} from './data.js';
import {Filter} from './filters/filter.js';

import {API} from './api.js';
import {renderElements, formatDate} from './utils.js';

// import {HorizontalChart} from './statistics/statistics.js';
import {initStats, updateStats, toggleVisibilityStatistics} from './statistics/uuu.js';

import {typeTripPoint, AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';
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
  // let oneDayTripPointContainer = oneDayTripPointsTemplate.cloneNode(true);
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

      tripPoitsElements.push(oneDayTripPointContainer);

    }

    if (pointEntity.isVisible) {

      const tripPoint = new TripPoint(pointEntity);
      const editTripPoint = new TripPointEdit(pointEntity);

      tripPoint.onEdit = () => {
        editTripPoint.update(entitiesTripPoints[i]);
        editTripPoint.render();
        oneDayItems.replaceChild(editTripPoint.element, tripPoint.element);
        tripPoint.unrender();
      };

      editTripPoint.onSubmit = (updateDate) => {
        console.log(`updateDate [${i}]`, updateDate);
        editTripPoint.element.classList.remove(`shake`);

        // data преобразованная для сервера
        api.updateTask(updateDate)
        .then((task) => {
          console.log('api.updateTask', task);
          entitiesTripPoints[i].update(task);
          tripPoint.update(entitiesTripPoints[i]);
          tripPoint.render();
          oneDayItems.replaceChild(tripPoint.element, editTripPoint.element);
          editTripPoint.unrender();
          console.log(`after update tripPointsData`, entitiesTripPoints);
        })
        // .catch(() => {
        //   console.log('Нужно потрясти карточку и не закрывать');
        //   editTripPoint.element.classList.add(`shake`);
        // });

      };

      editTripPoint.onDelete = () => {
        // console.log(`pointEntity [${i}]`, pointEntity);
        api.deleteTask(entitiesTripPoints[i].id);

        entitiesTripPoints[i] = null;
        editTripPoint.unrender();

        console.log(`after delete tripPointsData`, entitiesTripPoints);
      };

      const oneDayItems = oneDayTripPointContainer.querySelector(`.trip-day__items`);
      oneDayItems.appendChild(tripPoint.render());

      // tripPoitsElements.push(tripPoint.render());
    }

  });

  renderElements(tripPointsContainer, tripPoitsElements);
};


// не факт что нужгл
const sortByDay = (array) => {
  array.sort((a, b) => {
    console.log(a.timeStart, b.timeStart);
    return a.timeStart - b.timeStart;
  });
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const init = () => {
  // const inputDataForTripPoints = getTripPointsData(NUMBER_TRIP_POINTS_ON_PAGE);
  // const tripPointsEntities = inputDataForTripPoints.map((data) => new TripPointEntity(data));
  // console.log(tripPointsEntities);

  api.getPoints()
  .then((data) => {
    console.log('getPoints', data);
    const tripPointsEntities = data.map((it) => new TripPointEntity(it));
    renderTripPoints(tripPointsEntities);

    renderFilters(filtersData);

    initStats();

    // сортировка
    document.querySelector(`.trip-sorting`).addEventListener(`change`, (evt) => {
      console.log('Сортировка по ', evt.target.value);
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

    // поках точек путешествия
    linkViewTable.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      viewStatistics = toggleVisibilityStatistics(false);
      renderTripPoints(tripPointsEntities);
    });

    // создание новой точки путешествия
    document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, () => {

      const fakeDataForNewPoint = {
        'base_price': 600,
        'date_from': 1554645705811,
        'date_to': 1554662584054,
        'destination': {
          name: "Helsinki",
          description: "Helsinki, a true asian pearl, with crowded streets…ment of a mighty river as a centre of ttraction.",
          pictures: []
        },
        'id': 1,
        'is_favorite': true,
        'offers': [],
        'type': "sightseeing"
      };
      fakeDataForNewPoint.isNewTripPoint = true;

      const newPointEntity = new TripPointEntity(fakeDataForNewPoint);
      const editTripPointNew = new TripPointEdit(newPointEntity);
      console.log(newPointEntity);
      console.log(editTripPointNew);
      // editTripPointNew.render();

      tripPointsContainer.insertBefore(editTripPointNew.render(), tripPointsContainer.querySelector(`.trip-day`));
    });
  });

};


init();

