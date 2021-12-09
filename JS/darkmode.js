const body = document.querySelector("body");
const darkmodeBtn = document.querySelector("#darkmode-btn");
const trendingContainer = document.querySelector(".trending-section");
const p = document.querySelector("p");

let darkMode = localStorage.getItem("darkMode") || false;

localStorage.setItem("darkMode", darkMode);

if (localStorage.getItem("darkMode") == "true") {
  body.classList.add("dark-mode");
  trendingContainer.classList.add("trending-section-dark");
  p.classList.add("p-darkmode");
} else {
  body.classList.remove("dark-mode");
  trendingContainer.classList.remove("trending-section-dark");
  p.classList.remove("p-darkmode");
}

darkmodeBtn.addEventListener("click", () => {
  if (darkMode == false) {
    darkMode = true;
    localStorage.setItem("darkMode", darkMode);
    body.classList.add("dark-mode");
    trendingContainer.classList.add("trending-section-dark");
    p.classList.add("p-darkmode");
  } else {
    darkMode = false;
    localStorage.setItem("darkMode", darkMode);
    body.classList.remove("dark-mode");
    trendingContainer.classList.remove("trending-section-dark");
    p.classList.remove("p-darkmode");
  }
});
