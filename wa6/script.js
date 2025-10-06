const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.querySelector('.nav-menu')
const navBurger = document.querySelector('.nav-burger-menu')

let toggle = false;

navToggle.addEventListener("click", () => {
    if (toggle == false) {
        navBurger.style.display = "block";
        navBurger.ariaLabel = "nav bar";
        toggle = true;
    }

    else {
        navBurger.style.display = "none";
        toggle = false;
    }
})

//Show first photo on page open
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

//toggle slides
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//display photo and highlight circle
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
// connect the event listener to the toggle button in index.html
let btn = document.querySelector('#theme').addEventListener('click', theme);

function theme() {
  // determine theme, default to light
  const currentTheme = document.body.className || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// store preference data in localStorage apply theme in CSS styling
function setTheme(theme) {
  localStorage.setItem('userTheme', theme);
  document.body.className = theme;
}

// on page load, check localStorage for preference, if there is data saved, apply theme accordingly
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  document.body.className = savedTheme;
});


