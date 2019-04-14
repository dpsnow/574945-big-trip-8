import {formatDate} from '../utils.js';

const tripSchedule = document.querySelector(`.trip__points`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);
const tripDates = document.querySelector(`.trip__dates`);


const updateCites = (allPoints) => {
  const cites = new Set(allPoints.map((tripPoint) => tripPoint.destination.name));
  tripSchedule.textContent = [...cites].join(` — `);
};

const updateTotalPrice = (allPoints) => {
  tripTotalCost.textContent = `€ ${allPoints.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPrice;
  }, 0)}`;
};

const updateDates = (allPoints) => {
  // из отсортированного списка получить самую дату начала и дату конца
  tripDates.innerHTML = `${formatDate(allPoints[0].timeStart, `DD MMM`)}&nbsp;&mdash;&nbsp;${formatDate(allPoints[allPoints.length - 1].timeStart, `DD MMM`)}`;
};

const updateGeneralInfo = (allPoints, key = `all`) => {
  allPoints = allPoints.filter((tripPoint) => Boolean(tripPoint));

  switch (key) {
    case `cites`:
      updateCites(allPoints);
      break;
    case `totalPrice`:
      updateTotalPrice(allPoints);
      break;

    case `dates`:
      updateDates(allPoints);
      break;

    default:
      updateCites(allPoints);
      updateTotalPrice(allPoints);
      updateDates(allPoints);
      break;
  }
};

export {updateGeneralInfo};
