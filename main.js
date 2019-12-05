import actions from "./src/constants.js";
import controller from "./src/controller.js";
import render from "./src/view.js";

const app = {
  sortByPrice() {
    controller({ action: actions.SORT_BY_PRICE });
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
