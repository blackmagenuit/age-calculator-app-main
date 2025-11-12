const daysInMonth = (y, m) => new Date(y, m, 0).getDate(); // m: 1-12
const isFuture = (y, m, d) => {
  const today = new Date();
  const given = new Date(y, m - 1, d);
  return given > today;
};
const isValidDate = (y, m, d) => {
  if (m < 1 || m > 12) return false;
  const dim = daysInMonth(y, m);
  if (d < 1 || d > dim) return false;
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === (m - 1) && dt.getDate() === d;
};

const form = document.getElementById("age-form");
const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const yearsOut = document.getElementById("years");
const monthsOut = document.getElementById("months");
const daysOut = document.getElementById("days");

const setError = (el, msg) => {
  const id = el.getAttribute("aria-describedby");
  const err = document.getElementById(id);
  err.textContent = msg || "";
  el.classList.toggle("has-error", !!msg);
};
const clearErrors = () => {
  [dayEl, monthEl, yearEl].forEach((el) => setError(el, ""));
};

const toInt = (str) => Number.parseInt(String(str).trim(), 10);

function calculateAge(y, m, d) {
  const today = new Date();
  let y2 = today.getFullYear();
  let m2 = today.getMonth() + 1; // 1-12
  let d2 = today.getDate();

  if (d > d2) {

    m2 -= 1;
    if (m2 === 0) { m2 = 12; y2 -= 1; }
    d2 += daysInMonth(y2, m2);
  }


  if (m > m2) {
    y2 -= 1;
    m2 += 12;
  }

  const years = y2 - y;
  const months = m2 - m;
  const days = d2 - d;

  return { years, months, days };
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const d = toInt(dayEl.value);
  const m = toInt(monthEl.value);
  const y = toInt(yearEl.value);

  let valid = true;

  // Validar que los campos no estén vacíos
  if (!dayEl.value.trim()) { setError(dayEl, "Requerido"); valid = false; }
  if (!monthEl.value.trim()) { setError(monthEl, "Requerido"); valid = false; }
  if (!yearEl.value.trim()) { setError(yearEl, "Requerido"); valid = false; }

  // Validar que sean números válidos
  if (valid && isNaN(d)) { setError(dayEl, "Debe ser un número"); valid = false; }
  if (valid && isNaN(m)) { setError(monthEl, "Debe ser un número"); valid = false; }
  if (valid && isNaN(y)) { setError(yearEl, "Debe ser un número"); valid = false; }

  // Validar rangos básicos
  if (valid && (d < 1 || d > 31)) { setError(dayEl, "Día inválido"); valid = false; }
  if (valid && (m < 1 || m > 12)) { setError(monthEl, "Mes inválido"); valid = false; }
  if (valid && (y < 1900 || y > new Date().getFullYear())) { 
    setError(yearEl, "Año inválido"); 
    valid = false; 
  }


  if (valid && !isValidDate(y, m, d)) {
    setError(dayEl, "Fecha inexistente");
    valid = false;
  }
  if (valid && isFuture(y, m, d)) {
    setError(yearEl, "No puede ser futuro");
    valid = false;
  }

  if (!valid) {
    render("--", "--", "--");
    return;
  }

  const { years, months, days } = calculateAge(y, m, d);
  animateNumbers({ years, months, days });
});


function render(yy, mm, dd) {
  yearsOut.textContent = yy;
  monthsOut.textContent = mm;
  daysOut.textContent = dd;
}


function animateNumbers({ years, months, days }) {
  const duration = 700; // ms
  const start = performance.now();

  const from = {
    years: 0, months: 0, days: 0
  };

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    render(
      Math.floor(from.years + t * (years - from.years)),
      Math.floor(from.months + t * (months - from.months)),
      Math.floor(from.days + t * (days - from.days))
    );
    if (t < 1) requestAnimationFrame(frame);
    else render(years, months, days);
  }
  requestAnimationFrame(frame);
}
