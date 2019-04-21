import {formatDate} from './utils.js';

import {CURRENCY, TypeInfo} from '../trip-constants.js';

const tripSchedule = document.querySelector(`.trip__points`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);
const tripDates = document.querySelector(`.trip__dates`);

const updateGeneralInfo = (generalData, key = `all`) => {

  if (key === TypeInfo.TOTAL_PRICE) {
    tripTotalCost.textContent = `${CURRENCY} ${generalData.totalPrice}`;
  } else {
    tripSchedule.textContent = tripSchedule.textContent = [...generalData.cites].join(` — `);
    tripTotalCost.textContent = `${CURRENCY} ${generalData.totalPrice}`;
    tripDates.textContent = `${formatDate(generalData.startDate, `DD MMM`)} — ${formatDate(generalData.finishDate, `DD MMM`)}`;
  }
};

export {updateGeneralInfo};
