function start() {
	getProducts(renderFoods);
	handleAddProduct();
	// handleDeleteProduct();
}
start();

function getProducts(callback) {
	fetch('https://5f7c244700bd74001690a4a7.mockapi.io/products', {
		method: 'GET',
		headers: { 'content-type': 'application/json' },
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then(callback);
}

function createProduct(data, callback) {
	fetch('https://5f7c244700bd74001690a4a7.mockapi.io/products', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then(callback);
}

function renderFoods(foods) {
	const productList = document.querySelector('.product-list');
	const cardProduct = foods.map(function (food) {
		return `
		<div class="card card-product card-id-${food.id}">
							<div class="card-header">
								<button class="icon-delete" onclick="handleDeleteProduct(${food.id})">&#9747;</button>
							</div>

							<div class="card-main">
								<img src="${food.image}" alt="" class="img-product" />
								<div class="desc-product">
									<p class="name-product">${food.name}</p>
									<span class="price-product">${food.price}</span>
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
	});
	productList.innerHTML = cardProduct.join('');
}

function handleAddProduct() {
	const createButton = document.querySelector('.btn-save');
	createButton.addEventListener('click', () => {
		const name = document.querySelector('input[name ="name-product"]').value;

		const price = document.querySelector('input[name ="price-product"]').value;

		const imgURL = document.querySelector('input[name ="img-product"]').value;
		console.log(imgURL);

		const quantity = document.querySelector(
			'input[name ="quantity-product"]'
		).value;
		const formData = {
			name: name,
			price: price,
			image: imgURL,
			quantity: quantity,
		};

		createProduct(formData, () => {
			getProducts(renderFoods);
		});
	});
}

function handleDeleteProduct(id) {
	fetch(`https://5f7c244700bd74001690a4a7.mockapi.io/products/${id}`, {
		method: 'DELETE',
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then(() => {
			const cardItem = document.querySelector('.card-id-' + id);
			if (cardItem) {
				cardItem.remove();
			}
		});
}
