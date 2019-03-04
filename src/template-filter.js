function createFilter(filterParam) {
  return `
  <input
    type="radio"
    id="filter-${filterParam.name}"
    name="filter" value="${filterParam.name}"
    ${filterParam.checked ? `checked` : ``} />
  <label class="trip-filter__item" for="filter-${filterParam.name}">
    ${filterParam.name}
  </label>`;
}

export {createFilter};
