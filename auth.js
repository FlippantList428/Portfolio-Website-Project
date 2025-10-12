document.addEventListener("DOMContentLoaded", function() {
    // === UCHWYTY DO ELEMENTÓW ===
    const authForm = document.getElementById("authForm");
    const toggleBtn = document.getElementById("toggleBtn");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submitBtn");
    const errorMsg = document.getElementById("errorMsg");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailInput = document.getElementById("email");
    const switchText = document.getElementById("switchText");

    let isLoginMode = true;

    // === FUNKCJA PRZEŁĄCZAJĄCA TRYBY ===
    function toggleMode() {
        isLoginMode = !isLoginMode;
        errorMsg.textContent = ""; // Czyść błąd przy przełączaniu

        if (isLoginMode) {
            // Tryb LOGOWANIA
            formTitle.textContent = "Zaloguj się";
            submitBtn.textContent = "Zaloguj";
            toggleBtn.textContent = "Zarejestruj się";
            switchText.textContent = "Nie masz konta?";
            
            // Ukryj pola rejestracji
            confirmPasswordInput.style.display = "none";
            emailInput.style.display = "none";

        } else {
            // Tryb REJESTRACJI
            formTitle.textContent = "Zarejestruj się";
            submitBtn.textContent = "Zarejestruj";
            toggleBtn.textContent = "Zaloguj się";
            switchText.textContent = "Masz już konto?";
            
            // Pokaż pola rejestracji
            confirmPasswordInput.style.display = "block";
            emailInput.style.display = "block";
        }
    }

    // === OBSŁUGA PRZEŁĄCZANIA PO KLIKNIĘCIU ===
    toggleBtn.addEventListener("click", toggleMode);

    // === OBSŁUGA WYSYŁANIA FORMULARZA ===
    authForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        
        if (isLoginMode) {
            // LOGIKA LOGOWANIA (Tymczasowa)
            if (user === "admin" && pass === "1234") {
                localStorage.setItem("loggedInUser", user);
                window.location.href = "index.html";
            } else {
                errorMsg.textContent = "Nieprawidłowa nazwa użytkownika lub hasło!";
            }
        } else {
            // LOGIKA REJESTRACJI (Tymczasowa)
            const email = emailInput.value;
            const confirmPass = confirmPasswordInput.value;

            if (pass !== confirmPass) {
                errorMsg.textContent = "Hasła nie są identyczne!";
                return;
            }

            // TUTAJ dodasz kod, który wyśle dane do Twojego backendu
            // Na razie symulujemy sukces:
            errorMsg.textContent = `Sukces! Użytkownik ${user} zarejestrowany (tymczasowo). Logowanie...`;
            errorMsg.style.color = "green";
            
            // Przełącz na logowanie po sukcesie (opcjonalnie)
            setTimeout(() => {
                toggleMode();
                errorMsg.style.color = "red";
                errorMsg.textContent = "";
            }, 2000);
        }
    });
});