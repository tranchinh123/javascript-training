const getProducts = async (callback) => {
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
			return callback(data);
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong ', error);
	}
};

const renderFoods = (foods) => {
	const productList = document.querySelector('.product-list');
	const cardProduct = foods.map(function (food) {
		return `
			<div class="card card-product card-id-${food.id}">
								<div class="card-header">
									<button class="icon-delete icon-id-${food.id}" onclick="handleDeleteProduct(${food.id})">&#9747;</button>
								</div>
	
								<div class="card-main">
									<img src="${food.image}" alt="default image" class="img-product" onerror = "src='./assets/icons/default-featured-image.jpg'" />
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
	});
	productList.innerHTML = cardProduct.join('');
};

getProducts(renderFoods);
