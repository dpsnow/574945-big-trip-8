import moment from 'moment';
// import {formatDate} from '../utils.js';
import {typeTripPoint} from './trip-point-constants.js';

class TripPointEntity {
  constructor(data) {
    // console.log(`in TripPointEntity`, data);
    this._isVisible = true;
    this.isNewTripPoint = data.isNewTripPoint;

    this.id = data.id;
    this.timeStart = Number(data[`date_from`]);
    this.timeEnd = Number(data[`date_to`]);
    this.type = data.type || `taxi`;
    this.destination = data.destination || {name: ``, description: ``, pictures: []};
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.price = Number(data[`base_price`]);
    this.offers = data[`offers`] || typeTripPoint[data.type || `taxi`].offers;
  }

  get icon() {
    return typeTripPoint[this.type].icon;
  }

  get duration() {
    return moment.duration(moment(this.timeEnd, `x`).diff(moment(this.timeStart, `x`)));
  }

  get totalPrice() {
    const summOffers = this.offers.reduce((accumulator, currentValue) => accumulator + (currentValue.accepted ? currentValue.price : 0), 0);
    return summOffers + this.price;
  }

  get date() {
    return moment(this.timeStart).startOf(`date`).valueOf();
  }

  getDay(startDate) {
    // console.log(startDate);
    // console.log(this.timeStart);
    // console.log(moment.duration(moment(this.timeStart).diff(startDate)));
    // console.log(moment(startDate).date());
    // console.log(moment(this.timeStart).date());
    // console.log(moment(this.timeStart).diff(startDate, 'days'));


    // return moment(this.timeStart).date() - moment(this.timeStart).date();
    return moment(this.timeStart).diff(startDate, `days`) + 1;
    // return moment.duration(moment(startDate, `x`).diff(moment(this.timeStart, `x`))).asDays();
  }

  get isVisible() {
    return this._isVisible;
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  // данные приходят с сервера
  update(newData) {
    // console.log('newData', newData);
    this.id = newData.id;
    this.timeStart = Number(newData[`date_from`]);
    this.timeEnd = Number(newData[`date_to`]);
    this.type = newData.type;
    this.destination = newData[`destination`];
    this.isFavorite = Boolean(newData[`is_favorite`]);
    this.price = Number(newData[`base_price`]);
    this.offers = newData[`offers`];

    // console.log(`TripPointEntity[${this.id}]`, this);
  }
}

export {TripPointEntity};
