import moment from 'moment';
import {formatDate, updateTime} from '../utils.js';
import {typeTripPoint} from './trip-point-constants.js';

class TripPointEntity {
  constructor(data) {
    // console.log(`in TripPointEntity`, data);
    this.day = data.day || Number(formatDate([], `x`), 10);
    this.timeStart = Number(data.timeStart) || undefined;
    this.timeEnd = Number(data.timeEnd) || undefined;
    this.type = data.type || data[`travel-way`] || ``;
    this.destination = data.destination || ``;
    this.isFavorite = Boolean(data.favorite);
    this.price = data.price || ``;
    this.addedOffers = data.offer && [].concat(data.offer) || [];
    this.picture = data.picture || ``;
    this.description = data.description || ``;

    this._isVisible = true;

    // data[`total-price`];

    if (data.time) {
      const [timeStart, timeEnd] = data.time.split(` — `);
      this.timeStart = moment(timeStart, `X`).valueOf();
      this.timeEnd = moment(timeEnd, `X`).valueOf();
      // this.timeStart = parseInt(updateTime(this.day, timeStart), 10);
      // this.timeEnd = parseInt(updateTime(this.day, timeEnd), 10);
    }
  }

  get isVisible() {
    return this._isVisible;
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  get allOffers() {
    return typeTripPoint[this.type].offers;
  }

  get icon() {
    return typeTripPoint[this.type].icon;
  }

  get times() {
    return `${formatDate(this.timeStart, `HH:mm`)} — ${formatDate(this.timeEnd, `HH:mm`)}`;
  }

}

export {TripPointEntity};
