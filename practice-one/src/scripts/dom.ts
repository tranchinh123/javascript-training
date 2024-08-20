import { get, create, remove, getByID, edit } from './services/api.js';
import { validateFormAdd } from './validator.js';
import { toast, ToastType } from './toast.js';
import { API } from './constants/api.js';
import { getElement, getAllElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const productListEle = getElement('.product-list');
const formMessageEle = getAllElement('.form-message');
const modalEle = getElement('.modal') as HTMLElement;
const modalContainerEle = getElement('.modal-container-add') as HTMLElement;
const modalDeleteEle = getElement('.modal-delete') as HTMLElement;
const confirmBtnEle = getElement('.btn-confirm') as HTMLElement;
const titleEle = getElement('.modal-header') as HTMLElement;
const productIdEle = getElement('#id-product') as HTMLElement;
const nameProduct = getElement('input[name ="name"]') as HTMLInputElement;
const price = getElement('input[name ="price"]') as HTMLInputElement;
const imgURL = getElement('input[name ="image"]') as HTMLInputElement;
const quantity = getElement('input[name ="quantity"]') as HTMLInputElement;

interface Product {
  name: string;
  image: string;
  price: string;
  quantity: string;
  id?: string;
}

const resetForm = () => {
  localStorage.removeItem('formData');

  nameProduct.value = '';
  imgURL.value = '';
  price.value = '';
  quantity.value = '';
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

  nameProduct.value = formData.name;
  imgURL.value = formData.image;
  price.value = formData.price;
  quantity.value = formData.quantity;
};

const hideAddProductModal = () => {
  modalEle!.classList.remove('open');
  modalContainerEle.style.display = 'none';

  const formData: Product = {
    name: nameProduct.value,
    image: imgURL.value,
    price: price.value,
    quantity: quantity.value,
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
  modalContainerEle!.classList.remove('open');
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

    nameProduct.value = product?.name || '';
    imgURL.value = product?.image || '';
    price.value = product?.price || '';
    quantity.value = product?.quantity || '';

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
  nameProduct.value = '';
  imgURL.value = '';
  price.value = '';
  quantity.value = '';

  toast(MESSAGE.ADD_SUCCESS, ToastType.Success);
};

const handleAddProduct = (e: Event) => {
  e.preventDefault();

  const errors = validateFormAdd();

  const isValid = Object.values(errors).every((value) => value === false);

  const formData = new FormData(e.target as HTMLFormElement);

  const productId = productIdEle.dataset.index as string;

  if (isValid) {
    interface FormDataObject {
      [key: string]: string | File;
      name: string;
      image: string;
      price: string;
      quantity: string;
      id: string;
    }

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
  nameProduct,
  imgURL,
  price,
  quantity,
  showSuccess,
  showError,
};
