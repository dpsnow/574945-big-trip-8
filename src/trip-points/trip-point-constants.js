import {API} from '../api.js';

const AUTHORIZATION = `Basic dXwYXgthgjhkNz589gZAo=0`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

let Offers = {};
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
  // 'ship': {
  //   icon: `🛳️`,
  //   text: `Ship to`,
  // },
  // 'transport': {
  //   icon: `🚊`,
  //   text: `Transport to`,
  // },
  // 'drive': {
  //   icon: `🚗`,
  //   text: `Drive to`,
  // },
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


























export {AUTHORIZATION, END_POINT, typeTripPoint, Offers, Destinations};
