import moment from 'moment';
import {isFunction} from '../utils.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/trip-point-template.js';

class TripPoint extends Component {
  constructor(data) {
    // console.log('in TripPoint', data);
    super();
    this._icon = data.icon;
    this._type = data.type;
    this._destination = data.destination;
    this._day = data.day;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._times = data.times;
    this._price = data.price;
    this._offers = data.addedOffers;

    this._isFavorite = data.isFavorite;

    this._onTripPointClick = this._onTripPointClick.bind(this);
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

  update({icon, type, destination, day, timeStart, timeEnd, times, price, addedOffers, isFavorite}) {
    this._icon = icon;
    this._type = type;
    this._destination = destination;
    this._day = day;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._times = times;
    this._price = price;
    this._offers = addedOffers;
    this._isFavorite = isFavorite;
  }
}

export {TripPoint};
