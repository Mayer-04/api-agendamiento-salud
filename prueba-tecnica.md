# PRUEBA TÉCNICA BACKEND: HealthTech Scheduling API

**Rol:** Backend Developer (**Node.js** / **Bun** / **Deno**)
**Nivel:** Mid
**Tiempo estimado:** 4 - 6 horas

---

## 1. INTRODUCCIÓN Y REGLAS

Bienvenido al reto técnico de **HealthTech**. Buscamos evaluar no solo tu capacidad para escribir código, sino tu habilidad para diseñar **arquitecturas escalables**, manejar **lógica de negocio compleja** y asegurar la **integridad de los datos**.

### Reglas del juego

1. **Documentación:** Puedes utilizar toda la documentación oficial de las librerías y tecnologías.
2. **Originalidad:** No se permite el uso de soluciones generadas íntegramente por IA (ChatGPT/Copilot). Puedes usarlas para generar _boilerplate_ (código base), pero la **lógica de negocio** y las **consultas complejas** deben ser de tu autoría.
3. **Entrega:** Repositorio público (**GitHub** / **GitLab**).

---

## 2. CONTEXTO DEL NEGOCIO

Estás construyendo el núcleo backend para una plataforma de gestión médica. El sistema debe gestionar médicos, pacientes y, lo más importante, **citas médicas asegurando que no existan conflictos de horario**.

El sistema debe ser capaz de:

1. Gestionar la **disponibilidad** de los médicos.
2. Agendar citas validando estrictamente que el médico esté **libre**.
3. Generar **reportes de rendimiento** utilizando capacidades avanzadas de la base de datos.

---

## 3. REQUISITOS TÉCNICOS

- **Runtime:** Cualquier entorno de ejecución de JavaScript (**Node.js**, **Deno** o **Bun**).
- **Framework Web:** **Express.js**.
- **Base de Datos:** **MongoDB** (usando **Mongoose** como ODM).
- **Validación de Datos:** Uso obligatorio de una librería de esquemas (**Joi**, **Zod** o **express-validator**) para validar las entradas del usuario antes de tocar la base de datos.

### Arquitectura Esperada

Se espera una separación de responsabilidades clara. **No incluyas lógica de negocio dentro de los controladores**.

**Estructura sugerida:**

```text
src/
 ├── config/         # Configuración de DB y variables de entorno
 ├── controllers/    # Manejo de Request/Response
 ├── services/       # Lógica de negocio pura (validaciones, cálculos)
 ├── models/         # Esquemas de Mongoose
 ├── routes/         # Definición de endpoints
 ├── utils/          # Manejo de errores, helpers
 └── app.js
```

---

## 4. MODELOS A IMPLEMENTAR

### 4.1. Doctor

- `nombre` (string, **requerido**).
- `especialidad` (string, **requerido**. Ej: "Cardiología", "Pediatría").
- `matricula` (string, **único**, **requerido**).
- `horarioLaboral`: Define un objeto o array que indique sus horas de trabajo (Ej: Start: "08:00", End: "17:00").

### 4.2. Patient

- `nombre` (string, **requerido**).
- `seguroMedico` (string, opcional).
- `telefono` (string).

### 4.3. Appointment

- `doctorId` (**Ref a Doctor**, **requerido**).
- `patientId` (**Ref a Paciente**, **requerido**).
- `fechaHora` (**Date**, **requerido** - Formato **ISO** completo).
- `estado` (String: Enum [`'PROGRAMADA'`, `'COMPLETADA'`, `'CANCELADA'`], default: `'PROGRAMADA'`).

---

## 5. RESUMEN DE ENDPOINTS A IMPLEMENTAR

Para completar el reto, debes implementar los siguientes endpoints:

1. **`POST /doctors`**: Registro de médicos.
2. **`POST /patients`**: Registro de pacientes.
3. **`POST /appointments`**: Agendamiento de citas con validación de **horarios** y **conflictos**.
4. **`PATCH /appointments/:id/cancel`**: Cancelación de citas (libera el espacio).
5. **`GET /doctors/:id/performance`**: Reporte avanzado utilizando **Aggregation Framework**.

---

## 6. DETALLE DE LÓGICA Y ENDPOINTS (CORE CHALLENGE)

### Gestión Básica

- `POST /doctors`: Registrar médico.
- `POST /patients`: Registrar paciente.

### Agendamiento Inteligente

- `POST /appointments`
  - **Recibe:** `doctorId`, `patientId`, `fechaHora`.
  - **Validación 1 (Horario):** La cita debe estar dentro del `horarioLaboral` del médico.
  - **Validación 2 (Disponibilidad):** Verificar que el médico **NO** tenga otra cita activa en ese mismo horario (o en un rango de **+/- 30 minutos**).
  - **Respuesta:** Si hay conflicto, devolver **409 (Conflict)** con mensaje claro. Si es exitoso, **201**.

### Manipulación de Estado

- `PATCH /appointments/:id/cancel`
  - Cambia el estado a **CANCELADA**. Esto libera el espacio para que otra persona pueda reservar.

---

## 7. LÓGICA ESPECIAL: REPORTES AVANZADOS

Implementa un endpoint que use **MongoDB Aggregation Framework** (`$lookup`, `$unwind`, `$group`, `$project`). No uses `populate` aquí, queremos ver tu destreza con la base de datos.

- `GET /doctors/:id/performance`
  - Debe devolver un resumen del médico que incluya:
    - Datos del médico.
    - Total de citas **COMPLETADA** históricas.
    - Total de citas **CANCELADA**.
    - Listado de sus **próximos pacientes** (nombres y fechas futuras).

**Ejemplo de respuesta esperada:**

```json
{
  "medico": "Dr. House",
  "especialidad": "Diagnóstico",
  "estadisticas": {
    "citas_completadas": 45,
    "citas_canceladas": 2
  },
  "proximos_pacientes": [
    { "paciente": "Juan", "fecha": "2024-01-20T10:00:00Z" },
    { "paciente": "Maria", "fecha": "2024-01-20T11:00:00Z" }
  ]
}
```

---

## 8. BONUS POINTS (DIFERENCIADORES SENIOR)

Si quieres destacar, implementa uno o más de los siguientes (opcional):

1. **Transacciones ACID:** Usa `mongoose.startSession()` al crear la cita para asegurar atomicidad.
2. **Docker:** Incluye un `Dockerfile` y `docker-compose.yml` para levantar la API y la DB con un comando.
3. **Testing:** Crea un test unitario con **Jest**, **Supertest** o el **test runner nativo** (de Bun o Node) para la lógica de colisión de horarios.

---

## 9. ENTREGABLES

Repositorio público en GitHub/GitLab conteniendo:

1. **Código fuente** limpio y organizado.
2. **README.md profesional:**
   - Instrucciones de instalación.
   - Explicación breve de la resolución del problema de colisión de horarios.
   - Colección de Postman o ejemplos cURL/JSON.
