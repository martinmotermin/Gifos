// MOBILE/DESKTOP MENU

let iconContainer = document.querySelector(".icon-container");

let navIcon = document.querySelector(".nav-icon");

const favContainer = document.querySelector("#fav-content");

let menu = document.querySelector(".menu");

let menuOpen = false;

let showMenu = false;

iconContainer.addEventListener("click", () => {
  if (!menuOpen && !showMenu) {
    navIcon.classList.add("icon-open");
    menu.classList.add("menu-open");
    menu.classList.remove("menu");
    menuOpen = true;
    showMenu = true;
  } else {
    navIcon.classList.remove("icon-open");
    menu.classList.remove("menu-open");
    menu.classList.add("menu");
    menuOpen = false;
    showMenu = false;
  }
});

// NAVBAR ACTIVE LINKS
const currentLocation = location.href;
const menuItem = document.querySelector("a");
const menuLength = menuItem.length;
for (i = 0; i < menuLength; i++) {
  if (menuItem[i].href === currentLocation) {
    menuItem[i].classList.add("active-link");
  }
}

// REQUEST FUNCTION
const apiKey = "IxS28LtMKiTqr0FH17zHSzmQHH2Hze99";
const urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;

function request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
}

// CREATE GIF CARD FUNCTION

/**
 *
 * @param {objet} gif all gif data
 * @param {string} container gif container
 * @param {string} className gif container classname
 * @param {string} overlayClass class wich contains the hover efect such as purple filter, buttons and text
 * @description create a container that will have a gif, their respective buttons, title, username and all the functionalities of those respective buttons
 */
function createCard(gif, container, className, overlayClass = "hover-card") {
  let card = document.createElement("div");
  let img = document.createElement("img");
  let overlayCard = document.createElement("div");
  img.setAttribute("draggable", false);
  card.classList.add(className, "gif-card");
  card.id = gif.id;
  overlayCard.classList.add(overlayClass);
  img.src = gif.images.original.url;
  let buttonsContainer = document.createElement("div");
  let favButton = document.createElement("img");
  favButton.src = "/ICONS/icon-fav.svg";
  let downloadButton = document.createElement("img");
  downloadButton.src = "/ICONS/icon-download.svg";
  let maxButton = document.createElement("img");
  maxButton.src = "/ICONS/icon-max-normal.svg";
  let textContainer = document.createElement("div");
  let gifTitle = document.createElement("h2");
  gifTitle.textContent = gif.title;
  let userName = document.createElement("p");
  userName.textContent = gif.username;
  buttonsContainer.classList.add("card-buttons");
  textContainer.classList.add("card-text");
  favButton.classList.add("card-button");
  favButton.classList.add("fav-button");
  const isFavorite = myFavorites.some((element) => element.id === gif.id);
  if (isFavorite) {
    favButton.classList.add("added-to-favorites");
  }
  favButton.onclick = () =>
    isFavorite ? removeFavorite(gif) : addFavorite(gif);
  downloadButton.classList.add("card-button");
  maxButton.classList.add("card-button");

  container.appendChild(card);
  card.appendChild(overlayCard);
  card.appendChild(img);
  overlayCard.appendChild(buttonsContainer);
  overlayCard.appendChild(textContainer);
  buttonsContainer.appendChild(favButton);
  buttonsContainer.appendChild(downloadButton);
  buttonsContainer.appendChild(maxButton);
  textContainer.appendChild(userName);
  textContainer.appendChild(gifTitle);

  // CARD HOVER EVENTS

  card.onmouseover = (event) => (overlayCard.style.display = "flex");

  card.onmouseleave = (event) => (overlayCard.style.display = "none");

  // CARD BUTTON HOVER EVENTS
  favButton.onmouseover = (event) =>
    (favButton.src = "/ICONS/icon-fav-hover.svg");

  favButton.onmouseleave = (event) => (favButton.src = "../ICONS/icon-fav.svg");

  downloadButton.onmouseover = (event) =>
    (downloadButton.src = "../ICONS/icon-download-hover.svg");

  downloadButton.onmouseleave = (event) =>
    (downloadButton.src = "../ICONS/icon-download.svg");

  maxButton.onmouseover = (event) =>
    (maxButton.src = "../ICONS/icon-max-hover.svg");

  maxButton.onmouseleave = (event) =>
    (maxButton.src = "../ICONS/icon-max-normal.svg");
}

// TRENDING RESULTS

request(urlTrending).then((response) => {
  let container = document.getElementById("trending-results");
  response.data.forEach((element, index) => {
    if (index < 12) {
      createCard(element, container, "slide");
    }
  });
});

// TRENDING SLIDER

// SLIDER BUTTONS

const leftButton = document.querySelector("#left-button");
const rightButton = document.querySelector("#right-button");

leftButton.addEventListener("mouseover", () => {
  leftButton.src = "../ICONS/button-slider-left-hover.svg";
});
leftButton.addEventListener("mouseleave", () => {
  leftButton.src = "../ICONS/button-slider-left.svg";
});

rightButton.addEventListener("mouseover", () => {
  rightButton.src = "../ICONS/button-slider-right-hover.svg";
});
rightButton.addEventListener("mouseleave", () => {
  rightButton.src = "../ICONS/button-slider-right.svg";
});

const sliderContainer = document.querySelector(".slider");

rightButton.addEventListener("click", () => {
  sliderContainer.scrollLeft += sliderContainer.offsetWidth;
});
leftButton.addEventListener("click", () => {
  sliderContainer.scrollLeft -= sliderContainer.offsetWidth;
});
// CARD BUTTON ADD AND REMOVE FAVORITE

let myFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

/**
 *
 * @param {object} gif all data gif
 * @description stores in the local storage gifs that are selected through favbutton
 */
function addFavorite(gif) {
  if (!myFavorites.some((element) => element.id === gif.id)) {
    const favButton = document
      .getElementById(gif.id)
      .querySelector(".fav-button");
    favButton.classList.toggle("added-to-favorites");
    favButton.onclick = () => removeFavorite(gif);
    myFavorites.push(gif);
    localStorage.setItem("favorites", JSON.stringify(myFavorites));
    favContainer.innerHTML = "";
    myFavorites.forEach((gif) => {
      createCard(gif, favContainer, "fav-gif");
    });
  }
}

/**
 *
 * @param {object} gif all data gif
 * @description remove previously added gifs from local storage
 */
function removeFavorite(gif) {
  myFavorites = myFavorites.filter((element) => element.id !== gif.id);
  const favButton = document
    .getElementById(gif.id)
    .querySelector(".fav-button");
  favButton.classList.toggle("added-to-favorites");
  favButton.onclick = () => addFavorite(gif);
  localStorage.setItem("favorites", JSON.stringify(myFavorites));
  favContainer.innerHTML = "";
  myFavorites.forEach((gif) => {
    createCard(gif, favContainer, "fav-gif");
  });
}

// DARK MODE

const btnDark = document.querySelector("#darkmode-btn");

// btnDark.addEventListener("click", (event) => {
//   document.body.classList.add("dark-mode");
// });

// DISPLAY FAVORITES

if (!myFavorites == []) {
  document.querySelector(".fav-nocontent").style.display = "none";
  myFavorites.forEach((gif) => {
    createCard(gif, favContainer, "fav-gif");
  });
}
