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
