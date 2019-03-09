import {getRandomInt} from './utils.js';

const filters = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const cities = [`Geneva`, `Amsterdam`, `Chamonix`, `Moscow`, `Berlin`, `Milan`, `Rome`, `Paris`, `Lisbon`];

const typeTripPoint = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛️`,
  'Restaurant': `🍴`,
};

const allOffers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];

const getOffers = () => {
  let offers = [];
  let offersName = new Array(getRandomInt(0, 2)).fill(``).map(() => allOffers[getRandomInt(0, allOffers.length - 1)]);
  offersName = new Set(offersName);
  offersName.forEach((offerName) => {
    offers.push({
      name: offerName,
      price: getRandomInt(5, 50)
    });
  });
  return offers;
};

const getRandomTimeParams = () => {
  let startTime = new Date();
  startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 4));
  startTime.setHours(getRandomInt(0, 24), getRandomInt(0, 60));

  let timeEnd = new Date(startTime);
  timeEnd.setHours(getRandomInt(startTime.getHours(), 23), getRandomInt(startTime.getMinutes(), 59));

  return {
    timeStart: startTime.getTime(),
    timeEnd: timeEnd.getTime(),
    duration: `${timeEnd.getHours() - startTime.getHours()}h ${timeEnd.getMinutes() - startTime.getMinutes()}m`
  };
};


const getTripPoint = () => {
  const timeParams = getRandomTimeParams();

  return {
    type: Object.keys(typeTripPoint)[Math.floor(Math.random() * Object.keys(typeTripPoint).length)],
    destination: cities[Math.floor(Math.random() * cities.length)],
    day: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 4)),
    timeStart: timeParams.timeStart,
    timeEnd: timeParams.timeEnd,
    duration: timeParams.duration,
    price: getRandomInt(15, 250),
    offers: getOffers(),
    description: new Set(new Array(getRandomInt(1, 4)).fill(``).map(() => description[getRandomInt(0, allOffers.length - 1)])),
  };
};

export {filters, typeTripPoint, getTripPoint};
