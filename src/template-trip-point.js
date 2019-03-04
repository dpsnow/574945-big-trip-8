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
      <i class="trip-icon">${tripPointParam.icon}</i>
      <h3 class="trip-point__title">${tripPointParam.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${tripPointParam.timeStart}&nbsp;&mdash; ${tripPointParam.timeEnd}</span>
        <span class="trip-point__duration">${tripPointParam.duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${tripPointParam.price}</p>
      <ul class="trip-point__offers">
        ${offers}
      </ul>
    </article>`;
}

export {createTripPoint};
