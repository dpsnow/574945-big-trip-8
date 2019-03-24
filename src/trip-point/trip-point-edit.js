// import flatpickr from 'flatpickr';

import {isFunction, formatDate} from '../utils.js';

import {typeTripPoint} from '../data.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/trip-point-edit-template.js';
import {TripPointEntity} from './trip-point-entity.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_green.css';

class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._destination = data.destination;
    this._day = data.day;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    // this._duration = data.duration;
    this._price = data.price;
    this._offers = data.offers;
    this._picture = data.picture;
    this._description = data.description;
    this._isFavorite = data.isFavorite;

    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
    this._onResetBtnClick = this._onResetBtnClick.bind(this);
    this._onChangeType = this._onChangeType.bind(this);
  }

  get _icon() {
    return typeTripPoint[this._type.toLocaleLowerCase()];
  }

  get _times() {
    return `${formatDate(this._timeStart, `HH:mm`)} — ${formatDate(this._timeEnd, `HH:mm`)}`;
  }

  get template() {
    return getTemplate(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();
    const newDate = new FormData(evt.target);
    const updateDate = this._convertDate(newDate);

    if (isFunction(this._onSubmit)) {
      this._onSubmit(updateDate);
    }

    this.update(updateDate);
  }

  _onResetBtnClick(evt) {
    evt.preventDefault();
    this.unrender();
  }

  _onChangeType(evt) {
    this._type = evt.target.value;
    this._element.querySelector(`.travel-way__label`).textContent = this._icon;
    this._element.querySelector(`.point__destination-label`).textContent = `${this._type} to `;

  }

  // _initFlatpickr() {
  //   const timeInput = this._element.querySelector(`.point__input[name=time]`);
  //   flatpickr(timeInput, {
  //     time_24hr: true,
  //     enableTime: true,
  //     noCalendar: true,
  //     altInput: true,
  //     altFormat: `h:i K`,
  //     dateFormat: `H:i`
  //   });
  // }

  bind() {
    // this._initFlatpickr();
    this._element.querySelector(`.point form`).addEventListener(`reset`, this._onResetBtnClick);
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelectorAll(`.travel-way__select-input`).forEach((elem) => elem.addEventListener(`change`, this._onChangeType));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSubmitBtnClick);
    this._element.removeEventListener(`click`, this._onResetBtnClick);
  }

  _convertDate(formData) {
    const convertedData = {};

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      // console.log('[property, value] = ', pair);
      if (!value) {
        continue;
      }
      // console.log(`newDate[_${property}_] = ${value}`);
      if (convertedData[property]) {
        convertedData[property] += `, ${value}`;
      } else {
        convertedData[property] = value;
      }
    }
    // console.log(convertedData);
    // console.log(new TripPointEntity(convertedData));

    return new TripPointEntity(convertedData);
  }

  update({type, destination, day, timeStart, timeEnd, price, offers, isFavorite}) {
    this._type = type;
    this._destination = destination;
    this._day = day;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    // this._duration = duration;
    this._price = price;
    this._offers = offers;
    this._isFavorite = isFavorite;
  }

}

export {TripPointEdit};
