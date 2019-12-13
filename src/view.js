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
        <label for="sortPrice">Sort Price:</label>
        <select id="sortPrice" onchange="app.sortByPrice(value)">
          <option value="lowToHigh" ${
            state.sortBy == "lowToHigh" ? "selected" : ""
          }>Low to High</option>
          <option value="highToLow" ${
            state.sortBy == "highToLow" ? "selected" : ""
          }>High to Low</option>
        </select>
      </div>

        <label for="sortPrice">Sort Rating:</label>
        <select id="sortPrice" onchange="app.sortByRating(value)">
          <option value="1" ${
            state.sortByRating == "1" ? "selected" : ""
          }>1 star & above</option>
          <option value="2" ${
            state.sortByRating == "2" ? "selected" : ""
          }>2 star & above</option>
          <option value="3" ${
            state.sortByRating == "3" ? "selected" : ""
          }>3 star & above</option>
          <option value="4" ${
            state.sortByRating == "4" ? "selected" : ""
          }>4 star & above</option>
        </select>
      </div>
      <div>
      ${state.items
        .filter(clinic =>
          state.filterBy != "All" ? clinic.city === state.filterBy : true
        )
        .filter(clinic => {
          if (state.filterByRating === "1") {
            return true;
          }
          return clinic.rating >= state.filterByRating;
        })
        .map(Clinic)
        .join("")}</div>
    </div>
    `;
}
