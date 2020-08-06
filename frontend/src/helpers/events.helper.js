const whenPressEnter = (callback) => (event) => {
  event && event.keyCode === 13 && callback(event);
};

export { whenPressEnter };
