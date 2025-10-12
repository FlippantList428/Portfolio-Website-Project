document.addEventListener("DOMContentLoaded", function() {
    // =======================================================
    // === 1. LOGIKA ANIMACJI NAGŁÓWKA PRZY PRZEWIJANIU ===
    // =======================================================
    const header = document.querySelector('header');
    
    // Funkcja nasłuchująca przewijanie strony
    window.addEventListener('scroll', () => {
        // Sprawdź, czy przewinięto stronę więcej niż 50 pikseli
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =======================================================
    // === 2. LOGIKA LOGOWANIA I REJESTRACJI ===
    // =======================================================
    
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

            // Symulacja sukcesu rejestracji
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

    // =======================================================
    // === 3. LOGIKA TRYBU CIEMNEGO ===
    // =======================================================

    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    // 1. Sprawdź, czy użytkownik ma zapisany tryb w pamięci lokalnej
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) {
            toggleButton.textContent = 'Tryb Jasny';
        }
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        if (toggleButton) {
            toggleButton.textContent = 'Tryb Ciemny';
        }
    }

    // 2. Obsługa kliknięcia przycisku
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Przełącz klasę na ciele strony
            body.classList.toggle('dark-mode');

            // Zapisz wybór użytkownika w localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                toggleButton.textContent = 'Tryb Jasny';
            } else {
                localStorage.setItem('theme', 'light');
                toggleButton.textContent = 'Tryb Ciemny';
            }
        });
    }

}); // Koniec DOMContentLoaded