import { get, create, remove, getByID, edit } from './services/api.js';
import { validateFormAdd } from './validator.js';
import { toast } from './toast.js';
import { ToastType, Product, FormDataObject } from './types/types.js';
import { API } from './constants/api.js';
import { getElement, getAllElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const productListEle = getElement('.product-list');
const formMessageEle = getAllElement('.form-message');
const modalEle = getElement('.modal') as HTMLElement;
const modalContainerEle = getElement('.modal-container') as HTMLElement;
const modalDeleteEle = getElement('.modal-delete') as HTMLElement;
const confirmBtnEle = getElement('.btn-confirm') as HTMLElement;
const titleEle = getElement('.modal-header') as HTMLElement;
const productIdEle = getElement('#id-product') as HTMLElement;

const nameProductEle = getElement('input[name ="name"]') as HTMLInputElement;
const priceEle = getElement('input[name ="price"]') as HTMLInputElement;
const imgURLEle = getElement('input[name ="image"]') as HTMLInputElement;
const quantityEle = getElement('input[name ="quantity"]') as HTMLInputElement;

const resetForm = () => {
  localStorage.removeItem('formData');

  nameProductEle.value = '';
  imgURLEle.value = '';
  priceEle.value = '';
  quantityEle.value = '';
};

// Toggle Modal : Modal delete product, Modal add product, Modal edit product

// Modal ADD
const showAddProductModal = () => {
  modalEle.classList.add('open');
  modalContainerEle.style.display = 'block';
  if (titleEle) {
    titleEle.textContent = 'Create a New Product';
  }

  const formData: Product = JSON.parse(localStorage.getItem('formData') ?? '');

  nameProductEle.value = formData.name;
  imgURLEle.value = formData.image;
  priceEle.value = formData.price;
  quantityEle.value = formData.quantity;
};

const hideAddProductModal = () => {
  modalEle!.classList.remove('open');
  modalContainerEle.style.display = 'none';

  const formData: Product = {
    name: nameProductEle.value,
    image: imgURLEle.value,
    price: priceEle.value,
    quantity: quantityEle.value,
  };

  localStorage.setItem('formData', JSON.stringify(formData));
  formMessageEle.forEach((message) => {
    message.innerHTML = '';
  });
};

// Modal DELETE
const showDeleteProductModal = (e: Event) => {
  const deleteBtn = (e.target as HTMLElement).closest(
    '.icon-delete'
  ) as HTMLElement;

  if (deleteBtn) {
    modalEle.classList.add('open');
    modalDeleteEle.style.display = 'block';
    const productId = deleteBtn.dataset.index;
    if (confirmBtnEle) {
      confirmBtnEle.dataset.index = productId;
    }
  }
};

const hideDeleteProductModal = () => {
  modalEle!.classList.remove('open');
  modalDeleteEle.style.display = 'none';
};

// Modal EDIT

const showEditProductModal = async (e: Event) => {
  const editBtn = (e.target as HTMLElement).closest(
    '.card-footer'
  ) as HTMLElement;

  if (editBtn) {
    const productId = editBtn.dataset.index;

    const product = await getByID(
      handleGetProductFailed,
      API.PRODUCTS_ENDPOINT,
      productId || ''
    );

    nameProductEle.value = product?.name || '';
    imgURLEle.value = product?.image || '';
    priceEle.value = product?.price || '';
    quantityEle.value = product?.quantity || '';

    if (titleEle) {
      titleEle.textContent = 'Edit Product';
    }

    productIdEle.dataset.index = productId;
    modalEle.classList.add('open');
    modalContainerEle.style.display = 'block';
  }
};

const hideEditProductModal = () => {
  modalEle!.classList.remove('open');
  modalContainerEle.style.display = 'none';
  productIdEle.removeAttribute('data-index');
  resetForm();
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

  switch (true) {
    case isEmptyErrorImg:
      showError(imgURLEle, MESSAGE.EMPTY_ERROR);
      break;
    case isImgUrlError:
      showError(imgURLEle, MESSAGE.IMG_URL_ERROR);
      break;
    default:
      showSuccess(imgURLEle);
      break;
  }

  switch (true) {
    case isEmptyErrorQuantity:
      showError(quantityEle, MESSAGE.EMPTY_ERROR);
      break;
    case isNumberIntError:
      showError(quantityEle, MESSAGE.NUMBER_INTEGER_ERROR);
      break;
    default:
      showSuccess(quantityEle);
      break;
  }

  switch (true) {
    case isEmptyErrorPrice:
      showError(priceEle, MESSAGE.EMPTY_ERROR);
      break;
    case isNumberDecError:
      showError(priceEle, MESSAGE.NUMBER_DECIMAL_ERROR);
      break;
    default:
      showSuccess(priceEle);
      break;
  }

  switch (true) {
    case isEmptyErrorName:
      showError(nameProductEle, MESSAGE.EMPTY_ERROR);
      break;
    default:
      showSuccess(nameProductEle);
      break;
  }
};

// Handle get products and render Dom

const handleGetProductFailed = () => {
  toast(MESSAGE.GET_FAIL, ToastType.Failed);
};

const renderProductItem = (food: Product) => {
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

const renderFoods = (foods: Array<Product>) => {
  const cardProducts = foods.map(renderProductItem);

  productListEle!.innerHTML = cardProducts.join('');
};

const loadProductList = async () => {
  const products =
    (await get(handleGetProductFailed, API.PRODUCTS_ENDPOINT)) ?? [];

  renderFoods(products);
};

// Handle Add product, Edit product

const handleAddProductFailed = () => {
  toast(MESSAGE.ADD_FAIL, ToastType.Failed);
};

const handleEditProductFailed = () => {
  toast(MESSAGE.EDIT_FAIL, ToastType.Failed);
};

const handleEditProductSuccess = (food: Product) => {
  hideEditProductModal();

  toast(MESSAGE.EDIT_SUCCESS, ToastType.Success);

  const editItem = renderProductItem(food);
  const productItem = getElement('.data-card-id-' + food.id) as HTMLElement;
  productItem!.innerHTML = editItem;
};

const handleAddProductSuccess = (food: Product) => {
  const newItem = renderProductItem(food);

  productListEle!.innerHTML += newItem;

  hideAddProductModal();

  localStorage.removeItem('formData');

  nameProductEle.value = '';
  imgURLEle.value = '';
  priceEle.value = '';
  quantityEle.value = '';

  toast(MESSAGE.ADD_SUCCESS, ToastType.Success);
};

const handleAddProduct = (e: Event) => {
  e.preventDefault();

  const errors = validateFormAdd();

  const isValid = Object.values(errors).every((value) => value === false);

  const formData = new FormData(e.target as HTMLFormElement);

  const productId = productIdEle.dataset.index as string;

  if (isValid) {
    const formDataObject: FormDataObject = {
      name: '',
      image: '',
      price: '',
      quantity: '',
      id: '',
    };

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    if (!productId) {
      create(
        formDataObject,
        handleAddProductSuccess,
        handleAddProductFailed,
        API.PRODUCTS_ENDPOINT
      );
    } else {
      edit(
        formDataObject,
        handleEditProductSuccess,
        handleEditProductFailed,
        API.PRODUCTS_ENDPOINT,
        productId
      );
    }
  } else {
    handleShowError(errors);
  }
};

// Handle Delete Product

const handleDeleteProductFail = () => {
  toast(MESSAGE.DELETE_FAIL, ToastType.Success);
};

const handleDeleteProductSuccess = (data: Product) => {
  hideDeleteProductModal();

  const productItem = getElement('.data-card-id-' + data.id);

  if (productItem) {
    productItem.remove();
  }

  toast(MESSAGE.DELETE_SUCCESS, ToastType.Success);
};

const handleDeleteProduct = () => {
  const productId = confirmBtnEle.getAttribute('data-index');

  remove(
    handleDeleteProductSuccess,
    handleDeleteProductFail,
    API.PRODUCTS_ENDPOINT,
    productId || ''
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
  productListEle,
  nameProductEle,
  imgURLEle,
  priceEle,
  quantityEle,
  showSuccess,
  showError,
};
