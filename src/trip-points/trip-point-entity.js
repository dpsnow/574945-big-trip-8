import moment from 'moment';
import {formatDate} from '../utils.js';
import {typeTripPoint, Destinations} from './trip-point-constants.js';

class TripPointEntity {
  constructor(data) {
    console.log(`in TripPointEntity`, data);

    this.id = data.id;
    // this.day = data.day || Number(formatDate([], `x`), 10);
    this.timeStart = Number(data.timeStart) || Number(data[`date_from`]) || moment(data[`date-start`], `X`).valueOf() || undefined;
    this.timeEnd = Number(data.timeEnd) || Number(data[`date_to`]) || moment(data[`date-end`], `X`).valueOf() || undefined;
    this.type = data.type || data[`travel-way`] || ``;
    this.destination = data.destination.name || data.destination || ``;
    this.isFavorite = Boolean(data.favorite);
    this.price = Number(data.price) || Number(data.base_price) || 0;
    this.addedOffers = data.offers || (data.offer && [].concat(data.offer)) || [];
    // this.picture = data.picture || ``;
    // this.description = data.destination.description || Destinations[data.destination.name] || ``;

    this._isVisible = true;

    // data[`total-price`];

    if (data.id !== undefined) {
      this.id = data.id;
    }

    if (data.offer) {
      this.addedOffers = [].concat(data.offer).map((offer) => {
        const [title, price] = offer.split(`; price:`);
        console.log(title, price);
        return {
          title,
          price,
          accepted: true
        };
      });
    }

    // if (data.time) {
    //   const [timeStart, timeEnd] = data.time.split(` — `);
    //   this.timeStart = moment(timeStart, `X`).valueOf();
    //   this.timeEnd = moment(timeEnd, `X`).valueOf();
    // }
  }

  get duration() {
    return moment.duration(moment(this.timeEnd, `x`).diff(moment(this.timeStart, `x`)));
  }

  get day() {
    return moment(this.timeStart).startOf(`date`).valueOf();
  }

  get isVisible() {
    return this._isVisible;
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  // get allOffers() {
  //   return typeTripPoint[this.type].offers;
  // }

  get icon() {
    return typeTripPoint[this.type].icon;
  }

  // get times() {
  //   return `${formatDate(this.timeStart, `HH:mm`)} — ${formatDate(this.timeEnd, `HH:mm`)}`;
  // }

}

export {TripPointEntity};
