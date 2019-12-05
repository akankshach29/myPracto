"use strict";

import state from "./model.js";

const Loader = () => (state.itemsLoaded ? "" : "<div>Loading your items</div>");

const Clinic = clinic => `
          <p>Name: ${clinic.name}</p> 
          <p>Locality: ${clinic.locality}</p> 
          <p>Price: ${clinic.price}</p>
          <p>Rating: ${clinic.rating}</p>
`;

export default function render() {
  document.getElementById("root").innerHTML = `
      ${Loader()}
      <button onclick="app.sortByPrice()">Sort by Price </button>
      <div>${state.items.map(Clinic).join("")}</div>
      `;
}
