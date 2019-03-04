const filters = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const tripPoints = [
  {
    icon: `🚕`,
    title: `Taxi to Airport`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Order UBER`,
        price: `20`
      },
      {
        name: `Upgrade to business`,
        price: `20`
      }
    ]
  },
  {
    icon: `✈`,
    title: `Flight to Geneva`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Upgrade to business`,
        price: `20`
      },
      {
        name: `Select meal`,
        price: `20`
      }
    ]
  },
  {
    icon: `🚗`,
    title: `Drive to Chamonix`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Rent a car`,
        price: `20`
      }
    ]
  },
  {
    icon: `🝨`,
    title: `Check into a hotel`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Add breakfast`,
        price: `20`
      }
    ]
  },
];


export {filters, tripPoints};
