import {renderElements} from './utils.js';
import {Filter} from '../filters/filter.js';
import {filtersData} from '../trip-constants.js';

const renderFilters = (filtersContainer) => {
  const filters = [];
  filtersData.forEach((data) => {
    const filter = new Filter(data);
    filter.render();
    filters.push(filter.element);
  });
  renderElements(filtersContainer, filters);
};

export {renderFilters};
