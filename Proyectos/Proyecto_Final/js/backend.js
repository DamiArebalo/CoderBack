function openPopup() {
    document.getElementById("modalBackground").style.display = "block";
    document.getElementById("loginPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("modalBackground").style.display = "none";
    document.getElementById("loginPopup").style.display = "none";
}

function validateAndClose() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("error");
        emailError.textContent = "Ingreso incorrecto, intente otra vez o regístrese";
    } else {
        emailInput.classList.remove("error");
        emailError.textContent = "";
    }

    if (!passwordRegex.test(passwordInput.value)) {
        passwordInput.classList.add("error");
        passwordError.textContent = "Ingreso incorrecto, intente otra vez o regístrese";
    } else {
        passwordInput.classList.remove("error");
        passwordError.textContent = "";
    }


    if (emailRegex.test(emailInput.value) && passwordRegex.test(passwordInput.value)) {
        closePopup();
    }
}

function openPopupProducts() {
    document.getElementById("modalBackgroundProducts").style.display = "block";
    document.getElementById("productPopup").style.display = "block";
}

function closePopupProduct() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

// function addProduct() {
//     // Lógica para agregar el producto (no implementada en este ejemplo)
//     closePopupProduct();
// }