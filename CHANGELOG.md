# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 01-03-2026

### 🎉 Lanzamiento Inicial

¡Bienvenido a Shameful Startups API! Esta es la versión 1.0.0 con todas las features necesarias para explorar el ecosistema de startups... vergonzosas.

### ✨ Features

#### Endpoints de Startups
- `GET /api/startups` - Listar startups con paginación
  - Soporte para `page` y `limit` query params
  - Filtrado por `industry` 
  - Filtrado por `min_shame` (nivel de vergüenza mínimo)
- `GET /api/startups/:id` - Obtener detalle de startup por ID
- `GET /api/startups/random` - Obtener una startup aleatoria (para max shock)
- `GET /api/startups/top/shame` - Top startups por vergüenza
  - Soporte para `limit` y `min_shame` params
- `GET /api/startups/top/funding` - Top startups por financiación ficticia
  - Incluye total de funding calculado
- `GET /api/startups/search?q=` - Búsqueda de startups
  - Busca en nombre, descripción e idea_real
  - Soporta highlight de coincidencias
- `POST /api/startups` - Crear nueva startup
  - Validación de campos requeridos
  - Validación de "vergüenza mínima" (shame_level >= 5)
  - Filtro de palabras positivas ("útil", "exitoso", etc.)
  - Persistencia en JSON

#### Endpoints de Catálogos
- `GET /api/industries` - Listar todas las industrias con conteo
- `GET /api/founders` - Listar todos los fundadores
- `GET /api/founders/:id` - Detalle de fundador por ID
- `GET /api/ideas` - Listar ideas/episodios
- `GET /api/ideas/:id` - Detalle de idea por ID

#### Endpoints de Sistema
- `GET /api/stats` - Estadísticas globales
  - Total de startups
  - Funding total ficticio
  - Promedio de shame level
- `GET /api/timeline` - Línea de tiempo de fracasos (ordenado por año)
- `GET /api/health` - Health check del servidor
- `GET /api` - Información general de la API
- `GET /api-docs` - Documentación Swagger interactiva

### 🛡️ Seguridad

- **Rate Limiting**: 100 requests/minuto por IP
  - Implementado con `express-rate-limit`
  - Respuestas con código 429 cuando se excede

### 📚 Documentación

- **README.md**: Documentación completa con:
  - Badges de npm, Node.js y licencia
  - Tabla de contenidos
  - Descripción del proyecto
  - Características principales
  - Guía de instalación
  - Configuración de variables de entorno
  - Todos los endpoints documentados
  - Sección de rate limiting
  - Códigos de respuesta HTTP
  - Ejemplos de uso con curl
  - Guía de desarrollo
  - Contribución
  - Changelog
  - Licencia MIT
  - Startups destacadas

- **swagger.yaml**: Documentación OpenAPI 3.0
  - Todos los endpoints documentados
  - Descripciones de parámetros
  - Códigos de respuesta HTTP
  - Esquemas de request/response
  - Ejemplos

- **CONTRIBUTING.md**: Guía para contribuidores
  - Código de conducta
  - Cómo reportar bugs
  - Estándares de código
  - Convenciones de commits
  - Proceso de Pull Request
  - Guía para agregar nuevas startups

### 🔧 Infraestructura

- **Runtime**: Node.js 18+
- **Framework**: Express 5.x
- **Dependencias**:
  - `express`: ^5.2.1 - Framework web
  - `express-rate-limit`: ^8.3.1 - Rate limiting
  - `swagger-ui-express`: ^5.0.1 - Documentación Swagger
  - `yamljs`: ^0.3.0 - Parser de YAML
- **Dev Dependencies**:
  - `nodemon`: ^3.1.14 - Auto-reload en desarrollo

### 📦 Datos

- **startups.json**: 22 startups iniciales en categorías:
  - Crypto/Blockchain (la mayoría)
  - FoodTech
  - FinTech
  - HealthTech
  - Social Media
  - Y más...

### 🎭 Startups Incluidas (Highlights)

| ID | Nombre | Shame |
|----|--------|-------|
| 2 | Blockchain para sandwiches | 🔥 10 |
| 6 | Uber pero para heces | 🔥 10 |
| 12 | Crowdfunding para comprar el sol | 🔥 10 |
| 19 | VPN para conectarse desde el cielo | 🔥 10 |
| 18 | Suscripción para respirar aire limpio | 🔥 9 |
| 1 | Uber para perros | 🔥 9 |

---

## [0.0.0] - Pre-release

*Era una vez, en un mundo donde las startups prometían resolver todo con blockchain...*

Versión inicial del proyecto. Antes de que existiera la vergüenza, solo había esperanza (y muchas preguntas sin respuesta).

---

<div align="center">

¿Encontraste un bug? ¿Tienes una startup más vergonzosa?
¡Abre un Issue o PR!

*La vergüenza nunca termina.* 🔥

</div>
