document.addEventListener("DOMContentLoaded", function() {

    // =======================================================
    // === 1. ANIMACJA NAGŁÓWKA PRZY PRZEWIJANIU ===
    // =======================================================
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =======================================================
    // === 2. LOGOWANIE I REJESTRACJA ===
    // =======================================================
    const authForm = document.getElementById("authForm");
    if(authForm){
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
            errorMsg.textContent = "";

            if (isLoginMode) {
                formTitle.textContent = "Zaloguj się";
                submitBtn.textContent = "Zaloguj";
                toggleBtn.textContent = "Zarejestruj się";
                switchText.textContent = "Nie masz konta?";
                confirmPasswordInput.style.display = "none";
                emailInput.style.display = "none";
            } else {
                formTitle.textContent = "Zarejestruj się";
                submitBtn.textContent = "Zarejestruj";
                toggleBtn.textContent = "Zaloguj się";
                switchText.textContent = "Masz już konto?";
                confirmPasswordInput.style.display = "block";
                emailInput.style.display = "block";
            }
        }

        toggleBtn.addEventListener("click", toggleMode);

        authForm.addEventListener("submit", function(e){
            e.preventDefault();
            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            if(isLoginMode){
                if(user === "admin" && pass === "1234"){
                    localStorage.setItem("loggedInUser", user);
                    window.location.href = "index.html";
                } else {
                    errorMsg.textContent = "Nieprawidłowa nazwa użytkownika lub hasło!";
                }
            } else {
                const email = emailInput.value;
                const confirmPass = confirmPasswordInput.value;

                if(pass !== confirmPass){
                    errorMsg.textContent = "Hasła nie są identyczne!";
                    return;
                }

                errorMsg.textContent = `Sukces! Użytkownik ${user} zarejestrowany (tymczasowo). Logowanie...`;
                errorMsg.style.color = "green";

                setTimeout(() => {
                    toggleMode();
                    errorMsg.style.color = "red";
                    errorMsg.textContent = "";
                }, 2000);
            }
        });
    }

    // =======================================================
    // === 3. TRYB CIEMNY Z SUWAKIEM ===
    // =======================================================
    const darkToggle = document.getElementById('toggle-dark-mode');

    if(darkToggle){
        // przy zmianie checkboxa
        darkToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', darkToggle.checked);
            localStorage.setItem('darkMode', darkToggle.checked);
        });

        // przy ładowaniu strony, ustaw stan suwaka
        if(localStorage.getItem('darkMode') === 'true'){
            darkToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
    }

});
