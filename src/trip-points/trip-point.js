// import moment from 'moment';
import {isFunction, formatDate} from '../utils.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/trip-point-template.js';

class TripPoint extends Component {
  constructor(data) {
    // console.log('in TripPoint', data);
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

    // this._day = data.day;
    // this._times = data.times;


    this._onTripPointClick = this._onTripPointClick.bind(this);
    this._onClickOffer = this._onClickOffer.bind(this);
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

  _onTripPointClick(evt) {
    if (evt.target.classList.contains(`trip-point__offer`)) {
      return;
    }
    if (isFunction(this._onEdit)) {
      this._onEdit();
    }
  }

  _onClickOffer(evt) {
    console.log(`Добавить оффер {${evt.target.innerText}} и обновить цену и отправить запрос на сервер`);
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

export {TripPoint};
