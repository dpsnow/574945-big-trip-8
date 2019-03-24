export const getTemplate = (point) => {
  // console.log(point);
  return `
  <article class="trip-point">
    <i class="trip-icon">${point._icon}</i>
    <h3 class="trip-point__title">${point._type} to ${point._destination}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${point._times}</span>
      <span class="trip-point__duration">${point._duration}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${point._price}</p>
    <ul class="trip-point__offers">
      ${point._offers.map((offer) => `<li><button class="trip-point__offer">${offer.name} + €${offer.price}</button></li>`).join(``)}
    </ul>
  </article>`.trim();
};