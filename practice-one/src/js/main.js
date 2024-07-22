import {
	showAddProductModal,
	hideAddProductModal,
	loadProductList,
	handleAddProduct,
} from './dom.js';
import { imgURL, price, quantity, nameProduct } from './dom.js';
import {
	showSuccess,
	showError,
	checkImgUrlError,
	checkIsDecimalError,
	checkIsNumberIntegerError,
} from './validator.js';
// query DOM

const cardAdd = document.querySelector('.card-add');
const cancelBtn = document.querySelector('.btn-cancel');
const modal = document.querySelector('.modal');
const createButton = document.querySelector('.btn-save');
const modalContainer = document.querySelector('.modal-container');

// Handle show product list

const bindEvents = () => {
	cardAdd.addEventListener('click', showAddProductModal);
	cancelBtn.addEventListener('click', hideAddProductModal);
	modal.addEventListener('click', hideAddProductModal);
	createButton.addEventListener('click', handleAddProduct);
	modalContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});
	//Event on blur input form
	const listInput = [nameProduct, price, imgURL, quantity];

	listInput.forEach((input) => {
		input.value = input.value.trim();

		input.addEventListener('blur', () => {
			if (!input.value) {
				showError(input, ' The field cannot be empty.');
			} else {
				showSuccess(input);
			}
		});
	});
	price.addEventListener('blur', () => {
		price.value = price.value.trim();
		checkIsDecimalError(price);
	});
	imgURL.addEventListener('blur', () => {
		imgURL.value = imgURL.value.trim();
		checkImgUrlError(imgURL);
	});
	quantity.addEventListener('blur', () => {
		quantity.value = quantity.value.trim();
		checkIsNumberIntegerError(quantity);
	});
	// Event oninput input form
	listInput.forEach((input) => {
		input.addEventListener('input', () => {
			showSuccess(input);
		});
	});
};

const initApp = () => {
	bindEvents();
	loadProductList();
};
initApp();
