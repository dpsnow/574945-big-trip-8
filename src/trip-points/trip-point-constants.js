const Offers = {
  luggage: `Add luggage`,
  comfortClass: `Switch to comfort class`,
  meal: `Add meal`,
  seats: `Choose seats`,
  insurance: `Add insurance`,
  parking: `Parking`,
  fuel: `Add fuel`,
  cleaning: `Cleaning room`,
  ticket: `Add entrance ticket`,
  souvenirs: `Add souvenirs`,
  tips: `Tips`,
};

const typeTripPoint = {
  'taxi': {
    icon: `🚕`,
    text: `Taxi to`,
    offers: [`luggage`, `comfortClass`, `tips`]
  },
  'bus': {
    icon: `🚌`,
    text: `Bus to`,
    offers: [`luggage`, `comfortClass`, `meal`],
  },
  'train': {
    icon: `🚂`,
    text: `Train to`,
    offers: [`luggage`, `comfortClass`, `meal`],
  },
  'ship': {
    icon: `🛳️`,
    text: `Ship to`,
    offers: [`luggage`, `comfortClass`, `meal`]
  },
  'transport': {
    icon: `🚊`,
    text: `Transport to`,
    offers: [`luggage`, `comfortClass`]
  },
  'drive': {
    icon: `🚗`,
    text: `Drive to`,
    offers: [`insurance`, `fuel`, `parking`],
  },
  'flight': {
    icon: `✈️`,
    text: `Flight to`,
    offers: [`luggage`, `comfortClass`, `meal`, `seats`]
  },
  'sightseeing': {
    icon: `🏛️`,
    text: `Sightseeing to`,
    offers: [`ticket`, `souvenirs`],
  },
  'check-in': {
    icon: `🏨`,
    text: `Check-in`,
    offers: [`luggage`, `cleaning`],
  },
  'restaurant': {
    icon: `🍴`,
    text: `Restaurant in`,
    offers: [`tips`, `parking`],
  },
};

export {typeTripPoint, Offers};
