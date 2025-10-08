document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contacto__form");
  const alertBox = document.querySelector(".form-alert");

  if (!form) return;

  // helper: mensaje
  const showAlert = (msg, type = "ok") => {
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = "block";
  };

  // marca requeridos visualmente
  form.querySelectorAll("input[required], textarea[required]").forEach(el => {
    el.setAttribute("aria-required", "true");
    el.addEventListener("invalid", () => {
      el.classList.add("is-invalid");
    });
    el.addEventListener("input", () => {
      el.classList.remove("is-invalid");
      alertBox.style.display = "none";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // HTML5 validity
    if (!form.checkValidity()) {
      // dispara UI nativa y clases
      form.reportValidity();
      showAlert("Por favor, completá todos los campos obligatorios.", "error");
      return;
    }

    // “envío” simulado
    showAlert("¡Tu consulta fue enviada con éxito! Te contactamos a la brevedad.", "ok");

    // reset suave
    form.reset();
  });
});
