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

const checkEmptyError = (listInput) => {
  let isEmptyError = false;

  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      isEmptyError = true;
      showError(input, MESSAGE.emptyError);
    } else {
      showSuccess(input);
    }
  });

  return isEmptyError;
};

const checkImgUrlError = (input) => {
  const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
  input.value = input.value.trim();
  const isImgUrlError = !regexImgUrl.test(input.value);

  if (regexImgUrl.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, MESSAGE.ImgUrlError);
  }

  return isImgUrlError;
};

const checkIsNumberIntegerError = (input) => {
  input.value = input.value.trim();
  const numberInt = Number(input.value);
  let isNumberIntError = false;

  if (Number.isInteger(numberInt) && numberInt > 0) {
    isNumberIntError = false;
    showSuccess(input);
  } else {
    isNumberIntError = true;
    showError(input, MESSAGE.NumberIntegerError);
  }

  return isNumberIntError;
};

const checkIsDecimalError = (input) => {
  input.value = input.value.trim();
  const numberDec = Number(input.value);
  let isNumberDecimalError = false;

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
  const isImgUrlError = checkImgUrlError(imgURL);
  const isNumberIntError = checkIsNumberIntegerError(quantity);
  const isNumberDecError = checkIsDecimalError(price);
  const isEmptyError = checkEmptyError([nameProduct, price, imgURL, quantity]);

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
