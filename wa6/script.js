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

let slides = document.getElementsByClassName("mySlides");
let slideIndex = 1;

if (slides.length > 0) {
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return; 

    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    if (dots.length > 0) dots[slideIndex-1].className += " active";
  }

  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
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


const bandForm = document.querySelector("#bandForm");

window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("bandFormData"));
  if (savedData) {
    document.querySelector("#fname").value = savedData.fname || "";
    document.querySelector("#lname").value = savedData.lname || "";
    document.querySelector("#subject").value = savedData.subject || "";
  }
});

bandForm.addEventListener("input", () => {
  const formData = {
    fname: document.querySelector("#fname").value,
    lname: document.querySelector("#lname").value,
    subject: document.querySelector("#subject").value,
    timestamp: Date.now()
  };
  localStorage.setItem("bandFormData", JSON.stringify(formData));
});

bandForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  alert("Form submitted! Someone on our team will add your show to the bulletin shortly!");
});

const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear Local Data";
clearBtn.type = "button";
clearBtn.id = "clearData";
document.body.appendChild(clearBtn);

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("bandFormData");
  localStorage.removeItem("userTheme");
  document.querySelector("#fname").value = "";
  document.querySelector("#lname").value = "";
  document.querySelector("#subject").value = "";
  document.body.className = "light";

  alert("All locally saved data has been erased.");
});

