import moment from 'moment';
import {getRandomBoolean, getRandomInt, getRandomValueFromArray, getRandomArray} from './utils.js';
import {typeTripPoint} from './trip-point/trip-point-constants.js';

const filtersData = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const cities = [`Geneva`, `Amsterdam`, `Chamonix`, `Moscow`, `Berlin`, `Milan`, `Rome`, `Paris`, `Lisbon`];

const getOffers = (type) => {
  let allOffersForType = getRandomBoolean() && getRandomArray(typeTripPoint[type].offers, 3) || [];
  return [...new Set(allOffersForType)];
};

const getRandomTimeParams = () => {
  const timeStart = moment().add(getRandomInt(0, 7), `days`).add(getRandomInt(0, 24), `hours`).format(`x`);
  const timeEnd = moment(timeStart, `x`).add(getRandomInt(0, 24), `hours`).format(`x`);

  return [
    timeStart,
    timeEnd
  ];
};

const tripPointData = () => {
  const [timeStart, timeEnd] = getRandomTimeParams();
  const type = getRandomValueFromArray(Object.keys(typeTripPoint));
  const offer = getOffers(type);

  return {
    type,
    destination: getRandomValueFromArray(cities),
    timeStart,
    timeEnd,
    price: getRandomInt(15, 250),
    offer,
    picture: `http://picsum.photos/150/150?r=${getRandomInt(0, 155)}`,
    description: [...new Set(getRandomArray(descriptionText, 4, 1))].join(``),
    isFavorite: getRandomBoolean()
  };
};

export {filtersData, typeTripPoint, tripPointData};
