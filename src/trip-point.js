import {createElement} from './utils.js';
import {typeTripPoint} from './data.js';

class TripPoint {
  constructor(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._day = data.day;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._duration = data.duration;
    this._price = data.price;
    this._offers = data.offers;
  }

  get _icon() {
    return typeTripPoint[this._type];
  }

  get _times() {
    return `${new Date(this._timeStart).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})} &nbsp;&mdash; ${new Date(this._timeEnd).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})}`;
  }

  get template() {
    return `
    <article class="trip-point">
      <i class="trip-icon">${this._icon}</i>
      <h3 class="trip-point__title">${this._type} to ${this._destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._times}</span>
        <span class="trip-point__duration">${this._duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
        ${this._offers.map((offer) => `<li><button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button></li>`).join(``)}
      </ul>
    </article>`.trim();
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template)[0];
    this.addHandlers();
    return this._element;
  }

  unrender() {
    this.removeHandlers();
    this._element.remove();
    this._element = null;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onTripPointClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  addHandlers() {
    this._element.addEventListener(`click`, this._onTripPointClick.bind(this));
  }

  removeHandlers() {
    this._element.removeEventListener(`click`, this._onTripPointClick.bind(this));
  }

}

export {TripPoint};
