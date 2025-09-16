// Referencias a elementos
const registroDiv = document.getElementById("registro");
const encuestaDiv = document.getElementById("encuesta");
const btnRegistro = document.getElementById("btnRegistro");
const botones = document.querySelectorAll(".emoji");
const comentarioInput = document.getElementById("comentario");
const btnGuardar = document.getElementById("guardar");

// Si ya hay datos guardados de usuario, saltamos el registro
if (localStorage.getItem("nombre") && localStorage.getItem("correo")) {
  registroDiv.style.display = "none";
  encuestaDiv.style.display = "block";
}

// Registro de usuario
if (btnRegistro) {
  btnRegistro.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    if (nombre && correo) {
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("correo", correo);

      registroDiv.style.display = "none";
      encuestaDiv.style.display = "block";
    } else {
      alert("Por favor llena ambos campos.");
    }
  });
}

// Variable temporal para guardar el estado elegido
let estadoElegido = "";

// Evento para elegir carita
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    estadoElegido = boton.querySelector("span").textContent;
    const emoji = boton.textContent.trim().charAt(0);
    const nombre = localStorage.getItem("nombre") || "Usuario";

    alert(`${nombre}, elegiste ${estadoElegido} ${emoji}`);
  });
});

// Guardar estado + comentario
if (btnGuardar) {
  btnGuardar.addEventListener("click", () => {
    const comentario = comentarioInput.value;
    const fecha = new Date().toLocaleString();

    if (!estadoElegido) {
      alert("Primero selecciona una carita 🙂");
      return;
    }

    const registro = {
      nombre: localStorage.getItem("nombre"),
      correo: localStorage.getItem("correo"),
      estado: estadoElegido,
      comentario: comentario,
      fecha: fecha
    };

    // Guardamos en localStorage (historial)
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(registro);
    localStorage.setItem("historial", JSON.stringify(historial));

    alert("✅ Respuesta guardada con éxito");
    comentarioInput.value = ""; // limpiar comentario
  });
}
