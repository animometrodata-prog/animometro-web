// Seleccionamos todos los botones de emoji
const botones = document.querySelectorAll(".emoji");

// Creamos un elemento para mostrar el mensaje
const mensaje = document.createElement("p");
mensaje.style.marginTop = "20px";
mensaje.style.fontSize = "1.2rem";
mensaje.style.fontWeight = "bold";
document.body.appendChild(mensaje);

// Agregamos evento a cada botón
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    // Obtenemos el texto (ejemplo: "Motivado")
    const estado = boton.querySelector("span").textContent;
    const emoji = boton.textContent.trim().charAt(0);

    // Mostramos el mensaje
    mensaje.textContent = `Elegiste ${estado} ${emoji}`;
  });
});
