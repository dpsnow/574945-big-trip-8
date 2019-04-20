import {formatDate} from './utils.js';

import {TypeInfo} from '../trip-points/trip-point-constants.js';

const tripSchedule = document.querySelector(`.trip__points`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);
const tripDates = document.querySelector(`.trip__dates`);

const updateGeneralInfo = (generalData, key = `all`) => {

  if (key === TypeInfo.TOTAL_PRICE) {
    tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
  } else {
    tripSchedule.textContent = tripSchedule.textContent = [...generalData.cites].join(` — `);
    tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
    tripDates.textContent = `${formatDate(generalData.startDate, `DD MMM`)} — ${formatDate(generalData.finishDate, `DD MMM`)}`;
  }

  /*
  switch (key) {
    case TypeInfo.CITES:
      tripSchedule.textContent = [...generalData.cites].join(` — `);
      break;

    case TypeInfo.TOTAL_PRICE:
      tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
      break;

    case TypeInfo.DATES:
      tripDates.innerHTML = `${formatDate(generalData.startDate, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(generalData.finishDate, `DD MMM`)}`;
      break;

    default:
      tripSchedule.textContent = tripSchedule.textContent = [...generalData.cites].join(` — `);
      tripTotalCost.textContent = `€ ${generalData.totalPrice}`;
      tripDates.innerHTML = `${formatDate(generalData.startDate, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(generalData.finishDate, `DD MMM`)}`;
      break;
  }
  */
};

export {updateGeneralInfo};
