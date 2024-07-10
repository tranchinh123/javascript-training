const cardAdd = document.querySelector('.card-add');
const modal = document.querySelector('.modal');
const cancelBtn = document.querySelector('.btn-cancel');
const modalContainer = document.querySelector('.modal-container');
function showAddProductModal() {
	modal.classList.add('open');
}
function hideAddProductModal() {
	modal.classList.remove('open');
}
cardAdd.addEventListener('click', showAddProductModal);
cancelBtn.addEventListener('click', hideAddProductModal);
modal.addEventListener('click', hideAddProductModal);
modalContainer.addEventListener('click', (e) => {
	e.stopPropagation();
});

function start() {
	getProducts(renderFoods);
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

function renderFoods(foods) {
	const productList = document.querySelector('.product-list');
	var htmls = foods.map(function (food) {
		return `
		<div class="card card-product">
							<div class="card-header">
								<span class="icon-delete">&#9747;</span>
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
	productList.innerHTML = htmls.join('');
}
