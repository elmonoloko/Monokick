const juegos = {
  genshin: { max: 160, minutosPorUnidad: 8, tiempoInicio: null },
  wuthering: { max: 240, minutosPorUnidad: 6, tiempoInicio: null },
  zenless: { max: 240, minutosPorUnidad: 6, tiempoInicio: null },
};

// Función para guardar la stamina y la hora de inicio
function guardarStamina(juego) {
  const input = document.getElementById(`${juego}-stamina`);
  const stamina = parseInt(input.value);
  const data = juegos[juego];

  if (isNaN(stamina) || stamina < 0 || stamina > data.max) {
    alert("Introduce una stamina válida.");
    return;
  }

  data.tiempoInicio = new Date();  // Guardar la hora de inicio
  actualizar(juego); // Actualizar el contador inmediatamente
}

// Función para actualizar la stamina y la cuenta regresiva
function actualizar(juego) {
  const output = document.getElementById(`${juego}-output`);
  const data = juegos[juego];

  if (!data.tiempoInicio) {
    output.innerHTML = "<em>Introduce tu stamina para comenzar.</em>";
    return;
  }

  const ahora = new Date();
  const minutosPasados = Math.floor((ahora - data.tiempoInicio) / 60000);
  const cantidad = Math.min(data.max, Math.floor(minutosPasados / data.minutosPorUnidad));
  const restante = Math.max(0, data.max - cantidad);

  // Calcular el tiempo restante en minutos y convertirlo a horas, minutos y segundos
  const tiempoRestante = restante * data.minutosPorUnidad;
  const horas = Math.floor(tiempoRestante / 60);
  const minutos = Math.floor(tiempoRestante % 60);
  const segundos = Math.floor((ahora - new Date(ahora)) / 1000) % 60;

  output.innerHTML = ` 
    <strong>Stamina actual:</strong> ${cantidad} / ${data.max}<br>
    <strong>Tiempo restante:</strong> ${horas}h ${minutos}m ${segundos}s
  `;
}

// Función para actualizar todos los contadores
function actualizarTodo() {
  for (const juego in juegos) {
    actualizar(juego);
  }
}

// Ejecutar la actualización cada segundo
setInterval(actualizarTodo, 1000); // cada segundo

// Primera actualización al cargar
window.onload = () => {
  for (const juego in juegos) {
    const input = document.getElementById(`${juego}-stamina`);
    input.value = "";  // Deja el input vacío cuando se recarga la página
  }
};

