// import moment from 'moment';
import {isFunction, formatDate} from '../utils.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/trip-point-template.js';

class TripPoint extends Component {
  constructor(data) {
    console.log('in TripPoint', data);
    super();
    this._icon = data.icon;
    this._type = data.type;
    this._destination = data.destination;
    this._day = data.day;
    this._timeStart = data.timeStart;
    this._duration = data.duration;
    this._timeEnd = data.timeEnd;
    // this._times = data.times;
    this._price = data.price;
    this._offers = data.addedOffers;

    this._isFavorite = data.isFavorite;

    this._onTripPointClick = this._onTripPointClick.bind(this);
  }

  get duration() {
    const durationInDays = this._duration.days() ? `${this._duration.days()}D ` : ``;
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

  update({icon, type, destination, day, timeStart, timeEnd, price, addedOffers, isFavorite, duration}) {
    this._icon = icon;
    this._type = type;
    this._destination = destination;
    this._day = day;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    // this._times = times;
    this._price = price;
    this._offers = addedOffers;
    this._isFavorite = isFavorite;
    this._duration = duration;
  }
}

export {TripPoint};
