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

//-------------------------------------------------------------------
const myLibrary = [];
const addButton = document.querySelector(".add");
const cards = document.querySelector(".cards");
const books = document.querySelector(".books");
const read = document.querySelector(".read");
const unread = document.querySelector(".unread");

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#year").value;
  const language = document.querySelector("#language").value;
  const pages = document.querySelector("#pages").value;
  const hasRead = document.querySelector("#hasRead").checked;

  myLibrary.push(new Book(title, author, year, language, pages, hasRead));
  document.querySelector("form").reset();
  populate();
});

function Book(title, author, year, language, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.language = language;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.changeStatus = function () {
  this.hasRead = !this.hasRead;
};

// Adds cards to the viewport, including the buttons
function populate() {
  cards.replaceChildren();
  myLibrary.forEach(function (book) {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = book.hasRead ? "./images/view.svg" : "./images/closed.svg";
    card.innerHTML = `<h3 class="title" data-item='${myLibrary.indexOf(
      book
    )}'>${book.title}</h3>
            <div class="buttons">
                <img src=${img} class='view' alt="">
                <img src="./images/delete.svg" class='delete' alt="">
            </div>
            <p class="author">Author: ${book.author}</p>
            <p class="pages">Pages: ${book.pages}</p>
            <p class="language">Language: ${book.language}</p>
            <p class="published">Year Published: ${book.year}</p>`;

    cards.appendChild(card);
    card.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        populate();
      } else if (e.target.classList.contains("view")) {
        changeUrl(e);
        book.changeStatus();
        updateNumber();
      }
    });
  });
  updateNumber();
}

// changes url of the eye from the closed to open svg
function changeUrl(e) {
  if (e.target.getAttribute("src") == "./images/view.svg") {
    e.target.setAttribute("src", "./images/closed.svg");
  } else {
    e.target.setAttribute("src", "./images/view.svg");
  }
}

// Updates the number of read, unread and total books
function updateNumber() {
  let readBooks = 0;
  let unreadBooks = 0;
  myLibrary.forEach(function (book) {
    if (book.hasRead === true) {
      readBooks++;
    } else if (book.hasRead === false) {
      unreadBooks++;
    }
  });
  books.textContent = `${readBooks + unreadBooks}`;
  read.textContent = `${readBooks}`;
  unread.textContent = `${unreadBooks}`;
}
