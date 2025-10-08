
document.addEventListener("DOMContentLoaded", () => {
  /*  HERO  */
  const landingTexto = document.querySelector(".landing-texto");
  if (landingTexto) {
    landingTexto.classList.add("is-hidden");
    requestAnimationFrame(() => landingTexto.classList.add("reveal-in"));
  }

  /*  BENEFICIOS: carrusel auto + infinito  */
{
  const viewport = document.querySelector(".beneficios-carousel .bc-viewport");
  const track = document.querySelector(".beneficios-carousel .bc-track");
  const prev = document.querySelector(".beneficios-carousel .prev");
  const next = document.querySelector(".beneficios-carousel .next");

  // Agrego descripción bajo el título usando data-info
  document.querySelectorAll(".tarjeta_beneficio").forEach(card => {
    if (!card.querySelector(".desc_beneficio")) {
      const info = card.getAttribute("data-info") || "";
      const p = document.createElement("p");
      p.className = "desc_beneficio";
      p.textContent = info;
      const h3 = card.querySelector(".texto_beneficio");
      (h3?.after) ? h3.after(p) : card.appendChild(p);
    }
  });

  if (viewport && track && prev && next) {
    // duplico contenido para loop infinito 
    track.innerHTML += track.innerHTML;

    const page = () => viewport.clientWidth;
    prev.addEventListener("click", () => viewport.scrollBy({ left: -page(), behavior: "smooth" }));
    next.addEventListener("click", () => viewport.scrollBy({ left:  page(), behavior: "smooth" }));

    // auto-scroll continuo e infinito (pausa al hover/touch para poder leer)
    let speed = 0.45;   // más lento para leer (subí/bajá a gusto)
    let rafId = null;

    const tick = () => {
      viewport.scrollLeft += speed;
      const half = track.scrollWidth / 2;
      if (viewport.scrollLeft >= half) viewport.scrollLeft -= half; // reset sin salto
      rafId = requestAnimationFrame(tick);
    };

    const start = () => { if (!rafId) rafId = requestAnimationFrame(tick); };
    const stop  = () => { cancelAnimationFrame(rafId); rafId = null; };

    // pausa para lectura
    ["mouseenter","pointerdown","focusin"].forEach(ev => viewport.addEventListener(ev, stop));
    ["mouseleave","pointerup","pointerleave","focusout"].forEach(ev => viewport.addEventListener(ev, start));

    start();
  }
}


  /*  PLANES: click -> Contacto  */
  document.querySelectorAll(".tarjeta_plan").forEach((plan) => {
    plan.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection =
        document.querySelector("#contacto") || document.querySelector("#contactanos");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = "contactanos.html";
    });
  });
});

