import {formatDate} from '../../utils/utils.js';
import {typeTripPoint, Destinations} from '../../trip-constants.js';

const createOffers = (offers, id) => {
  // console.info(offers);
  if (!offers || !offers.length) {
    return `No avaliable offers`;
  }
  return offers.map((offer, index) => {
    return `
    <input class="point__offers-input visually-hidden" type="checkbox" id="${id}-${index}" name="offer" value="${offer.title}"
    ${offer.accepted ? `checked` : ``}>
    <label for="${id}-${index}" class="point__offers-label">
      <span class="point__offer-service">${offer.title || offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
    </label>
    `;
  }).join(``);
};

const getTemplate = (point) => {
  // console.log('from TripPointEdit', point);
  // console.log('Destinations', Destinations);
  return `
  <article class="point">
  <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${formatDate(point._timeStart, `X`)}">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${point._icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            ${Object.keys(typeTripPoint).map((typeName) => `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${typeName}" name="travel-way" value="${typeName}" ${point._type === `${typeName}` ? `checked` : ``}>
            <label class="travel-way__select-label" for="travel-way-${typeName}">${typeTripPoint[typeName].icon} ${typeName}</label>`).join(``)}
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${typeTripPoint[point._type].text}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${point._destination.name}" name="destination" required >
        <datalist id="destination-select">
          ${Object.keys(Destinations).map((city) => `<option value="${city}"></option>`).join(``)}
        </datalist>
      </div>

      <div class="point__time">
        choose time
        <input class="point__input" type="text" value="${formatDate(point._timeStart, `X`)}" name="date-start" placeholder="19:00" required>
        <input class="point__input" type="text" value="${formatDate(point._timeEnd, `X`)}" name="date-end" placeholder="21:00" required>
      </div>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${point._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${point._isFavorite ? `checked` : ``}>
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">${createOffers(point._offers, point._id)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${point._destination.description || `No descrition for this destination`}</p>

        <div class="point__destination-images"${point._destination.pictures.length ? `` : ` style="display:none"`}>
         ${point._destination.pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`).join(``)}
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`.trim();
};

export {createOffers, getTemplate};
