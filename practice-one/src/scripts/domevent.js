import {
  showAddProductModal,
  hideAddProductModal,
  handleAddProduct,
  imgURL,
  price,
  quantity,
  nameProduct,
} from './dom.js';
import {
  showSuccess,
  showError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
} from './validator.js';
import { getElement } from './helpers/queryDOM.js';

const cardAdd = getElement('.card-add');
const cancelBtn = getElement('.btn-cancel');
const createButton = getElement('.btn-save');
const modalContainerAdd = getElement('.modal-container-add');
const modal = getElement('.modal');

const bindEvents = () => {
  cardAdd.addEventListener('click', showAddProductModal);
  cancelBtn.addEventListener('click', hideAddProductModal);
  modal.addEventListener('click', hideAddProductModal);
  createButton.addEventListener('click', handleAddProduct);
  modalContainerAdd.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  //Event on blur input form
  const listInput = [nameProduct, price, imgURL, quantity];

  nameProduct.addEventListener('blur', () => {
    if (!nameProduct.value && nameProduct.value === '') {
      showError(nameProduct, ' The field cannot be empty.');
    }
  });

  price.addEventListener('blur', () => {
    if (!price.value && price.value === '') {
      showError(price, ' The field cannot be empty.');
    } else {
      checkIsDecimalError(price);
    }
  });

  imgURL.addEventListener('blur', () => {
    if (!imgURL.value && imgURL.value === '') {
      showError(imgURL, ' The field cannot be empty.');
    } else {
      checkImgUrlError(imgURL);
    }
  });

  quantity.addEventListener('blur', () => {
    if (!quantity.value && quantity.value === '') {
      showError(quantity, ' The field cannot be empty.');
    } else {
      checkIsNumberIntegerError(quantity);
    }
  });
  //Event on input form
  listInput.forEach((input) => {
    input.addEventListener('input', () => {
      showSuccess(input);
    });
  });
};

export { bindEvents };
