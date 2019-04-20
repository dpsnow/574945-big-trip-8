import {renderElements} from './utils.js';

import {Filter} from '../filters/filter.js';

const filtersData = [
  {
    name: `Everything`,
    checked: true,
  },
  {
    name: `Future`,
  },
  {
    name: `Past`,
  }
];


const renderFilters = (filtersContainer) => {
  const filtersElements = [];

  filtersData.forEach((data) => {
    const filter = new Filter(data);
    filter.render();
    filtersElements.push(filter.element);
  });

  // console.log(filterElements);
  renderElements(filtersContainer, filtersElements);
};

export {renderFilters};
