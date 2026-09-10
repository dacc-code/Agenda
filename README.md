# Agenda Personal Interactiva

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Agenda de tareas 100% frontend con JavaScript vanilla: crear, editar, completar y eliminar tareas con persistencia en `localStorage` del navegador. Sin dependencias, sin build, sin backend.

## Problema que resuelve

Gestionar tareas personales (título, descripción, fecha) desde una página estática que funciona con doble clic, guardando los datos localmente sin servidor ni cuenta.

## Características

- Alta de tareas con validación (campos requeridos, fecha no pasada)
- Edición (carga la tarea al formulario y la reemplaza al guardar)
- Completar / reabrir con un clic (✅ / ↩️)
- Eliminación con confirmación (`confirm`)
- Filtros todas / completadas / pendientes (vía botones `.filters`)
- Persistencia en `localStorage` (clave `tareas`)
- Estado visual por fila (clase `completed`, emojis ✅ / ⌛)

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Estructura | HTML5 (`index.html`) |
| Estilos | CSS puro (`styles.css`, gradiente + Poppins/Arial) |
| Lógica | JavaScript vanilla (`app.js`, sin dependencias) |
| Persistencia | `localStorage` del navegador |
| Control de versiones | Git + GitHub |

## Arquitectura

```text
form#taskForm → validación → tareas[] → localStorage("tareas")
renderizarTareas(filtro) → <tr> por tarea (título, descripción, fecha, estado, acciones)
botones .filters [data-filter] → all / completed / pending
```

- `tareas`: arreglo de `{titulo, descripcion, fecha, completada}`.
- `guardarTareas()`: serializa a `localStorage`.
- `renderizarTareas(filtro)`: reconstruye el `tbody` y re-enlaza edit/toggle/delete por fila.

## Instalación

Sin requisitos (cero dependencias).

```bash
git clone https://github.com/dacc-code/Agenda.git
cd Agenda
```

## Uso

Abrir `index.html` en el navegador (doble clic o `python3 -m http.server`).

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Screenshots / Demo

- TODO: agregar captura (`docs/screenshot.png`) y URL de demo (ej. GitHub Pages) si existe.

## API

No aplica — sin backend ni endpoints.

## Testing

Sin suite automatizada. Verificación manual:

1. Agregar tarea con fecha futura → aparece en la tabla y persiste al recargar.
2. Fecha pasada → alerta "La fecha no puede ser pasada."
3. Toggle ✅/↩️, editar ✏️, eliminar 🗑️ (pide confirmación).
4. Filtros all/completed/pending.

- TODO: tests de la lógica pura (validación de fecha, filtros) + CI con `node --check app.js`.

## Deployment

Página estática: sirve los 3 archivos con cualquier hosting estático (GitHub Pages, Netlify, Nginx).

## Seguridad

- Sin backend ni credenciales; datos solo en el `localStorage` del propio navegador.
- Nota: los títulos/descripciones se insertan con `innerHTML` — TODO: escapar HTML para evitar XSS si se pega contenido con etiquetas.
- No commitear secretos (ver `.gitignore`).

## Calidad y notas conocidas

- TODO: el `thead` declara 4 columnas pero las filas renderizan 5 celdas (falta `<th>Estado</th>`).
- TODO: verificar que existan los botones `.filters` con `data-filter` (el JS los espera).

## Licencia

MIT — ver [LICENSE](LICENSE).
