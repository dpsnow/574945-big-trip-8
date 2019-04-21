export const getTemplate = (filterParam) => {
  return `
  <span>
    <input
      type="radio"
      id="filter-${filterParam._name}"
      name="filter" value="${filterParam._name}"
      ${filterParam._checked ? `checked` : ``} />
    <label class="trip-filter__item" for="filter-${filterParam._name}">
      ${filterParam._name}
    </label>
  </span>`;
};
