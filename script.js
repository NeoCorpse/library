"use strict";

// Adds and removes placeholder on search input depending on its state
const search = document.querySelector("input[type='search']");
search.addEventListener("mouseover", setPlaceholder);
search.addEventListener("focus", setPlaceholder);
search.addEventListener("mouseout", () => {
  if (search.hasAttribute("placeholder") && document.activeElement !== search) {
    removePlaceholder();
  }
});
search.addEventListener("focusout", removePlaceholder);

function setPlaceholder() {
  search.setAttribute("placeholder", "Search for your favourite book");
}

function removePlaceholder() {
  search.removeAttribute("placeholder");
}
