import { get } from '../services/apiService.js';
import { create } from '../services/apiService.js';
import { validateForm } from './validator.js';
import toast from './toast.js';
import { urlAPI } from '../constants/apiUrl.js';

const productList = document.querySelector('.product-list');
const formMessage = document.querySelectorAll('.form-message');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container-add');
const nameProduct = document.querySelector('input[name ="name-product"]');
const price = document.querySelector('input[name ="price-product"]');
const imgURL = document.querySelector('input[name ="img-product"]');
const quantity = document.querySelector('input[name ="quantity-product"]');

// Toggle Modal AddProduct

const showAddProductModal = () => {
	modal.classList.add('open');
	modalContainer.style.display = 'block';
	const formData = JSON.parse(localStorage.getItem('formData'));
	nameProduct.value = formData.name;
	imgURL.value = formData.image;
	price.value = formData.price;
	quantity.value = formData.quantity;
};

const hideAddProductModal = () => {
	modal.classList.remove('open');
	const formData = {
		name: nameProduct.value,
		image: imgURL.value,
		price: price.value,
		quantity: quantity.value,
	};
	localStorage.setItem('formData', JSON.stringify(formData));
	formMessage.forEach((message) => {
		message.innerHTML = '';
	});
};

// Show list products

const renderProductItem = (food) => {
	return `
            <div class="card card-product card-id-${food.id}">
                                <div class="card-header">
                                    <button class="icon-delete icon-id-${food.id}" >&#9747;</button>
                                </div>
    
                                <div class="card-main">
                                    <img src="${food.image}" alt="default image" class="img-product" onerror="this.src='https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'" />
                                    <div class="desc-product">
                                        <p class="name-product">${food.name}</p>
                                        <span class="price-product">$ ${food.price}</span>
                                        <span class="dot">&#8226</span>
                                        <span class="quantity-product">${food.quantity} bowls</span>
                                    </div>
                                </div>
                                <div class="card-footer">
                                        <img src="./assets/icons/Vector.svg" alt="">
                                        <p class="text-edit">Edit dish</p>
                                </div>
                    </div>
            `;
};

const renderFoods = (foods) => {
	const cardProducts = foods.map(renderProductItem);

	productList.innerHTML = cardProducts.join('');
};

const loadProductList = async () => {
	const products = await get(urlAPI.PRODUCTS_ENDPOINT);
	renderFoods(products);
};

// Add product
const handleAddSuccess = (food) => {
	const newItem = renderProductItem(food);

	productList.innerHTML += newItem;
	hideAddProductModal();
	localStorage.removeItem('formData');
	nameProduct.value = '';
	imgURL.value = '';
	price.value = '';
	quantity.value = '';
};

const handleAddProduct = (e) => {
	e.preventDefault();
	const name = document.querySelector('input[name ="name-product"]').value;

	const price = document.querySelector('input[name ="price-product"]').value;

	const imgURL = document.querySelector('input[name ="img-product"]').value;

	const quantity = document.querySelector(
		'input[name ="quantity-product"]'
	).value;
	const formData = {
		name: name,
		price: price,
		image: imgURL,
		quantity: quantity,
	};

	const isValid = validateForm();
	if (isValid) {
		create(formData, handleAddSuccess, urlAPI.PRODUCTS_ENDPOINT);
		toast({ message: 'Add Successfully!', type: 'success' });
	} else {
		toast({ message: 'Add Failed!', type: 'failed' });
	}
};

export {
	loadProductList,
	showAddProductModal,
	hideAddProductModal,
	handleAddProduct,
	nameProduct,
	imgURL,
	price,
	quantity,
};
