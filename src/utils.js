"use strict";

export const sortLowToHigh = (clinics, value) => {
  if (value === "lowToHigh") {
    return clinics.sort((a, b) => a.price - b.price);
  } else {
    return clinics.sort((a, b) => b.price - a.price);
  }
};

// export const filterByCity = (clinics, value) => {
//   if (value) {
//     return clinics.filter(a => a.city === value);
//   }
// };
