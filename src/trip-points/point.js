import {isFunction, formatDate} from '../utils/utils.js';
import {Component} from '../component.js';
import {getTemplate} from './templates/point-template.js';
import {CURRENCY, Destinations} from '../trip-constants.js';

class Point extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._type = data.type;
    this._destination = data.destination.name;
    this._isFavorite = data.isFavorite;
    this._price = data.price;
    this._totalPrice = data.totalPrice;
    this._offers = data.offers;

    this._icon = data.icon;
    this._duration = data.duration;

    this._onTripPointClick = this._onTripPointClick.bind(this);
    this._onClickOffer = this._onClickOffer.bind(this);
  }

  get duration() {
    const durationInDays = this._duration.asDays() >= 1 ? `${parseInt(this._duration.asDays(), 10)}D ` : ``;
    const durationInHours = this._duration.hours() ? `${this._duration.hours()}H ` : ``;
    const durationInMinutes = this._duration.minutes() ? `${this._duration.minutes()}M` : ``;
    return `${durationInDays}${durationInHours}${durationInMinutes}`;
  }

  get times() {
    return `${formatDate(this._timeStart, `HH:mm`)} — ${formatDate(this._timeEnd, `HH:mm`)}`;
  }

  get template() {
    return getTemplate(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onAddOffer(fn) {
    this._onAddOffer = fn;
  }

  get toRaw() {
    return {
      'base_price': this._price,
      'date_from': this._timeStart,
      'date_to': this._timeEnd,
      'destination': {
        name: this._destination,
        description: Destinations[this._destination].description,
        pictures: Destinations[this._destination].pictures
      },
      'id': this._id,
      'is_favorite': this._isFavorite,
      'offers': this._offers,
      'type': this._type
    };
  }


  _onTripPointClick(evt) {
    if (evt.target.classList.contains(`trip-point__offer`)) {
      return;
    }
    if (isFunction(this._onEdit)) {
      this._onEdit();
    }
  }

  _onClickOffer(evt) {
    evt.preventDefault();
    this._element.classList.toggle(`shake`, false);
    let targetOffer = evt.target.innerText;
    targetOffer = targetOffer.slice(0, targetOffer.lastIndexOf(` + ${CURRENCY}`));
    this._offers.forEach((offer) => {
      if (offer.title === targetOffer) {
        offer.accepted = true;
      }
    });

    if (isFunction(this._onAddOffer)) {
      this._onAddOffer(evt.target)
        .then(() => {
          this.element.querySelector(`.trip-point__price`).textContent = `${CURRENCY} ${this._totalPrice}`;
          evt.target.remove();
        })
        .catch(() => {
          this.element.classList.add(`shake`);
        });
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPointClick);
    [...this._element.querySelectorAll(`.trip-point__offer`)].forEach((element) => {
      element.addEventListener(`click`, this._onClickOffer);
    });
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onTripPointClick);
  }

  updateTotalPrice() {
    this.element.querySelector(`.trip-point__price`).textContent = `${CURRENCY} ${this._totalPrice}`;
  }

  update(newData) {
    this._icon = newData.icon;
    this._type = newData.type;
    this._destination = newData.destination.name;
    this._timeStart = newData.timeStart;
    this._timeEnd = newData.timeEnd;
    this._price = newData.price;
    this._totalPrice = newData.totalPrice;
    this._offers = newData.offers;
    this._isFavorite = newData.isFavorite;
    this._duration = newData.duration;
  }
}

export {Point};
