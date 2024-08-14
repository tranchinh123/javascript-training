import { get, create } from './services/api.js';
import { validateFormAdd } from './validator.js';
import toast from './toast.js';
import { API } from './constants/api.js';
import { getElement, getAllElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const productList = getElement('.product-list');
const formMessage = getAllElement('.form-message');
const modal = getElement('.modal') as HTMLElement;
const modalContainer = getElement('.modal-container-add') as HTMLElement;
const nameProduct = getElement('input[name ="name"]') as HTMLInputElement;
const price = getElement('input[name ="price"]') as HTMLInputElement;
const imgURL = getElement('input[name ="image"]') as HTMLInputElement;
const quantity = getElement('input[name ="quantity"]') as HTMLInputElement;

// Toggle Modal AddProduct

const showAddProductModal = () => {
  modal.classList.add('open');
  modalContainer.style.display = 'block';

  const formData = JSON.parse(localStorage.getItem('formData') ?? '{}');
  nameProduct.value = formData.name;
  imgURL.value = formData.image;
  price.value = formData.price;
  quantity.value = formData.quantity;
};

const hideAddProductModal = () => {
  modal!.classList.remove('open');

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
const handleGetFail = () => {
  toast(MESSAGE.GET_FAIL, 'failed');
};

const renderProductItem = (food: Record<string, any>) => {
  return `
            <div class="card card-product" data-card-id = "${food.id}">
                                <div class="card-header">
                                    <button class="icon-delete" data-icon-id ="${food.id}" >&#9747;</button>
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
                                <div class="card-footer">
                                        <img src="./assets/icons/Edit.svg" alt="Show icon edit">
                                        <p class="text-edit">Edit dish</p>
                                </div>
                    </div>
            `;
};

const renderFoods = (foods: Array<Record<string, any>>) => {
  const cardProducts = foods.map(renderProductItem);

  productList!.innerHTML = cardProducts.join('');
};

const loadProductList = async () => {
  const products = await get(handleGetFail, API.PRODUCTS_ENDPOINT);

  renderFoods(products);
};

// Add product
const handleAddFail = () => {
  toast(MESSAGE.ADD_FAIL, 'failed');
};

const handleAddSuccess = (food: Record<string, any>) => {
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
// handle show error, show success message
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

const handleShowError = (errors: any) => {
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

const handleAddProduct = (e: Event) => {
  e.preventDefault();
  const errors = validateFormAdd();

  const isValid = Object.values(errors).every((value) => value === false);

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    interface FormDataObject {
      [key: string]: any;
    }
    const formDataObject: FormDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    create(
      formDataObject,
      handleAddSuccess,
      handleAddFail,
      API.PRODUCTS_ENDPOINT
    );
  } else {
    handleShowError(errors);
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
  showSuccess,
  showError,
};
