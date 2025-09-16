// Referencias a elementos
const registroDiv = document.getElementById("registro");
const encuestaDiv = document.getElementById("encuesta");
const btnRegistro = document.getElementById("btnRegistro");

// Si ya hay datos guardados, saltamos el registro
if (localStorage.getItem("nombre") && localStorage.getItem("correo")) {
  registroDiv.style.display = "none";
  encuestaDiv.style.display = "block";
}

// Cuando el usuario se registra
btnRegistro.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  if (nombre && correo) {
    // Guardamos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);

    // Ocultamos el registro y mostramos las caritas
    registroDiv.style.display = "none";
    encuestaDiv.style.display = "block";
  } else {
    alert("Por favor llena ambos campos.");
  }
});

// ----------------------
// Lógica de las caritas
// ----------------------
const botones = document.querySelectorAll(".emoji");

// Creamos un elemento para mostrar el mensaje
const mensaje = document.createElement("p");
mensaje.style.marginTop = "20px";
mensaje.style.fontSize = "1.2rem";
mensaje.style.fontWeight = "bold";
document.body.appendChild(mensaje);

// Evento para cada carita
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const estado = boton.querySelector("span").textContent;
    const emoji = boton.textContent.trim().charAt(0);
    const nombre = localStorage.getItem("nombre") || "Usuario";

    mensaje.textContent = `${nombre}, elegiste ${estado} ${emoji}`;
  });
});
