import { urlAPI } from '../constants/apiUrl.js';

const getProducts = async () => {
	try {
		const response = await fetch(
			`${urlAPI.BASE_URL}${urlAPI.PRODUCTS_ENDPOINT}`,
			{
				method: 'GET',
				headers: { 'content-type': 'application/json' },
			}
		);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong ', error);
	}
};

const createProduct = async (data, callback) => {
	try {
		const response = await fetch(
			`${urlAPI.BASE_URL}${urlAPI.PRODUCTS_ENDPOINT}`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(data),
			}
		);
		if (response.ok) {
			const data = await response.json();
			return callback(data);
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong', error);
	}
};

const handleDeleteProduct = async (id) => {
	try {
		const response = await fetch(
			`${urlAPI.BASE_URL}${urlAPI.PRODUCTS_ENDPOINT}/${id}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			const cardItem = document.querySelector('.card-id-' + id);
			if (cardItem) {
				cardItem.remove();
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export { getProducts, createProduct, handleDeleteProduct };
