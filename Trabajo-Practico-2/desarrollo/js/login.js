document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login__tarjeta");
  const emailInput = form.querySelector("input[name='email']");
  const passwordInput = form.querySelector("input[name='password']");
  const loginBtn = form.querySelector(".login__boton");

  // Crear mensaje de error dinámico
  const errorMsg = document.createElement("p");
  errorMsg.classList.add("login__error");
  errorMsg.style.color = "red";
  errorMsg.style.marginTop = "10px";
  form.appendChild(errorMsg);

  loginBtn.addEventListener("click", () => {
    const user = emailInput.value.trim();
    const pass = passwordInput.value.trim();
// solo va a responder al usuario ucp123 con contraseña 123, sino usuario incorrecto
    if (user === "ucp123" && pass === "123") {
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
  });
});
