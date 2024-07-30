// Helper function to query DOM elements
const getElement = (selector) => {
  return document.querySelector(selector);
};
// Helper function to query all matching DOM elements
const getAllElement = (selector) => {
  return document.querySelectorAll(selector);
};

export { getAllElement, getElement };
