# 🚀 REST API Testing Framework | Playwright & TypeScript

Framework de automatización de pruebas **100% enfocado en APIs REST**, desarrollado con **Playwright** y **TypeScript**. Diseñado para validar tanto el ciclo de vida completo de recursos (**CRUD**) como la integridad de datos, contratos de esquemas, manejo de arreglos y escenarios de error HTTP.

---

## 📌 Sobre las APIs de Pruebas Utilizadas

Para garantizar la cobertura de diferentes arquitecturas y comportamientos en servicios web, este proyecto utiliza dos de los servicios de simulación (mock APIs) más reconocidos en la industria:

* **ReqRes (`https://reqres.in`)**: Un servicio simulación de API REST pensado para probar peticiones HTTP reales de front-end y backend. Soporta el ciclo de vida de recursos completo (**POST**, **GET**, **PUT**, **DELETE**), incluyendo simulación de autenticación, páginas de resultados y códigos de respuesta estándar como **201 Created** y **204 No Content**.
* **JSONPlaceholder (`https://jsonplaceholder.typicode.com`)**: Una API REST pública falsa ampliamente utilizada para pruebas y prototipado. Proporciona grandes volúmenes de datos sintéticos (como listas de tareas, usuarios y publicaciones), siendo ideal para validar **contratos de datos**, verificación de tipos (`TypeScript`), filtrado de arreglos masivos y respuestas de error como **404 Not Found**.

---

## 📌 Sobre la Suite de Pruebas

Este proyecto demuestra un enfoque modularizado para la automatización de pruebas de backend, separando la lógica de negocio y las pruebas por dominios de servicio para evitar acoplamientos y garantizar ejecuciones rápidas y aisladas.

### Características Principales:
* **Pruebas de Ciclo de Vida CRUD:** Automatización de flujos completos de creación, consulta, actualización y eliminación de recursos.
* **Validación de Contratos y Esquemas:** Comprobación estricta de tipos de datos (`typeof`), presencia de propiedades clave y coherencia en las estructuras JSON.
* **API Chaining & Persistencia:** Captura dinámica de datos en memoria entre llamadas HTTP (ej. consulta previa para reporte de eliminación).

---

## 🛠️ Tech Stack & Herramientas

* **Lenguaje:** TypeScript
* **Herramienta de API:** Playwright Test (API Testing Fixtures / `APIRequestContext`)
* **Reportes:** Allure Report & Playwright HTML Report
* **Gestión de Entorno:** `.env` (`dotenv`)
* **Estándar de Calidad:** Reglas de validación inspiradas en SonarQube para pruebas automatizadas

---

## 📌 Resumen Técnico & Buenas Prácticas

* **Aislamiento por Dominios:** Manejo de URLs base delimitadas dentro de cada suite para permitir ejecuciones independientes entre distintos servidores mock.
* **Manejo Estricto de HTTP Status:** Verificación rigurosa de códigos `200 OK`, `201 Created`, `204 No Content` y `404 Not Found`.
* **Procesamiento Eficiente de Respuestas Vacías:** Control explícito de respuestas `204` previniendo errores de parsing de JSON vacíos (`Unexpected end of JSON input`).
* **Análisis Avanzado de Arreglos:** Uso de funciones nativas de TypeScript (`filter`, `length`) para procesar colecciones masivas de datos y asegurar volumen e integridad.
* **Estrategia Desacoplada de UI:** Configuración de Playwright purificada sin renderizado de navegadores web (`chromium`, `firefox`, `webkit`), reduciendo significativamente los tiempos de ejecución.

---

## 🧪 Cobertura de Pruebas

### 🔄 Suite CRUD (`01-reqres-crud.spec.ts`)
Pruebas integrales utilizando la API de **ReqRes**:
* **`1. POST - Crear usuario`:** Creación de registros enviando payloads JSON y validación del código `201 Created` junto con campos auto-generados (`id`, `createdAt`).
* **`2. GET - Consultar usuario específico`:** Verificación de propiedades anidadas dentro del objeto envolvente `.data`.
* **`3. PUT - Actualizar datos de usuario`:** Reemplazo de información de usuario existente y confirmación de actualización con respuesta `200 OK`.
* **`4. DELETE - Eliminar usuario`:** Implementación de **API Chaining** (extracción previa de datos por `GET` antes del borrado) y aserción de eliminación limpia mediante `204 No Content`.

### 📑 Suite de Contrato e Integridad (`02-jsonplaceholder-get.spec.ts`)
Pruebas de estructura y límites utilizando la API de **JSONPlaceholder**:
* **`1. GET - Validar contrato de un recurso`:** Validación de la estructura del modelo `Todo` y chequeo de tipos booleanos y numéricos.
* **`2. GET - Validar volumen y datos masivos`:** Verificación de colecciones de 200 elementos, validación de estado con `Array.isArray` y categorización lógica de tareas completadas/incompletas.
* **`3. GET - Validar escenario negativo`:** Consulta de recursos inexistentes (`/todos/99999`) certificando la devolución correcta del código de error `404 Not Found`.

---

## 🏗️ Estructura del Proyecto

```text
JSON-placeholder/
├── allure-results/                       # Resultados de ejecución generados por Allure
├── tests/                                # Suites de pruebas automatizadas
│   ├── 01-reqres-crud.spec.ts            # Suite de ciclo de vida completo (CRUD)
│   └── 02-jsonplaceholder-get.spec.ts    # Suite de contratos, volumen y errores HTTP
├── .env                                  # Variables de entorno locales
├── package.json                          # Scripts de ejecución y dependencias del proyecto
├── playwright.config.ts                  # Configuración global del runner (Proyectos API, Allure, Headers)
└── README.md                             # Documentación principal del proyecto