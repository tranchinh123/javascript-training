// query DOM
const productList = document.querySelector('.product-list');
const cardAdd = document.querySelector('.card-add');
const modal = document.querySelector('.modal');
const cancelBtn = document.querySelector('.btn-cancel');
const modalContainer = document.querySelector('.modal-container');
const createButton = document.querySelector('.btn-save');
//...

const showAddProductModal = () => {
	modal.classList.add('open');
};
const hideAddProductModal = () => {
	modal.classList.remove('open');
};

const renderProductItem = (food) => {
	return `
            <div class="card card-product card-id-${food.id}">
                                <div class="card-header">
                                    <button class="icon-delete icon-id-${food.id}" onclick="handleDeleteProduct(${food.id})">&#9747;</button>
                                </div>
    
                                <div class="card-main">
                                    <img src="${food.image}" alt="default image" class="img-product" />
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

const handleAddSuccess = (food) => {
	const newItem = renderProductItem(food);

	productList.innerHTML += newItem;
	hideAddProductModal();
};

// validate form
// const validateForm = (formData) => {
//     let isValid = false;

//     if (formData.name === "") {
//         isValid = false;
//     }
//     formData.name ok {
//         isValid = true
//     }
//     //

//     return isValid
// }

function handleAddProduct(e) {
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

	createProduct(formData, handleAddSuccess);
	// const isValid = validateForm(formData);

	// if (isValid) {
	//     createProduct(formData, handleAddSuccess);
	// } else {

	// }
}

const bindEvents = () => {
	cardAdd.addEventListener('click', showAddProductModal);
	cancelBtn.addEventListener('click', hideAddProductModal);
	modal.addEventListener('click', hideAddProductModal);

	createButton.addEventListener('click', handleAddProduct);
	modalContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});
};

//APIs => return product list
const getProducts = async () => {
	try {
		const response = await fetch(
			'https://5f7c244700bd74001690a4a7.mockapi.io/products',
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
		// toast message
		console.error('Something went wrong ', error);
	}
};

const createProduct = async (data, callback) => {
	try {
		const response = await fetch(
			'https://5f7c244700bd74001690a4a7.mockapi.io/products',
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

const renderFoods = (foods) => {
	const cardProduct = foods.map(renderProductItem);

	productList.innerHTML = cardProduct.join('');
};

const handleDeleteProduct = async (id) => {
	try {
		const response = await fetch(
			`https://5f7c244700bd74001690a4a7.mockapi.io/products/${id}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			const cardItem = document.querySelector('.card-id-' + id);
			if (cardItem) {
				cardItem.remove();
			}
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong ', error);
	}
};

// Handle show product list
const loadProductList = async () => {
	const products = await getProducts();
	renderFoods(products);
};

const initApp = () => {
	bindEvents();
	loadProductList();
	handleDeleteProduct();
};
initApp();
