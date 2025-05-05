const juegos = {
  genshin: { max: 160, minutosPorUnidad: 8, tiempoInicio: null, stamina: 0 },
  wuthering: { max: 240, minutosPorUnidad: 6, tiempoInicio: null, stamina: 0 },
  zenless: { max: 240, minutosPorUnidad: 6, tiempoInicio: null, stamina: 0 },
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

  data.stamina = stamina; // Guardar la stamina inicial
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
  const minutosPasados = Math.floor((ahora - data.tiempoInicio) / 60000);  // minutos transcurridos
  const cantidad = Math.min(data.max, data.stamina + Math.floor(minutosPasados / data.minutosPorUnidad)); // Sumar la stamina en base al tiempo transcurrido
  const restante = Math.max(0, data.max - cantidad);  // Cuánto falta para llegar al máximo de stamina

  // Calcular el tiempo restante en minutos
  const tiempoRestante = restante * data.minutosPorUnidad;

  output.innerHTML = ` 
    <strong>Stamina actual:</strong> ${cantidad} / ${data.max}<br>
    <strong>Tiempo restante:</strong> ${tiempoRestante} minutos
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
