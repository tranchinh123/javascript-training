import {
  showAddProductModal,
  hideAddProductModal,
  showDeleteProductModal,
  hideDeleteProductModal,
  showEditProductModal,
  handleAddProduct,
  handleDeleteProduct,
  productListEle,
  imgURLEle,
  priceEle,
  quantityEle,
  nameProductEle,
  showSuccess,
  showError,
  hideEditProductModal,
} from './dom.js';
import {
  checkImgUrlError,
  checkEmptyError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
} from './validator.js';
import { getElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const cardAddEle = getElement('.card-add');
const cancelBtnEle = getElement('.btn-cancel');
const cancelBtnDeleteEle = getElement('.btn-cancel-delete');
const modalContainerAddEle = getElement('.modal-container');
const modalEle = getElement('.modal');
const formEle = getElement('#form-product');
const modalDeleteEle = getElement('.modal-delete');
const confirmBtnEle = getElement('.btn-confirm');
const listInputEle = [nameProductEle, priceEle, imgURLEle, quantityEle];

const bindEvents = () => {
  cardAddEle?.addEventListener('click', showAddProductModal);

  cancelBtnEle?.addEventListener('click', hideAddProductModal);

  cancelBtnEle?.addEventListener('click', hideEditProductModal);

  cancelBtnDeleteEle?.addEventListener('click', hideDeleteProductModal);

  modalEle?.addEventListener('click', hideAddProductModal);

  modalEle?.addEventListener('click', hideEditProductModal);

  modalEle?.addEventListener('click', hideDeleteProductModal);

  formEle?.addEventListener('submit', handleAddProduct);

  modalContainerAddEle?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  modalDeleteEle?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  confirmBtnEle?.addEventListener('click', handleDeleteProduct);

  productListEle?.addEventListener('click', showEditProductModal);

  productListEle?.addEventListener('click', showDeleteProductModal);
  //Event on blur input form

  nameProductEle?.addEventListener('blur', () => {
    if (checkEmptyError(nameProductEle)) {
      showError(nameProductEle, MESSAGE.EMPTY_ERROR);
    }
  });

  priceEle.addEventListener('blur', () => {
    if (priceEle.value.trim() === '') {
      showError(priceEle, MESSAGE.EMPTY_ERROR);
    } else if (checkIsDecimalError(priceEle)) {
      showError(priceEle, MESSAGE.NUMBER_DECIMAL_ERROR);
    }
  });

  imgURLEle.addEventListener('blur', () => {
    if (imgURLEle.value.trim() === '') {
      showError(imgURLEle, MESSAGE.EMPTY_ERROR);
    } else if (checkImgUrlError(imgURLEle)) {
      showError(imgURLEle, MESSAGE.IMG_URL_ERROR);
    }
  });

  quantityEle.addEventListener('blur', () => {
    if (quantityEle.value.trim() === '') {
      showError(quantityEle, MESSAGE.EMPTY_ERROR);
    } else if (checkIsNumberIntegerError(quantityEle)) {
      showError(quantityEle, MESSAGE.NUMBER_INTEGER_ERROR);
    }
  });

  //Event on input form
  listInputEle.forEach((input) => {
    input.addEventListener('input', () => {
      showSuccess(input);
    });
  });
};

export { bindEvents };
