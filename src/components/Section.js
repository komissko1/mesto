export default class Section {
  constructor({data, renderer}, cardContainer) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = cardContainer
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
}
