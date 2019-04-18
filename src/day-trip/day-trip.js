import {Component} from '../component.js';
import {getTemplate} from './day-trip-template.js';

class DayTrip extends Component {
  constructor(day, date) {
  // console.log(day, date);
    // elementsTripPoints
    super();
    this.day = day;
    this.date = date;
  }

  get template() {
    return getTemplate(this);
  }

  // addPointElement(element) {
  //   this._element.querySelector(`.trip-day__items`).appendChild(element);
  // }

  get containerForPoints() {
    return this._element.querySelector(`.trip-day__items`);
  }
}

export {DayTrip};
