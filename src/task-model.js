import {API} from './api.js';
import {AUTHORIZATION, END_POINT} from './trip-points/trip-point-constants.js';

import {formatDate} from './utils.js';

class TaskModel {
  constructor(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  getById(id) {

  }

  add(id) {

  }

  remove(id) {

  }

  update(id) {

  }


  filter(value) {
    // this._data = this._data.map((it) => Boolean(it));

    switch (value) {
      case `Future`:
        return this._data.forEach((point) => {
          // point.isVisible = Boolean(point.timeStart > Date.now());
          if (point === null) {
            return;
          }

          point.isVisible = point.price >= 1000;
        });

      case `Past`:
        return this._data.forEach((point) => {
          // point.isVisible = Boolean(point.timeEnd < Date.now());
          if (point === null) {
            return;
          }

          point.isVisible = point.price < 1000;
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
    switch (value) {
      case `event`:
        return this._data.sort((a, b) => (a.type < b.type) ? -1 : 1);

      case `time`:
        return this._data.sort((a, b) => a.duration.valueOf() - b.duration.valueOf());

      case `price`:
        return this._data.sort((a, b) => a.totalPrice - b.totalPrice);

      default:
        return this._data.sort((a, b) => a.timeStart - b.timeStart);
    }
  }

  get generalInfo() {
    return {
      cites: new Set(this._data.map((tripPoint) => tripPoint.destination.name)),
      totalPrice: this._data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalPrice;
      }, 0),
      dates: `${formatDate(this._data[0].timeStart, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(this._data[this._data.length - 1].timeStart, `DD MMM`)}`
    };
  }
}

export {TaskModel};
