import moment from 'moment';
import {formatDate} from '../utils.js';
import {typeTripPoint, Destinations} from './trip-point-constants.js';

class TripPointEntity {
  constructor(data) {
    // console.log(`in TripPointEntity`, data);

    // this.id = data.id || 25;
    // this.day = data.day || Number(formatDate([], `x`), 10);
    // this.timeStart = Number(data.timeStart) || Number(data[`date_from`]) || moment(data[`date-start`], `X`).valueOf() || moment([]).valueOf() || undefined;
    // this.timeEnd = Number(data.timeEnd) || Number(data[`date_to`]) || moment(data[`date-end`], `X`).valueOf() || undefined;
    // this.type = data.type || data[`travel-way`] || ``;
    // this.destination = data.destination.name || data.destination || ``;
    // this.isFavorite = Boolean(data.favorite);
    // this.price = Number(data.price) || Number(data.base_price) || 0;
    // this.addedOffers = data.offers || (data.offer && [].concat(data.offer)) || [];
    // this.picture = data.picture || ``;
    // this.description = data.destination.description || Destinations[data.destination.name] || ``;

    this._isVisible = true;
    this.isNewTripPoint = data.isNewTripPoint;

    this.id = data.id;
    this.timeStart = Number(data[`date_from`]);
    this.timeEnd = Number(data[`date_to`]);
    this.type = data.type;
    this.destination = data.destination;
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.price = Number(data[`base_price`]);
    this.offers = data[`offers`];

    // data[`total-price`];

    // if (data.offer) {
    //   this.addedOffers = [].concat(data.offer).map((offer) => {
    //     const [title, price] = offer.split(`; price:`);
    //     console.log(title, price);
    //     return {
    //       title,
    //       price,
    //       accepted: true
    //     };
    //   });
    // }

  }

  // get destination() {
  //   const name = this._destination;
  //   const description = Destinations[this._destination].description;
  //   const pictures = Destinations[this._destination].pictures;
  //   return {
  //     name: this._destination,
  //     description: Destinations[this._destination].description,
  //     pictures: Destinations[this._destination].pictures
  //   };
  // }

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


  // get times() {
  //   return `${formatDate(this.timeStart, `HH:mm`)} — ${formatDate(this.timeEnd, `HH:mm`)}`;
  // }

  // get convertedDataForServer() {
  //   return {
  //     'base_price': this.price,
  //     'date_from': this.timeStart,
  //     'date_to': this.timeEnd,
  //     'destination': {
  //       name: this.destination,
  //       description: Destinations[this.destination].description,
  //       pictures: Destinations[this.destination].pictures
  //     },
  //     'id': this.id,
  //     'is_favorite': this.isFavorite,
  //     'offers': [],
  //     'type': this.type,
  //   };
  // }


  // ????? Object.assign() ?
  // update(newData) {
  //   console.log('newData', newData);
  //   this.id = newData.id || this.id;
  //   this.timeStart = newData[`date-start`];
  //   this.timeEnd = newData[`date-end`];
  //   this.type = newData[`travel-way`];
  //   this.destination = newData.destination;
  //   this.isFavorite = Boolean(newData.isFavorite);
  //   this.price = newData.price;
  //   console.log(`TripPointEntity[${this.id}]`, this);
  // }

  // данные приходят с сервера
  update(newData) {
    console.log('newData', newData);
    this.id = newData.id;
    this.timeStart = Number(newData[`date_from`]);
    this.timeEnd = Number(newData[`date_to`]);
    this.type = newData.type;
    this.destination = newData[`destination`];
    this.isFavorite = Boolean(newData[`is_favorite`]);
    this.price = Number(newData[`base_price`]);
    this.offers = newData[`offers`];

    console.log(`TripPointEntity[${this.id}]`, this);
  }
}

export {TripPointEntity};
