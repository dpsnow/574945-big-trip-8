import flatpickr from 'flatpickr';
import moment from 'moment';

import {isFunction, createElement, renderElements} from '../utils.js';

import {Component} from '../component.js';
import {getTemplate, renderAllOffers} from '../template/trip-point-edit-template.js';

import {typeTripPoint, Destinations} from '../trip-points/trip-point-constants.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_green.css';

class TripPointEdit extends Component {
  constructor(data) {
    // console.log('from TripPointEdit', data);
    // console.log('typeTripPoint', typeTripPoint);
    super();
    this._id = data.id;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._type = data.type;
    this._destination = data.destination;
    this._isFavorite = data.isFavorite;
    this._price = data.price;
    this._offers = data.offers;


    this._flatpickrTo = null;
    this._flatpickrFrom = null;
    this._flatpickrDay = null;

    this._icon = data.icon;

    // this._day = data.day;

    // this._allOffers = data.allOffers;
    // this._description = data.description;
    // this._picture = data.picture;

    this._isNewTripPoint = data.isNewTripPoint;

    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
    this._onResetBtnClick = this._onResetBtnClick.bind(this);
    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);
    this._onESCkeydown = this._onESCkeydown.bind(this);
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

  set onCancelEditMode(fn) {
    this._onCancelEditMode = fn;
  }

  _onESCkeydown(evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE && isFunction(this._onCancelEditMode)) {
      this._onCancelEditMode();
    }
  }

  _convertDate(formData) {
    const convertedData = {};
    if (this._offers) {
      this._offers.forEach((offer) => {
        offer.accepted = false;
      });
    }

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      // console.log('[property, value] = ', pair);
      // console.log(`newDate[_${property}_] = ${value}`);

      if (property === `offer`) {
        this._offers.forEach((offer) => {
          if (offer.title === value) {
            offer.accepted = true;
          }
        });
        continue;
      }

      if (!value) {
        continue;
      }


      if (convertedData[property]) {
        convertedData[property] = [].concat(convertedData[property]).concat(value);
      } else {
        convertedData[property] = value;
      }

    }
    // console.log('convertedData', convertedData);
    return {
      'base_price': convertedData[`price`],
      'date_from': moment(convertedData[`date-start`], `X`).valueOf(),
      'date_to': moment(convertedData[`date-end`], `X`).valueOf(),
      'destination': {
        name: convertedData[`destination`],
        description: Destinations[convertedData[`destination`]].description || ``,
        pictures: Destinations[convertedData[`destination`]].pictures || []
      },
      'id': this._id,
      'is_favorite': Boolean(convertedData[`favorite`]),
      'offers': this._offers,
      'type': convertedData[`travel-way`]
    };
  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();

    const newDate = new FormData(evt.target);
    const updateDate = this._convertDate(newDate);

    this._element.classList.toggle(`shake`, false);
    this._element.querySelector(`button[type=reset]`).disabled = true;
    this._element.querySelector(`button[type=submit]`).disabled = true;
    this._element.querySelector(`button[type=submit]`).textContent = `Saving....`;

    if (isFunction(this._onSubmit)) {
      this._onSubmit(updateDate)
      .catch((error) => {
        console.error(error);
        this._element.classList.toggle(`shake`, true);
        this._element.querySelector(`button[type=submit]`).textContent = `Save`;
        this._element.querySelector(`button[type=submit]`).disabled = false;
        this._element.querySelector(`button[type=reset]`).disabled = false;
      });
    }
  }

  _onResetBtnClick(evt) {
    evt.preventDefault();

    this._element.classList.toggle(`shake`, false);
    this._element.querySelector(`button[type=reset]`).disabled = true;
    this._element.querySelector(`button[type=submit]`).disabled = true;
    this._element.querySelector(`button[type=reset]`).textContent = `Deleting...`;

    if (this._isNewTripPoint) {
      this.unrender();
    } else if (isFunction(this._onDelete)) {
      this._onDelete()
      .then(() => {
        this.unrender();
      })
      .catch((error) => {
        console.error(error);
        this._element.classList.toggle(`shake`, true);
        this._element.querySelector(`button[type=reset]`).textContent = `Delete`;
        this._element.querySelector(`button[type=submit]`).disabled = false;
        this._element.querySelector(`button[type=reset]`).disabled = false;
      });
    }
  }

  _updateOffers() {
    const offersContainer = this._element.querySelector(`.point__offers`);
    const oldOffers = this._element.querySelector(`.point__offers-wrap`);
    const newOffer = document.createElement(`div`);
    newOffer.classList.add(`point__offers-wrap`);
    this._offers = typeTripPoint[this._type].offers;
    // console.log(this._offers);
    if (!this._offers || this._offers.length === 0) {
      newOffer.textContent = `No avaliable offers`;

    } else {
      const offersElements = createElement(this._offers.map((offer, index) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${index}" name="offer" value="${offer.title}"
      ${offer.accepted ? `checked` : ``}>
      <label for="${index}" class="point__offers-label">
        <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`)
      .join(``));
      renderElements(newOffer, offersElements);
    }

    offersContainer.replaceChild(newOffer, oldOffers);
  }

  _onChangeType(evt) {
    this._type = evt.target.value;
    this._offers = [];
    this._allOffers = typeTripPoint[this._type].offers;
    this._element.querySelector(`.travel-way__label`).textContent = typeTripPoint[this._type].icon;
    this._element.querySelector(`.point__destination-label`).textContent = `${typeTripPoint[this._type].text}`;

    this._updateOffers();

  }

  _onChangeDestination(evt) {
    this._destination = evt.target.value;
    const destinationContainer = this._element.querySelector(`.point__destination`);
    destinationContainer.querySelector(`.point__destination-text`).textContent = Destinations[this._destination].description || `No descrition for this destination`;

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

    this._flatpickrFrom = flatpickr(inputTimeFrom, {
      enableTime: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      altInput: true,
      dateFormat: `U`
    });

    this._flatpickrTo = flatpickr(inputTimeTo, {
      minDate: moment(this._timeStart, `x`).format(`YYYY-MM-DD`),
      enableTime: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      altInput: true,
      dateFormat: `U`
    });

    inputTimeFrom.addEventListener(`change`, (evt) => {
      this._flatpickrTo.config.minDate = evt.target.value;
    });

    if (this._isNewTripPoint) {
      const inputDay = this._element.querySelector(`.point__input[name=day]`);

      this._flatpickrDay = flatpickr(inputDay, {
        defaultDate: this._timeStart,
        altFormat: `d M`,
        altInput: true,
        dateFormat: `U`
      });

      inputDay.addEventListener(`change`, (evt) => {
        this._flatpickrFrom.setDate(evt.target.value);
      });

      inputTimeFrom.addEventListener(`change`, (evt) => {
        this._flatpickrDay.setDate(evt.target.value);
      });
    }
  }

  _destroyFlatpickr() {
    this._flatpickrTo.destroy();
    this._flatpickrFrom.destroy();
  }

  bind() {
    this._initFlatpickr();

    this._element.querySelector(`.point form`).addEventListener(`reset`, this._onResetBtnClick);
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelectorAll(`.travel-way__select-input`).forEach((elem) => elem.addEventListener(`change`, this._onChangeType));
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onChangeDestination);

    document.addEventListener(`keydown`, this._onESCkeydown);
  }

  unbind() {
    this._destroyFlatpickr();

    this._element.removeEventListener(`reset`, this._onResetBtnClick);
    this._element.removeEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelectorAll(`.travel-way__select-input`).forEach((elem) => elem.removeEventListener(`change`, this._onChangeType));
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onChangeDestination);

    document.removeEventListener(`keydown`, this._onESCkeydown);
  }


  update(newData) {
    this._timeStart = newData.timeStart;
    this._timeEnd = newData.timeEnd;
    this._type = newData.type;
    this._destination = newData.destination;
    this._isFavorite = newData.isFavorite;
    this._price = newData.price;
    this._offers = newData.offers;

    this._icon = newData.icon;
    this._day = newData.day;

    // this._picture = newData.picture;
    // this._description = newData.description;
  }

}

export {TripPointEdit};
