"use strict";

import { GET_CLINIC_DATA } from "./constants";

export default services = {
  getInitialData() {
    fetch(GET_CLINIC_DATA)
      .then(res => res.json())
      .then(json =>
        this.controller({
          action: actions.INTIAL_ITEMS_LOADED,
          payload: json
        })
      );
  }
};
