(function () {
  // --- Utils ---
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const fmtMoney = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
  const fmtDay = (d) => {
    const dd = new Date(d);
    return dd.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
  };
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const clampDate = (iso) => new Date(iso).toISOString().slice(0, 10);

  const ESTADOS = {
    RESERVADO: { label: "Reservado", class: "estado-info" },
    CHECKIN_HOY: { label: "Check-in hoy", class: "estado-advertencia" },
    ALOJADO: { label: "Alojado", class: "estado-ok" },
    CHECKOUT_HOY: { label: "Check-out hoy", class: "estado-neutral" },
    LATE_CHECKOUT: { label: "Late check-out", class: "estado-error" }
  };

  // --- DB ---
  const DB_KEY = "hotelDB";
  function seedIfEmpty() {
    if (localStorage.getItem(DB_KEY)) return;

    const hotels = [
      { id: "H-MIA", nombre: "Hilton Hotel Miami", rooms: 76 },
      { id: "H-POS", nombre: "Hilton Hotel Posadas", rooms: 69 },
      { id: "H-LON", nombre: "Hilton Hotel Londres", rooms: 62 }
    ];

    const reservas = [
      {
        id: "D-0001",
        huesped: "Lucía Peres",
        hotelId: "H-MIA",
        habitacion: "207",
        regimen: "BB",
        checkin: "2025-09-02",
        checkout: "2025-09-05",
        estado: "RESERVADO",
        total: 198300,
        pax: 1
      },
      {
        id: "D-0002",
        huesped: "Alejandro Suárez",
        hotelId: "H-POS",
        habitacion: "118",
        regimen: "HB",
        checkin: "2025-09-30",
        checkout: "2025-10-02",
        estado: "CHECKIN_HOY",
        total: 102500,
        pax: 2
      },
      {
        id: "D-0003",
        huesped: "Carla Méndez",
        hotelId: "H-LON",
        habitacion: "412",
        regimen: "BB",
        checkin: todayISO(),
        checkout: "2025-10-10",
        estado: "ALOJADO",
        total: 350000,
        pax: 2
      },
      {
        id: "D-0004",
        huesped: "Marcos Díaz",
        hotelId: "H-MIA",
        habitacion: "305",
        regimen: "BB",
        checkin: todayISO(),
        checkout: todayISO(),
        estado: "CHECKOUT_HOY",
        total: 90000,
        pax: 1
      },
      {
        id: "D-0005",
        huesped: "Ana Souza",
        hotelId: "H-POS",
        habitacion: "220",
        regimen: "HB",
        checkin: "2025-10-05",
        checkout: "2025-10-08",
        estado: "ALOJADO",
        total: 210000,
        pax: 2
      },
      {
        id: "D-0006",
        huesped: "John Smith",
        hotelId: "H-POS",
        habitacion: "221",
        regimen: "BB",
        checkin: "2025-10-06",
        checkout: "2025-10-07",
        estado: "LATE_CHECKOUT",
        total: 120000,
        pax: 1
      },
      {
        id: "D-0007",
        huesped: "Brenda López",
        hotelId: "H-LON",
        habitacion: "510",
        regimen: "AI",
        checkin: "2025-10-04",
        checkout: "2025-10-09",
        estado: "ALOJADO",
        total: 480000,
        pax: 2
      },
      {
        id: "D-0008",
        huesped: "Pablo Romero",
        hotelId: "H-MIA",
        habitacion: "110",
        regimen: "BB",
        checkin: "2025-10-08",
        checkout: "2025-10-12",
        estado: "RESERVADO",
        total: 260000,
        pax: 1
      },
      {
        id: "D-0009",
        huesped: "Sofía Martins",
        hotelId: "H-POS",
        habitacion: "317",
        regimen: "HB",
        checkin: "2025-10-07",
        checkout: "2025-10-10",
        estado: "CHECKIN_HOY",
        total: 310000,
        pax: 3
      }
    ];

    localStorage.setItem(DB_KEY, JSON.stringify({ hotels, reservas }));
  }

  const loadDB = () => (seedIfEmpty(), JSON.parse(localStorage.getItem(DB_KEY)));
  const saveDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

  // ---  filtros ---
  const state = { query: "", fecha: "", hotelId: "", estado: "" };

  // --- Render base ---
  function renderOptions() {
    const { hotels, reservas } = loadDB();
    // Filtros
    $("#filtro-hotel").innerHTML =
      `<option value="">Todos</option>` + hotels.map(h => `<option value="${h.id}">${h.nombre}</option>`).join("");

    const estadosUsados = Array.from(new Set(reservas.map(r => r.estado)));
    $("#filtro-estado").innerHTML =
      `<option value="">Todos</option>` + estadosUsados.map(e => `<option value="${e}">${ESTADOS[e]?.label || e}</option>`).join("");

    // Modal selects
    const selHotel = $("#res-hotel");
    if (selHotel) selHotel.innerHTML = hotels.map(h => `<option value="${h.id}">${h.nombre}</option>`).join("");
    const selEstado = $("#res-estado");
    if (selEstado) {
      selEstado.innerHTML = Object.entries(ESTADOS)
        .map(([k, v]) => `<option value="${k}">${v.label}</option>`)
        .join("");
    }
  }

  // Filtros + búsqueda
  function applyFilters(reservas) {
    return reservas.filter(r => {
      const matchQuery =
        !state.query ||
        r.id.toLowerCase().includes(state.query) ||
        r.huesped.toLowerCase().includes(state.query) ||
        r.habitacion.toLowerCase().includes(state.query);
      const matchFecha = !state.fecha || r.checkin === state.fecha || r.checkout === state.fecha;
      const matchHotel = !state.hotelId || r.hotelId === state.hotelId;
      const matchEstado = !state.estado || r.estado === state.estado;
      return matchQuery && matchFecha && matchHotel && matchEstado;
    });
  }

  // Indicadores
  function computeIndicadores(db) {
    const { hotels, reservas } = db;
    const hoy = todayISO();

    const alojados = reservas.filter(r => r.estado === "ALOJADO" || (r.checkin <= hoy && r.checkout >= hoy));
    const checkinsHoy = reservas.filter(r => r.checkin === hoy);
       const checkoutsHoy = reservas.filter(r => r.checkout === hoy);
    const late = reservas.filter(r => r.estado === "LATE_CHECKOUT" && r.checkout <= hoy);

    const totalRooms = hotels.reduce((acc, h) => acc + h.rooms, 0);
    const ocupadasTotal = hotels.reduce((acc, h) => acc + alojados.filter(r => r.hotelId === h.id).length, 0);
    const ocupacion = totalRooms ? Math.round((ocupadasTotal / totalRooms) * 100) : 0;

    const ingresosHoy = reservas
      .filter(r => r.checkin === hoy || (r.checkin <= hoy && r.checkout >= hoy))
      .reduce((acc, r) => acc + r.total / Math.max(1, daysBetween(r.checkin, r.checkout)), 0);

    const adr = ocupadasTotal ? Math.round(ingresosHoy / ocupadasTotal) : 0;

    return {
      ocupacion,
      huespedes: alojados.reduce((acc, r) => acc + (r.pax || 1), 0),
      checkins: checkinsHoy.length,
      checkouts: checkoutsHoy.length,
      ingresosDia: Math.round(ingresosHoy),
      adr,
      late: late.length
    };
  }

  const daysBetween = (a, b) =>
    Math.max(1, Math.ceil((new Date(b).setHours(0,0,0,0) - new Date(a).setHours(0,0,0,0)) / 86400000));

  function renderIndicadores() {
    const db = loadDB();
    const ind = computeIndicadores(db);
    $("#indicadores").innerHTML = `
      <div class="indicador">
        <div class="etiqueta">Ocupación actual</div>
        <div class="valor">${ind.ocupacion}%</div>
        <div class="variacion">—</div>
      </div>
      <div class="indicador">
        <div class="etiqueta">Huéspedes alojados</div>
        <div class="valor">${ind.huespedes}</div>
        <div class="detalle">—</div>
      </div>
      <div class="indicador">
        <div class="etiqueta">Check-ins hoy</div>
        <div class="valor">${ind.checkins}</div>
        <div class="detalle">${ind.late} late</div>
      </div>
      <div class="indicador">
        <div class="etiqueta">Check-outs hoy</div>
        <div class="valor">${ind.checkouts}</div>
        <div class="detalle">—</div>
      </div>
      <div class="indicador">
        <div class="etiqueta">Ingresos (día)</div>
        <div class="valor">${fmtMoney(ind.ingresosDia)}</div>
        <div class="detalle">ADR ${fmtMoney(ind.adr)}</div>
      </div>
    `;
  }

  // Tabla
  function renderTabla() {
    const db = loadDB();
    const filtradas = applyFilters(db.reservas).sort((a, b) => (a.checkin < b.checkin ? 1 : -1));
    const hotelById = Object.fromEntries(db.hotels.map(h => [h.id, h]));
    $("#cuerpo-tabla").innerHTML = filtradas
      .map((r) => {
        const meta = ESTADOS[r.estado] || { label: r.estado, class: "estado-neutral" };
        return `
        <tr>
          <td>#${r.id}</td>
          <td><span class="simbolo-huesped"></span>${r.huesped}</td>
          <td>${hotelById[r.hotelId]?.nombre || r.hotelId}</td>
          <td>${r.habitacion}</td>
          <td>${r.regimen}</td>
          <td>${fmtDay(r.checkin)}</td>
          <td>${fmtDay(r.checkout)}</td>
          <td><span class="etiqueta-estado ${meta.class}">${meta.label}</span></td>
          <td class="alinear-derecha">${fmtMoney(r.total)}</td>
        </tr>`;
      })
      .join("");

    $("#resultado-total").textContent = `${filtradas.length} resultado${filtradas.length !== 1 ? "s" : ""}`;
  }

  // Resumen hoteles
  function renderResumenHoteles() {
    const db = loadDB();
    const hoy = todayISO();
    const ocupadasCount = (hotelId) =>
      db.reservas.filter(r => r.hotelId === hotelId && r.checkin <= hoy && r.checkout >= hoy).length;

    $("#resumen-hoteles").innerHTML = db.hotels
      .map((h) => {
        const ocup = ocupadasCount(h.id);
        const pct = Math.round((ocup / h.rooms) * 100);
        return `
        <div class="tarjeta-hotel">
          <h4>${h.nombre}</h4>
          <div class="barra-ocupacion" aria-label="porcentaje ocupación"><span style="width:${pct}%"></span></div>
          <div class="info-hotel"><div>Ocupación ${pct}% (${ocup}/${h.rooms})</div></div>
        </div>`;
      })
      .join("");
  }

  // --- Modal Nueva Reserva ---
  const modal = $("#modal-reserva");
  const overlay = $("#modal-overlay");
  const openModal = () => {
    $("#res-huesped").value = "";
    $("#res-habitacion").value = "";
    $("#res-regimen").value = "BB";
    $("#res-estado").value = "RESERVADO";
    $("#res-total").value = "0";
    $("#res-checkin").value = todayISO();
    $("#res-checkout").value = todayISO();
    $("#res-id").value = "auto";
    modal.hidden = false;
    overlay.hidden = false;
    modal.focus();
    document.body.classList.add("no-scroll");
  };
  const closeModal = () => {
    modal.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
  };

  function bindModal() {
    $("#nueva-reserva").addEventListener("click", openModal);
    $("#modal-close").addEventListener("click", closeModal);
    $("#modal-cancelar").addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (!modal.hidden && e.key === "Escape") closeModal();
    });

    $("#form-reserva").addEventListener("submit", (e) => {
      e.preventDefault();

      const huesped = $("#res-huesped").value.trim();
      const hotelId = $("#res-hotel").value;
      const habitacion = $("#res-habitacion").value.trim();
      const regimen = $("#res-regimen").value;
      const estado = $("#res-estado").value;
      let checkin = $("#res-checkin").value;
      let checkout = $("#res-checkout").value;
      const total = Math.max(0, parseInt($("#res-total").value || "0", 10));

      if (!huesped || !hotelId || !habitacion) {
        alert("Completá los campos requeridos.");
        return;
      }
      checkin = clampDate(checkin);
      checkout = clampDate(checkout);
      if (new Date(checkout) < new Date(checkin)) {
        alert("El check-out no puede ser anterior al check-in.");
        return;
      }

      const db = loadDB();
      const nextNum = (db.reservas.length + 1).toString().padStart(4, "0");
      const nueva = { id: `D-${nextNum}`, huesped, hotelId, habitacion, regimen, checkin, checkout, estado, total, pax: 1 };

      db.reservas.push(nueva);
      saveDB(db);

      renderOptions();
      renderIndicadores();
      renderTabla();
      renderResumenHoteles();

      closeModal();
    });
  }

  // Eventos UI (filtros/busqueda)
  function bindEvents() {
    $("#aplicar").addEventListener("click", () => {
      state.fecha = $("#filtro-fecha").value || "";
      state.hotelId = $("#filtro-hotel").value || "";
      state.estado = $("#filtro-estado").value || "";
      renderIndicadores();
      renderTabla();
      renderResumenHoteles();
    });

    $("#buscador").addEventListener("input", (e) => {
      state.query = (e.target.value || "").trim().toLowerCase();
      renderTabla();
    });
  }

  // Init
  function init() {
    renderOptions();
    renderIndicadores();
    renderTabla();
    renderResumenHoteles();
    bindEvents();
    bindModal();

    //  asegurar que arranque cerrado
    modal.hidden = true;
    overlay.hidden = true;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
