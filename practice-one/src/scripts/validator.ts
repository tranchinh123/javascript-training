import { imgURLEle, priceEle, quantityEle, nameProductEle } from './dom.js';

const checkEmptyError = (input: HTMLInputElement): boolean => {
  input.value = input.value.trim();
  return !input.value ? true : false;
};

const checkImgUrlError = (input: HTMLInputElement): boolean => {
  const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
  input.value = input.value.trim();
  return regexImgUrl.test(input.value) ? false : true;
};

const checkIsNumberIntegerError = (input: HTMLInputElement): boolean => {
  input.value = input.value.trim();
  const numberInt = Number(input.value);
  return Number.isInteger(numberInt) && numberInt > 0 ? false : true;
};

const checkIsDecimalError = (input: HTMLInputElement): boolean => {
  input.value = input.value.trim();
  const numberDec = Number(input.value);
  return !isNaN(numberDec) && numberDec > 0 ? false : true;
};

const validateFormAdd = () => {
  const isImgUrlError = checkImgUrlError(imgURLEle);
  const isEmptyErrorImg = checkEmptyError(imgURLEle);
  const isNumberIntError = checkIsNumberIntegerError(quantityEle);
  const isEmptyErrorQuantity = checkEmptyError(quantityEle);
  const isNumberDecError = checkIsDecimalError(priceEle);
  const isEmptyErrorPrice = checkEmptyError(priceEle);
  const isEmptyErrorName = checkEmptyError(nameProductEle);

  return {
    isEmptyErrorName,
    isImgUrlError,
    isNumberIntError,
    isNumberDecError,
    isEmptyErrorPrice,
    isEmptyErrorQuantity,
    isEmptyErrorImg,
  };
};

export {
  validateFormAdd,
  checkEmptyError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
};
