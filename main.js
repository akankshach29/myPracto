import actions from "./src/constants.js";
import controller from "./src/controller.js";
import render from "./src/view.js";

const app = {
  sortByPrice(value) {
    controller({ action: actions.SORT_BY_PRICE, payload: value });
  },

  filterByCity(value) {
    controller({ action: actions.FILTER_BY_CITY, payload: value });
  },

  getTime(e) {
    window.selectedSlot = e;
  },

  bookNow(name) {
    alert("Appointment confirmed for " + window.selectedSlot + " at " + name);
  },

  getInitialData() {
    fetch("https://api.myjson.com/bins/dzbut")
      .then(res => res.json())
      .then(json =>
        controller({
          action: actions.INTIAL_ITEMS_LOADED,
          payload: json
        })
      );
  }
};

function init() {
  app.getInitialData();
  render();

  window.app = app; // this is for onclick to access the module
}

init();
