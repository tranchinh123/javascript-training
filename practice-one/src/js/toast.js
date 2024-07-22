const main = document.getElementById('toast');
const toast = ({ message, type }) => {
	const toast = document.createElement('div');
	if (main) {
		toast.classList.add('toast', `toast-${type}`);
		toast.innerHTML = `
							<img
								class="toast-icon"
								src="./assets/icons/checkmark-circle.svg"
								alt=""
							/>
							<p class="toast-msg">${message}</p>
						`;
		main.appendChild(toast);
		setTimeout(() => {
			main.removeChild(toast);
		}, 4000);
	}
};

export default toast;
