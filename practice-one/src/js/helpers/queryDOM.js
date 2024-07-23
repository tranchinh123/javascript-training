// Helper function to query DOM elements
function getElement(selector) {
	return document.querySelector(selector);
}
// Helper function to query all matching DOM elements
function getAllElement(selector) {
	return document.querySelectorAll(selector);
}
export { getAllElement, getElement };
