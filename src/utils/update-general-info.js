import {formatDate} from './utils.js';

const tripSchedule = document.querySelector(`.trip__points`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);
const tripDates = document.querySelector(`.trip__dates`);

const updateGeneralInfo = (generalData, key = `all`) => {

  switch (key) {
    case `cites`:
      tripSchedule.textContent = [...generalData.cites].join(` — `);
      break;

    case `totalPrice`:
      tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
      break;

    case `dates`:
      tripDates.innerHTML = `${formatDate(generalData.startDate, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(generalData.finishDate, `DD MMM`)}`;
      break;

    default:
      tripSchedule.textContent = tripSchedule.textContent = [...generalData.cites].join(` — `);
      tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
      tripDates.innerHTML = `${formatDate(generalData.startDate, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(generalData.finishDate, `DD MMM`)}`;
      break;
  }
};

export {updateGeneralInfo};
