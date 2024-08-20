import { get, create, remove, getByID, edit } from './services/api.js';
import { validateFormAdd } from './validator.js';
import toast from './toast.js';
import { API } from './constants/api.js';
import { getElement, getAllElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const productList = getElement('.product-list');
const formMessage = getAllElement('.form-message');
const modal = getElement('.modal') as HTMLElement;
const modalContainer = getElement('.modal-container-add') as HTMLElement;
const modalDelete = getElement('.modal-delete') as HTMLElement;
const nameProduct = getElement('input[name ="name"]') as HTMLInputElement;
const price = getElement('input[name ="price"]') as HTMLInputElement;
const imgURL = getElement('input[name ="image"]') as HTMLInputElement;
const quantity = getElement('input[name ="quantity"]') as HTMLInputElement;
const confirmBtn = getElement('.btn-confirm') as HTMLElement;
const title = getElement('.modal-header') as HTMLElement;
const idProduct = getElement('#id-product') as HTMLElement;
// Toggle Modal : Modal delete product, Modal add product, Modal edit product

// Modal ADD
const showAddProductModal = () => {
  modal.classList.add('open');
  modalContainer.style.display = 'block';
  if (title) {
    title.textContent = 'Create a New Product';
  }

  // const formData: any = JSON.parse(localStorage.getItem('formData') ?? '');

  // nameProduct.value = formData.name;
  // imgURL.value = formData.image;
  // price.value = formData.price;
  // quantity.value = formData.quantity;
};

const hideAddProductModal = () => {
  modal!.classList.remove('open');
  modalContainer.style.display = 'none';

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

// Modal DELETE
const showDeleteProductModal = (e: Event) => {
  const deleteBtn = (e.target as HTMLElement).closest(
    '.icon-delete'
  ) as HTMLElement;

  if (deleteBtn) {
    modal.classList.add('open');
    modalDelete.style.display = 'block';
    const index = deleteBtn.dataset.index;
    if (confirmBtn) {
      confirmBtn.dataset.index = index;
    }
  }
};

const hideDeleteProductModal = () => {
  modal!.classList.remove('open');
  modalDelete.style.display = 'none';
};

// Modal EDIT

const showEditProductModal = async (e: Event) => {
  const editBtn = (e.target as HTMLElement).closest(
    '.card-footer'
  ) as HTMLElement;

  if (editBtn) {
    const index = editBtn.dataset.index;

    const product = await getByID(
      handleGetFail,
      API.PRODUCTS_ENDPOINT,
      index || ''
    );

    nameProduct.value = product.name;
    imgURL.value = product.image;
    price.value = product.price;
    quantity.value = product.quantity;

    if (title) {
      title.textContent = 'Edit Product';
    }

    idProduct.dataset.index = index;
    modal.classList.add('open');
    modalContainer.style.display = 'block';
  }
};

const hideEditProductModal = () => {
  modal!.classList.remove('open');
  modalContainer.style.display = 'none';
  idProduct.removeAttribute('data-index');
  localStorage.removeItem('formData');
  nameProduct.value = '';
  imgURL.value = '';
  price.value = '';
  quantity.value = '';
};

// Handle show error, show success message when valid form

const showError = (input: HTMLInputElement, message: string) => {
  const parent = input.parentElement as HTMLElement;
  const formMessage = parent.querySelector('.form-message') as HTMLElement;

  parent.classList.add('invalid');
  formMessage.innerText = message;
};

const showSuccess = (input: HTMLInputElement) => {
  const parent = input.parentElement as HTMLElement;
  const formMessage = parent.querySelector('.form-message') as HTMLElement;

  parent.classList.remove('invalid');
  formMessage.innerText = '';
};

const handleShowError = (errors: Record<string, boolean>) => {
  const {
    isEmptyErrorName,
    isImgUrlError,
    isNumberIntError,
    isNumberDecError,
    isEmptyErrorPrice,
    isEmptyErrorQuantity,
    isEmptyErrorImg,
  } = errors;

  if (isEmptyErrorImg) {
    showError(imgURL, MESSAGE.EMPTY_ERROR);
  } else if (isImgUrlError) {
    showError(imgURL, MESSAGE.IMG_URL_ERROR);
  } else {
    showSuccess(imgURL);
  }

  if (isEmptyErrorQuantity) {
    showError(quantity, MESSAGE.EMPTY_ERROR);
  } else if (isNumberIntError) {
    showError(quantity, MESSAGE.NUMBER_INTEGER_ERROR);
  } else {
    showSuccess(quantity);
  }

  if (isEmptyErrorPrice) {
    showError(price, MESSAGE.EMPTY_ERROR);
  } else if (isNumberDecError) {
    showError(price, MESSAGE.NUMBER_DECIMAL_ERROR);
  } else {
    showSuccess(price);
  }

  if (isEmptyErrorName) {
    {
      showError(nameProduct, MESSAGE.EMPTY_ERROR);
    }
  } else {
    showSuccess(nameProduct);
  }

  // handle show error/show success
};

// Show list products

const handleGetFail = () => {
  toast(MESSAGE.GET_FAIL, 'failed');
};

const renderProductItem = (food: Record<string, string>) => {
  return `
            <div class="card card-product data-card-id-${food.id}">
                                <div class="card-header">
                                    <button class="icon-delete" data-index ="${food.id}" >&#9747;</button>
                                </div>
    
                                <div class="card-main">
                                    <img src="${food.image}" alt="default image" class="img-product" onerror="src='https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'" />
                                    <div class="desc-product">
                                        <p class="name-product">${food.name}</p>
                                        <span class="price-product">$ ${food.price}</span>
                                        <span class="dot">&#8226</span>
                                        <span class="quantity-product">${food.quantity} bowls</span>
                                    </div>
                                </div>
                                <div class="card-footer" data-index= "${food.id}">
                                        <p class="text-edit">Edit dish</p>
                                </div>
                    </div>
            `;
};

const renderFoods = (foods: Array<Record<string, string>>) => {
  const cardProducts = foods.map(renderProductItem);

  productList!.innerHTML = cardProducts.join('');
};

const loadProductList = async () => {
  const products = await get(handleGetFail, API.PRODUCTS_ENDPOINT);

  renderFoods(products);
};

// Handle Add product, Edit product

const handleAddFail = () => {
  toast(MESSAGE.ADD_FAIL, 'failed');
};

const handleEditFail = () => {
  toast(MESSAGE.EDIT_FAIL, 'failed');
};

const handleEditSuccess = (food: Record<string, string>) => {
  hideEditProductModal();
  toast(MESSAGE.EDIT_SUCCESS, 'success');
  const editItem = renderProductItem(food);
  const productItem = getElement('.data-card-id-' + food.id) as HTMLElement;
  productItem!.innerHTML = editItem;
};

const handleAddSuccess = (food: Record<string, string>) => {
  const newItem = renderProductItem(food);
  productList!.innerHTML += newItem;
  hideAddProductModal();

  localStorage.removeItem('formData');
  nameProduct.value = '';
  imgURL.value = '';
  price.value = '';
  quantity.value = '';

  toast(MESSAGE.ADD_SUCCESS, 'success');
};

const handleAddProduct = (e: Event) => {
  e.preventDefault();

  const errors = validateFormAdd();

  const isValid = Object.values(errors).every((value) => value === false);

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const index = idProduct.dataset.index as string;

    interface FormDataObject {
      [key: string]: any;
    }

    const formDataObject: FormDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    if (!idProduct.dataset.index) {
      create(
        formDataObject,
        handleAddSuccess,
        handleAddFail,
        API.PRODUCTS_ENDPOINT
      );
    } else {
      edit(
        formDataObject,
        handleEditSuccess,
        handleEditFail,
        API.PRODUCTS_ENDPOINT,
        index
      );
    }
  } else {
    handleShowError(errors);
  }
};

// Handle Delete Product

const handleDeleteFail = () => {
  toast(MESSAGE.DELETE_FAIL, 'failed');
};

const handleDeleteSuccess = (data: Record<string, string>) => {
  hideDeleteProductModal();
  const productItem = getElement('.data-card-id-' + data.id);
  if (productItem) {
    productItem.remove();
  }
  toast(MESSAGE.DELETE_SUCCESS, 'success');
};

const handleDeleteProduct = () => {
  const index = confirmBtn.getAttribute('data-index');
  remove(
    handleDeleteSuccess,
    handleDeleteFail,
    API.PRODUCTS_ENDPOINT,
    index || ''
  );
};

export {
  loadProductList,
  showAddProductModal,
  hideAddProductModal,
  showDeleteProductModal,
  hideDeleteProductModal,
  showEditProductModal,
  hideEditProductModal,
  handleAddProduct,
  handleDeleteProduct,
  productList,
  nameProduct,
  imgURL,
  price,
  quantity,
  showSuccess,
  showError,
};
