import { imgURL, price, quantity, nameProduct } from './dom.js';
import MESSAGE from './constants/message.js';

const showError = (input, message) => {
  const parent = input.parentElement;
  const formMessage = parent.querySelector('.form-message');

  parent.classList.add('invalid');
  formMessage.innerText = message;
};

const showSuccess = (input) => {
  const parent = input.parentElement;
  const formMessage = parent.querySelector('.form-message');

  parent.classList.remove('invalid');
  formMessage.innerText = '';
};

const checkEmptyError = (input) => {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
    showError(input, MESSAGE.emptyError);
  } else {
    showSuccess(input);
  }

  return isEmptyError;
};

const checkImgUrlError = (input, isRequired) => {
  const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
  input.value = input.value.trim();
  const isImgUrlError = !regexImgUrl.test(input.value);

  // Check empty
  if (isRequired && !input.value) {
    showError(input, 'The field cannot be empty.');
    return;
  }

  if (regexImgUrl.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, MESSAGE.ImgUrlError);
  }

  return isImgUrlError;
};

const checkIsNumberIntegerError = (input, isRequired) => {
  input.value = input.value.trim();
  const numberInt = Number(input.value);
  let isNumberIntError = false;

  // Check empty
  if (isRequired && !input.value) {
    showError(input, 'The field cannot be empty.');
    return;
  }

  if (Number.isInteger(numberInt) && numberInt > 0) {
    isNumberIntError = false;
    showSuccess(input);
  } else {
    isNumberIntError = true;
    showError(input, MESSAGE.NumberIntegerError);
  }

  return isNumberIntError;
};

const checkIsDecimalError = (input, isRequired) => {
  input.value = input.value.trim();
  const numberDec = Number(input.value);
  let isNumberDecimalError = false;
  // Check empty
  if (isRequired && !input.value) {
    showError(input, 'The field cannot be empty.');
    return;
  }

  if (!isNaN(numberDec) && numberDec > 0) {
    isNumberDecimalError = false;
    showSuccess(input);
  } else {
    isNumberDecimalError = true;
    showError(input, MESSAGE.NumberDecimalError);
  }

  return isNumberDecimalError;
};

const validateForm = () => {
  const isEmptyError = checkEmptyError(nameProduct);
  const isImgUrlError = checkImgUrlError(imgURL, true);
  const isNumberIntError = checkIsNumberIntegerError(quantity, true);
  const isNumberDecError = checkIsDecimalError(price, true);

  if (isEmptyError || isImgUrlError || isNumberIntError || isNumberDecError) {
    return false;
  } else {
    return true;
  }
};

export {
  validateForm,
  showSuccess,
  showError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
};
