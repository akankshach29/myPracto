let appBody = document.getElementById("app-body");

fetch("https://api.myjson.com/bins/dzbut")
  .then(response => response.json())
  .then(clinics => {
    appBody.innerHTML = populateClinics(clinics);
  })
  .catch(error => console.warn(error));

function populateClinics(clinics) {
  console.log(clinics);
  return (
    `<div class="sort-price">
        <label for="Sort">Sort:</label>
        <select id="Sort" onchange="sortByPrice(value, clinics)">
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
        </select>    
    </div><br>` +
    "\n" +
    clinics
      .sort(price => price.price)
      .map(clinic => {
        return (
          `<div id="clinic-listing" class="listing-body">
            <p>Name: ${clinic.name}</p> 
            <p>Locality: ${clinic.locality}</p> 
            <p>Price: ${clinic.price}</p>
            <p>Rating: ${clinic.rating}</p>
            <div class="time-slots"><span>Time Slots:</span> ` +
          clinic.available_slots
            .map(slot => {
              return `<button>${slot}</button>`;
            })
            .join("\n") +
          `<div>
      <button id="book" type="submit" onclick="bookAppointment()">Book Now</button>
      </div>
      </div>
        </div>`
        );
      })
      .join("\n")
  );
}

function bookAppointment() {
  alert("Your appointment is booked");
}

function sortByPrice(value, clinics) {
  console.log(value);
  if (value === "lowToHigh") {
    clinics.sort((a, b) => a.price - b.price);
  } else {
    clinics.sort((a, b) => b.price - a.price);
  }
  return clinics;
}
