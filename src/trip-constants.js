import {API} from './api.js';

const AUTHORIZATION = `Basic dXgtyhYfjgZAo=0`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const ESC_KEYCODE = 27;

const NameFilter = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

const TypeStats = {
  DURATION: `duration`,
  COUNT: `count`,
  TIME: `time`,
  PRICE: `price`
};

const TypeSort = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  DAY: `day`
};

const TypeInfo = {
  CITES: `cites`,
  TOTAL_PRICE: `totalPrice`,
  DATES: `dates`
};

const MsgStatus = {
  ERROR: `Something went wrong while loading your route info. Check your connection or try again later`,
  LOADING: `Loading route...`
};

const filtersData = [
  {name: NameFilter.EVERYTHING, checked: true},
  {name: NameFilter.FUTURE},
  {name: NameFilter.PAST}
];

let Destinations = {};

let typeTripPoint = {
  'taxi': {
    icon: `🚕`,
    text: `Taxi to`,
  },
  'bus': {
    icon: `🚌`,
    text: `Bus to`,
  },
  'train': {
    icon: `🚂`,
    text: `Train to`,
  },
  'flight': {
    icon: `✈️`,
    text: `Flight to`,
  },
  'sightseeing': {
    icon: `🏛️`,
    text: `Sightseeing to`,
  },
  'check-in': {
    icon: `🏨`,
    text: `Check-in`,
  },
  'restaurant': {
    icon: `🍴`,
    text: `Restaurant in`,
  },
};


api.getOffers()
.then((inputOffers) => {
  inputOffers.forEach((it) => {
    typeTripPoint[it.type].offers = [];
    it.offers.forEach((offer) => {
      typeTripPoint[it.type].offers.push({
        title: offer.name,
        price: offer.price,
        accepted: false
      });
    });

  });
});
// .then(() => console.log('typeTripPoint', typeTripPoint));


api.getDestinations()
.then((inputDestinations) => {
  // console.log('inputDestinations', inputDestinations);
  inputDestinations.forEach((it) => {
    Destinations[it.name] = {};
    Destinations[it.name].description = it.description;
    Destinations[it.name].pictures = it.pictures;
  });
});
// .then(() => console.log('Destinations', Destinations));


export {AUTHORIZATION, END_POINT, ESC_KEYCODE, NameFilter, filtersData, typeTripPoint, Destinations, TypeStats, TypeSort, TypeInfo, MsgStatus};
