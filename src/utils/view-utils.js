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

export {showMsg, cleanNode};
