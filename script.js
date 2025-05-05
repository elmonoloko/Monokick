const juegos = {
  genshin: { max: 160, minutosPorUnidad: 8 },
  wuthering: { max: 240, minutosPorUnidad: 6 },
  zenless: { max: 240, minutosPorUnidad: 6 },
};

// Función para actualizar la stamina y la cuenta regresiva
function actualizar(juego) {
  const output = document.getElementById(`${juego}-output`);
  const data = juegos[juego];

  const input = document.getElementById(`${juego}-stamina`);
  const stamina = parseInt(input.value);

  if (isNaN(stamina) || stamina < 0 || stamina > data.max) {
    output.innerHTML = "<em>Introduce una stamina válida para comenzar.</em>";
    return;
  }

  const ahora = new Date();
  const minutosPasados = Math.floor((ahora - new Date(ahora)) / 60000); // No guardamos datos, solo calculamos el tiempo real
  const cantidad = Math.min(data.max, Math.floor(minutosPasados / data.minutosPorUnidad));
  const restante = Math.max(0, data.max - cantidad);
  
  // Calcular el tiempo restante en minutos y convertirlo a horas, minutos y segundos
  const tiempoRestante = restante * data.minutosPorUnidad;
  const horas = Math.floor(tiempoRestante / 60);
  const minutos = Math.floor(tiempoRestante % 60);
  const segundos = Math.floor((ahora - new Date(ahora)) / 1000) % 60; // Obtener los segundos restantes

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
actualizarTodo();

// No es necesario guardar en localStorage ni cargar valores al inicio
window.onload = () => {
  for (const juego in juegos) {
    const input = document.getElementById(`${juego}-stamina`);
    input.value = "";  // Deja el input vacío cuando se recarga la página
  }
};

