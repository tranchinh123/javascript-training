export enum ToastType {
  Failed = 'failed',
  Success = 'success',
}

export interface Product {
  name: string;
  image: string;
  price: string;
  quantity: string;
  id: string;
}

export interface FormDataObject {
  [key: string]: string | File;
  name: string;
  image: string;
  price: string;
  quantity: string;
  id: string;
}
