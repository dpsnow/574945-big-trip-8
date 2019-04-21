import {CURRENCY, typeTripPoint} from '../../trip-constants.js';

const unacceptedOffers = (offers) => {
  const filteredOffer = offers.filter((offer) => !offer.accepted).slice(0, 3);
  return filteredOffer.map((offer) => !offer.accepted ? `<li><button class="trip-point__offer">${offer.title} + ${CURRENCY}${offer.price}</button></li>` : ``).join(``);
};

export const getTemplate = (point) => {
  // console.log('from TripPoint', point);
  return `
  <article class="trip-point">
    <i class="trip-icon">${point._icon}</i>
    <h3 class="trip-point__title">${typeTripPoint[point._type].text} ${point._destination}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${point.times}</span>
      <span class="trip-point__duration">${point.duration}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${point._totalPrice}</p>
    <ul class="trip-point__offers">
      ${unacceptedOffers(point._offers)}
    </ul>
  </article>`.trim();
};
