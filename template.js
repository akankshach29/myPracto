const app = {
  actions: {
    INTIAL_ITEMS_LOADED: "INTIAL_ITEMS_LOADED",
    SORT_BY_PRICE: "SORT_BY_PRICE"
  },

  handlers: {},
  state: {
    items: [],
    itemsLoaded: false
  },

  controller({ action, payload }) {
    switch (action) {
      case this.actions.INTIAL_ITEMS_LOADED:
        this.state = { ...this.state, items: payload, itemsLoaded: true };
        this.render();
        break;

      case this.actions.SORT_BY_PRICE:
        this.state = {
          ...this.state,
          items: this.state.items.sort((a, b) => a.price - b.price)
        };
        this.render();
        break;
      default:
        break;
    }
  },

  sortByPrice() {
    this.controller({ action: this.actions.SORT_BY_PRICE });
  },

  getInitialData() {
    fetch("https://api.myjson.com/bins/dzbut")
      .then(res => res.json())
      .then(json =>
        this.controller({
          action: this.actions.INTIAL_ITEMS_LOADED,
          payload: json
        })
      );
  },

  render() {
    document.getElementById("root").innerHTML = `
      ${this.state.itemsLoaded ? "" : "<div>Loading your items</div>"}
      <button onclick="app.sortByPrice()">Sort by Price </button>
      <div>${this.state.items
        .map(
          clinic => `
          <p>Name: ${clinic.name}</p> 
          <p>Locality: ${clinic.locality}</p> 
          <p>Price: ${clinic.price}</p>
          <p>Rating: ${clinic.rating}</p>
          `
        )
        .join("")}</div>
      `;
  }
};

function init() {
  app.getInitialData();
  app.render();
}

init();
