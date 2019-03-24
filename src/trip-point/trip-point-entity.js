import {formatDate, updateTime} from '../utils.js';

class TripPointEntity {
  constructor(data) {
    this.day = data.day || parseInt(formatDate([], `x`), 10);
    this.type = data[`travel-way`] || ``;
    this.destination = data.destination || ``;
    this.isFavorite = Boolean(data.favorite);
    this.price = data.price || ``;
    this.offers = [];
    // data[`total-price`];

    if (data.time) {
      const [timeStart, timeEnd] = data.time.split(` — `);
      this.timeStart = parseInt(updateTime(this.day, timeStart), 10);
      this.timeEnd = parseInt(updateTime(this.day, timeEnd), 10);
      this.day = this.timeStart;
    }

    if (data.offer) {
      data.offer.split(`, `).forEach((offer) => {
        // const [name, price] = offer.split(` + €`);
        this.offers.push({
          name: offer,
          price: 25,
        });
      });
    }
  }
}

export {TripPointEntity};
