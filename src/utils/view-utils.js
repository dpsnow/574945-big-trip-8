const boxMsg = document.querySelector(`.box-msg`);

const showMsg = (msg, state = true) => {
  boxMsg.classList.toggle(`show`, state);
  boxMsg.textContent = msg;
};

const cleanNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const createOffers = (offers, id) => {
  // console.info(offers);
  if (!offers || !offers.length) {
    return `No avaliable offers`;
  }
  return offers.map((offer, index) => {
    return `
    <input class="point__offers-input visually-hidden" type="checkbox" id="${id}-${index}" name="offer" value="${offer.title}"
    ${offer.accepted ? `checked` : ``}>
    <label for="${id}-${index}" class="point__offers-label">
      <span class="point__offer-service">${offer.title || offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
    </label>
    `;
  }).join(``);
};

export {showMsg, cleanNode, createOffers};

