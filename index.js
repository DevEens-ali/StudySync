const registerBtn = document.getElementById("registerBtn");
const registerPopup = document.getElementById("registerPopup");
const closeBtn = document.getElementById("closeBtn");
const registrationForm = document.getElementById("registrationForm");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");

/* ================= POPUP OPEN ================= */
registerBtn.addEventListener("click", function(e){
    e.preventDefault();
    registerPopup.style.display = "flex";
});

/* ================= POPUP CLOSE ================= */
closeBtn.addEventListener("click", function(){
    registerPopup.style.display = "none";
    clearErrors();
    registrationForm.reset();
});

/* ================= OUTSIDE CLICK CLOSE ================= */
window.addEventListener("click", function(e){
    if(e.target === registerPopup){
        registerPopup.style.display = "none";
        clearErrors();
        registrationForm.reset();
    }
});

/* ================= FORM VALIDATION ================= */
registrationForm.addEventListener("submit", function(e){
    e.preventDefault();

    let isValid = true;
    clearErrors();

    // NAME VALIDATION
    if(nameField.value.trim() === ""){
        showError(nameField, "Name field cannot be empty");
        isValid = false;
    }
    else if(nameField.value.trim().length < 3){
        showError(nameField, "Name must be at least 3 characters");
        isValid = false;
    }

    // EMAIL VALIDATION
    if(emailField.value.trim() === ""){
        showError(emailField, "Email field cannot be empty");
        isValid = false;
    }
    else if(!validateEmail(emailField.value.trim())){
        showError(emailField, "Enter valid email address");
        isValid = false;
    }

    // PASSWORD VALIDATION
    if(passwordField.value.trim() === ""){
        showError(passwordField, "Password field cannot be empty");
        isValid = false;
    }
    else if(passwordField.value.length < 6){
        showError(passwordField, "Password must be at least 6 characters");
        isValid = false;
    }

    // CONFIRM PASSWORD VALIDATION
    if(confirmPasswordField.value.trim() === ""){
        showError(confirmPasswordField, "Please confirm your password");
        isValid = false;
    }
    else if(confirmPasswordField.value !== passwordField.value){
        showError(confirmPasswordField, "Passwords do not match");
        isValid = false;
    }

    // SUCCESS
    if(isValid){
        alert("Registration Successful!");

        registrationForm.reset();
        registerPopup.style.display = "none";
    }
});


function showError(input, message){
    const errorDisplay = input.nextElementSibling;
    errorDisplay.innerText = message;
    input.style.border = "1px solid red";
}


function clearErrors(){
    const allErrors = document.querySelectorAll(".error");
    const allInputs = document.querySelectorAll(".input_group input");

    allErrors.forEach(function(error){
        error.innerText = "";
    });

    allInputs.forEach(function(input){
        input.style.border = "1px solid gray";
    });
}


function validateEmail(email){
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}
/* ================= IMAGE CAROUSEL WITH PLAY PAUSE ================= */

const slider = document.querySelector(".carousel_slider");
const images = document.querySelectorAll(".carousel_image");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

let currentIndex = 0;
let totalImages = images.length;
let slideInterval;

/* ===== UPDATE CAROUSEL POSITION ===== */
function updateCarousel(){
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

/* ===== NEXT IMAGE ===== */
function nextSlide(){
    currentIndex++;
    if(currentIndex >= totalImages){
        currentIndex = 0;
    }
    updateCarousel();
}

/* ===== PREVIOUS IMAGE ===== */
function prevSlide(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = totalImages - 1;
    }
    updateCarousel();
}

/* ===== AUTO PLAY START ===== */
function startSlider(){
    slideInterval = setInterval(nextSlide,3000);
}

/* ===== AUTO PLAY STOP ===== */
function stopSlider(){
    clearInterval(slideInterval);
}

/* ===== BUTTON EVENTS ===== */
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

pauseBtn.addEventListener("click", function(){
    stopSlider();
});

playBtn.addEventListener("click", function(){
    stopSlider(); 
    startSlider();
});

/* ===== DEFAULT AUTO START ===== */
startSlider();