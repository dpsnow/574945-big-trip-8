import {typeTripPoint} from './data.js';

function createTripPoint(tripPointParam) {
  return `
    <article class="trip-point">
      <i class="trip-icon">${typeTripPoint[tripPointParam.type]}</i>
      <h3 class="trip-point__title">${tripPointParam.type} to ${tripPointParam.destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${new Date(tripPointParam.timeStart).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})} &nbsp;&mdash; ${new Date(tripPointParam.timeEnd).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})} </span>
        <span class="trip-point__duration">${tripPointParam.duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${tripPointParam.price}</p>
      <ul class="trip-point__offers">
        ${tripPointParam.offers.map((offer) => `<li><button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button></li>`).join(``)}
      </ul>
    </article>`;
}

export {createTripPoint};
