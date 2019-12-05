"use strict";

import actions from "./constants.js";
import state from "./model.js";
import render from "./view.js";
import { sortLowToHigh } from "./utils.js";

export default function controller({ action, payload }) {
  switch (action) {
    case actions.INTIAL_ITEMS_LOADED:
      state.items = payload;
      state.itemsLoaded = true;
      render();
      break;

    case actions.SORT_BY_PRICE:
      state.items = sortLowToHigh(state.items);
      render();
      break;
    default:
      break;
  }
}
