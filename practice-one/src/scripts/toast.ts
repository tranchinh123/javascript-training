import { getElement } from './helpers/queryDOM.js';
import { ToastType } from './types/types.js';
const toastEle = getElement('#toast');

const toast = (message: string, type: ToastType): void => {
  if (toastEle) {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.innerHTML = `
							<p class="toast-msg">${message}</p>
						`;
    toastEle.appendChild(toast);
    setTimeout(() => {
      toastEle.removeChild(toast);
    }, 4000);
  }
};

export { toast };
