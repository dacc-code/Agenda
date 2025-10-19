const form = document.getElementById("taskForm");
const tablaBody = document.querySelector("#tablaTareas tbody");
const filterButtons = document.querySelectorAll(".filters button");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar las tareas en la tabla, según filtro actual
function renderizarTareas(filtro = "all") {
  tablaBody.innerHTML = "";
  tareas.forEach((tarea, index) => {
    if (
      filtro === "all" ||
      (filtro === "completed" && tarea.completada) ||
      (filtro === "pending" && !tarea.completada)
    ) {
      const fila = document.createElement("tr");
      if (tarea.completada) fila.classList.add("completed");

      fila.innerHTML = `
        <td>${tarea.titulo}</td>
        <td>${tarea.descripcion}</td>
        <td>${tarea.fecha}</td>
        <td>${tarea.completada ? "✅" : "⌛"}</td>
        <td>
          <button class="edit">✏️</button>
          <button class="toggle">${tarea.completada ? "↩️" : "✅"}</button>
          <button class="delete">🗑️</button>
        </td>
      `;

      // Editar
      fila.querySelector("button.edit").onclick = () => {
        document.getElementById("titulo").value = tarea.titulo;
        document.getElementById("descripcion").value = tarea.descripcion;
        document.getElementById("fecha").value = tarea.fecha;
        // eliminar la tarea para que al guardar quede la versión nueva
        tareas.splice(index, 1);
        guardarTareas();
        renderizarTareas(filtro);
      };

      // Marcar/completar o desmarcar
      fila.querySelector("button.toggle").onclick = () => {
        tarea.completada = !tarea.completada;
        guardarTareas();
        renderizarTareas(filtro);
      };

      // Eliminar
      fila.querySelector("button.delete").onclick = () => {
        if (confirm("¿Deseas eliminar esta tarea?")) {
          tareas.splice(index, 1);
          guardarTareas();
          renderizarTareas(filtro);
        }
      };

      tablaBody.appendChild(fila);
    }
  });
}

// Evento submit formulario
form.addEventListener("submit", e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const fecha = document.getElementById("fecha").value;

  if (!titulo || !descripcion || !fecha) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (new Date(fecha) < new Date().setHours(0,0,0,0)) {
    alert("La fecha no puede ser pasada.");
    return;
  }

  const nuevaTarea = {
    titulo,
    descripcion,
    fecha,
    completada: false
  };

  tareas.push(nuevaTarea);
  guardarTareas();
  renderizarTareas();
  form.reset();
});

// Eventos para filtros
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filtro = btn.getAttribute("data-filter");
    renderizarTareas(filtro);
  });
});

// Inicializar
window.onload = () => {
  renderizarTareas();
};
