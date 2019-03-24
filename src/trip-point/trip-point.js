import moment from 'moment';
import {isFunction, formatDate} from '../utils.js';
import {typeTripPoint} from '../data.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/trip-point-template.js';

class TripPoint extends Component {
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

    this._onTripPointClick = this._onTripPointClick.bind(this);
  }

  get _icon() {
    return typeTripPoint[this._type.toLocaleLowerCase()];
  }

  get _times() {
    return `${formatDate(this._timeStart, `HH:mm`)} — ${formatDate(this._timeEnd, `HH:mm`)}`;
  }

  get _duration() {
    const durationInMs = moment(this._timeEnd).diff(moment(this._timeStart), `milliseconds`);
    return moment.utc(durationInMs).format(`H[H] mm[M]`);
  }

  get template() {
    return getTemplate(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onTripPointClick() {
    if (isFunction(this._onEdit)) {
      this._onEdit();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onTripPointClick);
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

export {TripPoint};
