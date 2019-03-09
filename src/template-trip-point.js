import {typeTripPoint} from './data.js';

function createTripPoint(tripPointParam) {
  let offers = ``;
  tripPointParam.offers.forEach((offer) => {
    offers += `
      <li>
        <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
      </li>`;
  });
  return `
    <article class="trip-point">
      <i class="trip-icon">${typeTripPoint[tripPointParam.type]}</i>
      <h3 class="trip-point__title">${tripPointParam.type} to ${tripPointParam.destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${new Date(tripPointParam.timeStart).getHours()}:${new Date(tripPointParam.timeStart).getMinutes()}&nbsp;&mdash; ${new Date(tripPointParam.timeEnd).getHours()}:${new Date(tripPointParam.timeEnd).getMinutes()}</span>
        <span class="trip-point__duration">${tripPointParam.duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${tripPointParam.price}</p>
      <ul class="trip-point__offers">
        ${offers}
      </ul>
    </article>`;
}

export {createTripPoint};
