import moment from 'moment';
import {typeTripPoint} from '../trip-constants.js';

class PointEntity {
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
    const startDay = moment(startDate);
    const currentDay = moment(this.timeStart);
    // console.log(`-----------------------------`);
    // console.log(`this.timeStart = ${moment(this.timeStart).date()}; startDate = ${moment(startDate).date()};`);
    // console.log(currentDay.diff(startDay, `days`));
    return currentDay.diff(startDay, `days`) + 1;
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

export {PointEntity};
