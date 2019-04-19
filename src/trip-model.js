import {API} from './api.js';
import {AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';
import moment from 'moment';

// import {formatDate} from './utils.js';

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

class TripModel {
  constructor(data) {
    this._data = data;
    this._currentFilter = `Everything`;
    this._currentSort = `day`;
  }

  get data() {
    this.filter(this._currentFilter);
    this.sort(this._currentSort);
    return this._data;
  }

  // getById(id) {
  //   return api.getPoint(id);
  // }

  add(task) {
    return api.createTask(task);
  }

  get dataForNewTripPoint() {
    // console.log('generalInfo', this.generalInfo);
    return {
      [`date_from`]: this.generalInfo.finishDate,
      isNewTripPoint: true,
      id: +this.generalInfo.lastId + 1,
      [`date_to`]: ``,
      [`base_price`]: parseInt(this.generalInfo.totalPrice / this._data.length, 10),
    };
  }

  update(newData) {
    return api.updateTask(newData);
  }

  delete(id) {
    return api.deleteTask(id);
  }

  filter(value) {
    // this._data = this._data.map((it) => Boolean(it));
    this._currentFilter = value;

    switch (value) {
      case `Future`:
        return this._data.forEach((point) => {
          if (point === null) {
            return;
          }

          point.isVisible = Boolean(point.timeStart > Date.now());
          // point.isVisible = point.price >= 1000;
        });

      case `Past`:
        return this._data.forEach((point) => {
          if (point === null) {
            return;
          }

          point.isVisible = Boolean(point.timeEnd < Date.now());
          // point.isVisible = point.price < 1000;
        });

      default:
        return this._data.forEach((point) => {
          if (point === null) {
            return;
          }

          point.isVisible = true;
        });
    }
  }

  sort(value) {
    this._currentSort = value;

    switch (value) {
      case `event`:
        return this._data.sort((a, b) => (a.type < b.type) ? -1 : 1);

      case `time`:
        return this._data.sort((a, b) => b.duration.valueOf() - a.duration.valueOf());

      case `price`:
        return this._data.sort((a, b) => b.totalPrice - a.totalPrice);

      default:
        return this._data.sort((a, b) => a.timeStart - b.timeStart);
    }
  }

  get generalInfo() {
    const correctData = this._data.filter((it) => Boolean(it));
    correctData.sort((a, b) => a.timeStart - b.timeStart);

    return {
      cites: new Set(correctData.map((tripPoint) => tripPoint.destination.name)),
      totalPrice: correctData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalPrice;
      }, 0),
      finishDate: correctData[correctData.length - 1].timeEnd,
      // startDate: correctData[0].timeStart,
      startDate: moment(correctData[0].timeStart).startOf(`date`).valueOf(),
      lastId: correctData[correctData.length - 1].id
    };
  }
}

export {TripModel};
