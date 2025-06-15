const juegos = {
  genshin: { max: 160, minutosPorUnidad: 8, tiempoInicio: null, stamina: 0 },
  wuthering: { max: 240, minutosPorUnidad: 6, tiempoInicio: null, stamina: 0 },
  zenless: { max: 240, minutosPorUnidad: 6, tiempoInicio: null, stamina: 0 },
};

function guardarStamina(juego) {
  const input = document.getElementById(`${juego}-stamina`);
  const stamina = parseInt(input.value);
  const data = juegos[juego];

  if (isNaN(stamina) || stamina < 0 || stamina > data.max) {
    alert("Introduce una stamina válida.");
    return;
  }

  data.stamina = stamina;
  data.tiempoInicio = new Date();
  actualizar(juego);
}

function actualizar(juego) {
  const output = document.getElementById(`${juego}-output`);
  const data = juegos[juego];

  if (!data.tiempoInicio) {
    output.innerHTML = "<em>Introduce tu stamina para comenzar.</em>";
    return;
  }

  const ahora = new Date();
  const tiempoMinutosSegundos = data.minutosPorUnidad * 60;
  const tiempoTranscurridoSegundos = (ahora - data.tiempoInicio) / 1000;

  // Cuántos puntos de stamina se han recuperado desde tiempoInicio
  const puntosRecuperados = Math.floor(tiempoTranscurridoSegundos / tiempoMinutosSegundos);
  const nuevaStamina = Math.min(data.max, data.stamina + puntosRecuperados);

  if (nuevaStamina > data.stamina) {
    // Actualizar stamina y reiniciar tiempoInicio para el cálculo siguiente
    data.stamina = nuevaStamina;
    // Ajustar tiempoInicio para que empiece a contar desde el último incremento
    data.tiempoInicio = new Date(data.tiempoInicio.getTime() + puntosRecuperados * tiempoMinutosSegundos * 1000);
  }

  const restante = Math.max(0, data.max - data.stamina);
  const segundosDesdeUltimoIncremento = tiempoTranscurridoSegundos % tiempoMinutosSegundos;
  const segundosParaSiguiente = Math.ceil(tiempoMinutosSegundos - segundosDesdeUltimoIncremento);

  // Convertir segundos para mostrar hh:mm:ss
  const horas = Math.floor(segundosParaSiguiente / 3600);
  const minutos = Math.floor((segundosParaSiguiente % 3600) / 60);
  const segundos = segundosParaSiguiente % 60;

  const tiempoRestanteTotal = restante * data.minutosPorUnidad;
  const horasTotal = Math.floor(tiempoRestanteTotal / 60);
  const minutosTotal = tiempoRestanteTotal % 60;

  output.innerHTML = `
    <strong>Stamina actual:</strong> ${data.stamina} / ${data.max}<br>
    <strong>Tiempo para siguiente punto:</strong> ${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}<br>
    <strong>Tiempo total para llenar:</strong> ${horasTotal}h ${minutosTotal}m
  `;
}

function actualizarTodo() {
  for (const juego in juegos) {
    actualizar(juego);
  }
}

setInterval(actualizarTodo, 1000);

window.onload = () => {
  for (const juego in juegos) {
    document.getElementById(`${juego}-stamina`).value = "";
  }
};

// Tema claro/oscuro
function toggleModo() {
  document.body.classList.toggle("light-mode");
  const btn = document.querySelector(".top-button");
  btn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}
