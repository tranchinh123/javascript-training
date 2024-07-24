import { urlAPI } from '../constants/apiUrl.js';

const get = async (endPoint) => {
	try {
		const response = await fetch(`${urlAPI.BASE_URL}${endPoint}`, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		});
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

const create = async (data, callback, endPoint) => {
	try {
		const response = await fetch(`${urlAPI.BASE_URL}${endPoint}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
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

export { get, create };
