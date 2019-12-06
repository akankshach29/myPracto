"use strict";

import state from "./model.js";

const Loader = () => (state.itemsLoaded ? "" : "<div>Loading...</div>");

const header = clinic => {
  const uniqueCity = [...new Set(clinic.map(city => city.city)), "All"];
  return `
  <div class="header">
    <div class="header-items">
      <h1>Book an Appointment</h1>
      <div class="sort-price">
        <label for="sortPrice">Select City:</label>
        <select id="sortPrice" onchange="app.filterByCity(value)">
          ${uniqueCity.map(
            city =>
              `<option value=${city} ${
                state.filterBy == city ? "selected" : ""
              }>${city}</option>`
          )}         
        </select>
      </div>
    </div>
  </div>
`;
};

const Clinic = clinic => `
    <div class="listing-body">
      <p>Name: ${clinic.name}</p> 
      <p>Locality: ${clinic.locality}</p> 
      <p>Price: INR ${clinic.price}</p>
      <p>Rating: ${clinic.rating} / 5</p>
      <div>
      Available Time Slots:
      ${clinic.available_slots
        .map(
          time => `<button onclick="app.getTime('${time}')">${time}</button>`
        )
        .join("\n")}
      </div>
      <div class="book-now">
        <button id="book" onclick="app.bookNow('${clinic.name},${
  clinic.locality
}')">Book Now</button>
      </div>
    </div>
`;

export default function render() {
  document.getElementById("root").innerHTML = `
    ${header(state.items)}  
    <div id="view">  
      ${Loader()}  
      <div class="sort-price">
        <label for="sortPrice">Sort:</label>
        <select id="sortPrice" onchange="app.sortByPrice(value)">
          <option value="lowToHigh" ${
            state.sortBy == "lowToHigh" ? "selected" : ""
          }>Low to High</option>
          <option value="highToLow" ${
            state.sortBy == "highToLow" ? "selected" : ""
          }>High to Low</option>
        </select>
      </div>
      <div>${state.items
        .filter(clinic =>
          state.filterBy != "All" ? clinic.city === state.filterBy : true
        )
        .map(Clinic)
        .join("")}</div>
    </div>
    `;
}
