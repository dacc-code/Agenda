# AGENTS.md — Instrucciones para agentes de IA (Agenda)

> Leer antes de modificar. Rama obligatoria: nunca commitear directo a `main`.

## Descripción

Agenda de tareas vanilla (materia web): `index.html` (39 líneas, form + tabla) + `styles.css` + `app.js` (109 líneas). CRUD con `localStorage` (clave `tareas`, objetos `{titulo, descripcion, fecha, completada}`). Cero dependencias, cero build, cero backend.

## Arquitectura

- `form#taskForm` (titulo/descripcion/fecha, `required`) → validación (completos + fecha no pasada) → `push` + `guardarTareas()` + `renderizarTareas()`.
- `renderizarTareas(filtro)`: filtra `all/completed/pending`, crea `<tr>` con 5 `<td>` y re-enlaza edit (carga al form + `splice`), toggle (`completada=!completada`), delete (`confirm` + `splice`).
- `botones .filters [data-filter]` → re-render. `window.onload` → render inicial.

## Comandos

Abrir `index.html` o servir estático:

```bash
python3 -m http.server 8000
node --check app.js   # validación de sintaxis (requiere Node)
```

Sin package manager, linter, tests ni CI.

## Estructura

```text
├── index.html   # form + tabla (39 líneas)
├── styles.css   # estilos (gradiente, Poppins/Arial)
├── app.js       # lógica CRUD + filtros + localStorage (109 líneas)
├── README.md
├── LICENSE      # MIT
└── AGENTS.md    # este archivo
```

## Convenciones

- Español en UI, mensajes (`alert`, `confirm`) y commits imperativos (`feat:`, `fix:`, `docs:`).
- Emojis como indicadores de estado (✅/⌛/✏️/↩️/🗑️).
- No inventar demo URLs, deploys ni features: lo no verificado va como `TODO`.

## Reglas de modificación

1. Rama `feat/*`, `fix/*`, `docs/*`, `chore/*`. Jamás a `main`.
2. `git status` + `git branch --show-current` antes de editar.
3. Cambios mínimos; no introducir frameworks/build sin aprobación.
4. Si cambia el modelo `{titulo, descripcion, fecha, completada}` o los filtros, actualizar README en el mismo PR.
5. Sin secretos: no hay backend ni credenciales; no introducir ninguno.

## Testing / Lint / Build

- Sin suite. Verificación mínima: `node --check app.js` + flujo manual (alta, fecha pasada, toggle, editar, eliminar, filtros, persistencia tras recarga).
- TODO: tests de validación/filtros + CI con `node --check`.
- Conocidos (no corregir sin aprobación): `thead` con 4 `<th>` vs filas de 5 `<td>`; botones `.filters` ausentes en `index.html`.

## Deployment

Estático puro: GitHub Pages / Netlify / Nginx / `python3 -m http.server`. No configurar servicios sin aprobación.

## Variables de entorno

Ninguna.

## IA (OpenCode implementa, Codex revisa)

- OpenCode: plan antes de implementar, solo en rama actual.
- Codex: clasificar CRITICAL/HIGH/MEDIUM/LOW/SUGGESTION. Bloquean merge: secretos, `innerHTML` con datos sin escapar introducido de nuevo, pérdida de persistencia, validación de fecha rota, docs falsas.
