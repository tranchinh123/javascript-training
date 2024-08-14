import { API } from '../constants/api.js';

const get = async (onError: () => void, endPoint: string) => {
  try {
    const response = await fetch(`${API.BASE_URL}${endPoint}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return onError();
    }
  } catch (error) {
    console.error('Something went wrong ');
  }
};

const create = async (
  data: {},
  onSuccess: (data: any) => void,
  onError: () => void,
  endPoint: string
) => {
  try {
    const response = await fetch(`${API.BASE_URL}${endPoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return onSuccess(data);
    } else {
      return onError();
    }
  } catch (error) {
    console.error('Something went wrong');
  }
};

export { get, create };
