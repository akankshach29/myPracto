"use strict";

export const sortLowToHigh = clinics => {
  return clinics.sort((a, b) => a.price - b.price);
};
