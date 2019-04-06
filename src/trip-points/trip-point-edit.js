import flatpickr from 'flatpickr';

import {isFunction, createElement, renderElements} from '../utils.js';

import {Component} from '../component.js';
import {getTemplate, renderAllOffers} from '../template/trip-point-edit-template.js';
import {TripPointEntity} from './trip-point-entity.js';
import {typeTripPoint, Destinations} from '../trip-points/trip-point-constants.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_green.css';

class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._icon = data.icon;
    this._type = data.type;
    this._destination = data.destination;
    // this._day = data.day;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._times = data.times;
    this._price = data.price;
    this._addedOffers = data.addedOffers;
    // this._allOffers = data.allOffers;
    this._picture = data.picture;
    this._isFavorite = data.isFavorite;
    this._description = data.description;

    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
    this._onResetBtnClick = this._onResetBtnClick.bind(this);
    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);
  }

  get template() {
    return getTemplate(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();
    const newDate = new FormData(evt.target);
    const updateDate = this._convertDate(newDate);

    if (isFunction(this._onSubmit)) {
      this._onSubmit(updateDate);
    }

    this.update(updateDate);
    return updateDate;
  }

  _onResetBtnClick(evt) {
    evt.preventDefault();
    if (isFunction(this._onDelete)) {
      this._onDelete();
    }
  }


  _updateOffers() {
    const offersContainer = this._element.querySelector(`.point__offers`);
    const oldOffers = this._element.querySelector(`.point__offers-wrap`);
    const newOffer = document.createElement(`div`);
    newOffer.classList.add(`point__offers-wrap`);
    const elements = createElement(renderAllOffers(this));
    renderElements(newOffer, elements);

    offersContainer.replaceChild(newOffer, oldOffers);
  }

  _onChangeType(evt) {
    this._type = evt.target.value;
    this._addedOffers = [];
    this._allOffers = typeTripPoint[this._type].offers;
    this._element.querySelector(`.travel-way__label`).textContent = this._icon;
    this._element.querySelector(`.point__destination-label`).textContent = `${typeTripPoint[this._type].text}`;

    this._updateOffers();

  }

  _onChangeDestination(evt) {
    this._destination = evt.target.value;
    const destinationContainer = this._element.querySelector(`.point__destination`);
    destinationContainer.querySelector(`.point__destination-text`).textContent = Destinations[this._destination].description;

    const oldPictures = destinationContainer.querySelector(`.point__destination-images`);
    const newPictures = document.createElement(`div`);
    newPictures.classList.add(`point__destination-images`);
    const elements = createElement(Destinations[this._destination].pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`).join(``));
    renderElements(newPictures, elements);

    destinationContainer.replaceChild(newPictures, oldPictures);
  }

  _initFlatpickr() {
    const inputTimeFrom = this._element.querySelector(`.point__input[name="date-start"]`);
    const inputTimeTo = this._element.querySelector(`.point__input[name="date-end"]`);
    flatpickr(inputTimeFrom, {
      enableTime: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      altInput: true,
      dateFormat: `U`
    });

    flatpickr(inputTimeTo, {
      enableTime: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      altInput: true,
      dateFormat: `U`
    });
  }

  bind() {
    this._initFlatpickr();
    this._element.querySelector(`.point form`).addEventListener(`reset`, this._onResetBtnClick);
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelectorAll(`.travel-way__select-input`).forEach((elem) => elem.addEventListener(`change`, this._onChangeType));
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onChangeDestination);
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
        convertedData[property] = [].concat(convertedData[property]).concat(value);
      } else {
        convertedData[property] = value;
      }
    }
    return new TripPointEntity(convertedData);
  }

  update({icon, type, destination, day, timeStart, timeEnd, times, price, addedOffers, picture, description, isFavorite}) {
    this._icon = icon;
    this._type = type;
    this._destination = destination;
    this._day = day;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._times = times;
    this._price = price;
    this._addedOffers = addedOffers;
    this._picture = picture;
    this._description = description;
    this._isFavorite = isFavorite;
  }

}

export {TripPointEdit};
