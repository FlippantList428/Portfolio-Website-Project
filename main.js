// Centralized main script for site: header animation, auth, dark mode, menu toggle, newsletter

document.addEventListener("DOMContentLoaded", function() {
  // Header scroll animation
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // Toggle hamburger menu
  window.toggleMenu = function() {
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('show');
  };

  // Auth form handling
  const authForm = document.getElementById("authForm");
  if (authForm) {
    const toggleBtn = document.getElementById("toggleBtn");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submitBtn");
    const errorMsg = document.getElementById("errorMsg");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailInput = document.getElementById("email");
    const switchText = document.getElementById("switchText");

    let isLoginMode = true;

    function toggleMode() {
      isLoginMode = !isLoginMode;
      if(errorMsg) errorMsg.textContent = "";

      if (isLoginMode) {
        formTitle.textContent = "Zaloguj się";
        submitBtn.textContent = "Zaloguj";
        toggleBtn.textContent = "Zarejestruj się";
        switchText.textContent = "Nie masz konta?";
        if (confirmPasswordInput) confirmPasswordInput.style.display = "none";
        if (emailInput) emailInput.style.display = "none";
      } else {
        formTitle.textContent = "Zarejestruj się";
        submitBtn.textContent = "Zarejestruj";
        toggleBtn.textContent = "Zaloguj się";
        switchText.textContent = "Masz już konto?";
        if (confirmPasswordInput) confirmPasswordInput.style.display = "block";
        if (emailInput) emailInput.style.display = "block";
      }
    }

    if (toggleBtn) toggleBtn.addEventListener("click", toggleMode);

    authForm.addEventListener("submit", function(e){
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      if(isLoginMode){
        if(user === "admin" && pass === "1234"){
          localStorage.setItem("loggedInUser", user);
          window.location.href = "index.html";
        } else {
          if (errorMsg) errorMsg.textContent = "Nieprawidłowa nazwa użytkownika lub hasło!";
        }
      } else {
        const email = emailInput ? emailInput.value : "";
        const confirmPass = confirmPasswordInput ? confirmPasswordInput.value : "";

        if(pass !== confirmPass){
          if (errorMsg) errorMsg.textContent = "Hasła nie są identyczne!";
          return;
        }

        if (errorMsg) {
          errorMsg.textContent = `Sukces! Użytkownik ${user} zarejestrowany (tymczasowo). Logowanie...`;
          errorMsg.style.color = "green";
        }

        setTimeout(() => {
          toggleMode();
          if (errorMsg) { errorMsg.style.color = "red"; errorMsg.textContent = ""; }
        }, 2000);
      }
    });
  }

  // Dark mode support removed

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterform');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email') ? document.getElementById('email').value : null;
      const msgElement = document.getElementById('succesMsg');
      if (email) {
        localStorage.setItem('newsletterEmail', email);
        if (msgElement) msgElement.textContent = "Dziękujemy za zapis! 📬";
        e.target.reset();
        setTimeout(() => { if (msgElement) msgElement.textContent = ""; }, 5000);
      }
    });
  }

});
