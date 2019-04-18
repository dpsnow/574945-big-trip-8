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
  const filterElements = [];

  filtersData.forEach((data) => {
    const filter = new Filter(data);
    filter.render();
    filterElements.push(filter.element);
  });

  // console.log(filterElements);
  renderElements(filtersContainer, filterElements);
};

export {renderFilters};
