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

// Variables para guardar selección
let estadoElegido = "";
let emojiElegido = "";

// Evento para elegir carita
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    // Quitar selección previa
    botones.forEach(b => b.classList.remove("seleccionado"));

    // Marcar este botón como seleccionado
    boton.classList.add("seleccionado");

    // Guardar estado y emoji de forma limpia
    estadoElegido = boton.querySelector("span").textContent;
    emojiElegido = boton.textContent.trim().split("\n")[0]; // toma el emoji sin basura

    const nombre = localStorage.getItem("nombre") || "Usuario";
    alert(`${nombre}, elegiste ${estadoElegido} ${emojiElegido}`);
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
      emoji: emojiElegido,
      comentario: comentario,
      fecha: fecha
    };

    // Guardamos en localStorage (historial interno del navegador)
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(registro);
    localStorage.setItem("historial", JSON.stringify(historial));

    // 🔹 Enviar también a Google Sheets usando tu URL
    fetch("https://script.google.com/macros/s/AKfycbzFm7M7d0Qz8CUSRpZ8fw2dTMoXui-AZtSii8smjI8AjW0sUHJW6YJKndcf6Sf5eBAY/exec", {
      method: "POST",
      body: JSON.stringify(registro),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      console.log("Enviado a Google Sheets:", data);
      alert("✅ Respuesta guardada en la nube");
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Hubo un problema al enviar a Google Sheets");
    });

    comentarioInput.value = ""; // limpiar comentario
  });
}
