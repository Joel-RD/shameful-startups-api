# Shameful Startups API 🌟

> *Porque no todas las startups cambian el mundo... algunas simplemente lo hacen más vergonzoso.*

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![API](https://img.shields.io/badge/API-Blue?style=flat&logo=apirest&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-C69320?style=flat&logo=swagger&logoColor=white)


## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Endpoints](#endpoints)
- [Rate Limiting](#rate-limiting)
- [Códigos de Respuesta HTTP](#códigos-de-respuesta-http)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Desarrollo](#desarrollo)
- [Contribuir](#contribuir)
- [Changelog](#changelog)
- [Licencia](#licencia)

---

## Descripción

**Shameful Startups API** es una API RESTful que sirve datos en memoria sobre startups... vergonzosas. Porque en un mundo lleno de Uber para perros y Blockchain para sandwiches, alguien tenía que documentar tanto cringe.

Esta API proporciona endpoints para explorar un catálogo de startups que definitivamente no recibirán inversión de Sequoia Capital, pero que definitivamente nos hacen preguntarnos: *"¿En qué estaban pensando?"*

### Propósito

- 🎓 **Educacional**: Aprender sobre APIs REST con Express.js
- 😄 **Entretenimiento**: Ríete de las ideas más absurdas del ecosistema startup
- 🧪 **Testing**: Usa esta API para probar tus habilidades de desarrollo

---

## Características

| Característica | Descripción |
|----------------|-------------|
| 📄 **API RESTful** | Endpoints bien estructurados siguiendo las mejores prácticas |
| 📊 **Paginación** | Soporte para paginar resultados con `page` y `limit` |
| 🔍 **Búsqueda** | Busca startups por nombre, descripción o idea |
| 🏆 **Rankings** | Top por vergüenza (shame level) y financiación |
| 🎲 **Aleatorio** | Obtén una startup aleatoria para max shock |
| 📈 **Estadísticas** | Stats globales sobre la vergüenza acumulada |
| 📖 **Swagger** | Documentación interactiva en `/api-docs` |
| 🛡️ **Rate Limiting** | Protección contra abusos (100 req/min) |
| 💾 **Persistencia** | Los datos se guardan en JSON local |

---

## Instalación

### Prerrequisitos

- Node.js 18+ 
- npm 9+

### Pasos

```bash
# Clona el repositorio (o usa el código existente)
cd shameful-startups-api

# Instala las dependencias
npm install

# Inicia el servidor
npm start
```

El servidor arrancará en: `http://localhost:3000`

---

## Configuración

### Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno (development/production) | `development` |

Ejemplo `.env`:
```env
PORT=3000
NODE_ENV=development
```

---

## Endpoints

### Startups

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/startups` | Lista todas las startups (paginada) |
| `GET` | `/api/startups/:id` | Obtiene una startup por ID |
| `GET` | `/api/startups/random` | Startup aleatoria |
| `GET` | `/api/startups/top/shame` | Top startups por vergüenza |
| `GET` | `/api/startups/top/funding` | Top startups por funding |
| `GET` | `/api/startups/search?q=` | Busca startups |
| `POST` | `/api/startups` | Crea una nueva startup |

### Catálogos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/industries` | Lista todas las industrias |
| `GET` | `/api/founders` | Lista todos los fundadores |
| `GET` | `/api/founders/:id` | Detalle de un fundador |
| `GET` | `/api/ideas` | Lista todas las ideas/episodios |
| `GET` | `/api/ideas/:id` | Detalle de una idea |

### Sistema

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/stats` | Estadísticas globales |
| `GET` | `/api/timeline` | Línea de tiempo de fracasos |
| `GET` | `/api/health` | Health check |
| `GET` | `/api` | Información de la API |
| `GET` | `/api-docs` | Documentación Swagger |

---

## Rate Limiting

🛡️ **Protección activada**: Máximo **100 solicitudes por minuto** por IP.

```json
{
  "error": "Demasiadas solicitudes",
  "message": "Límite: 100 requests por minuto",
  "retryAfter": 42
}
```

Si excedes el límite, recibirás un código `429 Too Many Requests`. 
*Respira. Cuenta hasta 60. Y vuelve.*

---

## Códigos de Respuesta HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| `200` | ✅ OK | La solicitud fue exitosa |
| `201` | ✅ Created | Recurso creado exitosamente |
| `400` | ❌ Bad Request | Solicitud inválida o parámetros faltantes |
| `404` | ❌ Not Found | Recurso no encontrado |
| `422` | ❌ Unprocessable Entity | La startup es "demasiado buena" (shame_level < 5 o contiene palabras positivas) |
| `429` | ⏳ Too Many Requests | Límite de rate limiting excedido |
| `500` | 💥 Internal Server Error | Error del servidor |

---

## Ejemplos de Uso

### 🚀 Obtener todas las startups (primera página)

```bash
curl /api/startups
```

### 🔍 Buscar startups de crypto con vergüenza mínima de 8

```bash
curl "/api/startups?industry=crypto&min_shame=8"
```

### 📄 Paginación - Página 2 con 5 resultados

```bash
curl "/api/startups?page=2&limit=5"
```

### 🎲 Obtener una startup aleatoria

```bash
curl /api/startups/random
```

### 🏆 Top 5 startups más vergonzosas

```bash
curl "/api/startups/top/shame?limit=5"
```

### 💰 Top 10 por financiación

```bash
curl "/api/startups/top/funding?limit=10"
```

### 🔍 Buscar por palabra clave

```bash
curl "/api/startups/search?q=blockchain"
```

### 📊 Obtener estadísticas globales

```bash
curl /api/stats
```

### 🏭 Crear una nueva startup vergonzosa

```bash
curl -X POST /api/startups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blockchain para sandwiches",
    "description": "Tus sandwiches ahora en la blockchain. Inmutable y ligeramente grasosa.",
    "industry": "FoodTech",
    "shame_level": 10,
    "founded": 2024,
    "idea_real": "Poner QR codes en sandwiches"
  }'
```

### 📚 Listar industrias

```bash
curl /api/industries
```

### 👥 Listar fundadores

```bash
curl /api/founders
```

### 📖 Obtener detalle de una startup específica

```bash
curl /api/startups/1
```

### 💚 Health check

```bash
curl /api/health
```

---

## Desarrollo

### Scripts Disponibles

```bash
npm start        # Inicia el servidor con nodemon (desarrollo)
npm run dev      # Alias para start
```

### Estructura del Proyecto

```
shameful-startups-api/
├── data/
│   └── startups.json      # Datos de startups (persistencia)
├── public/
│   └── (archivos estáticos)
├── routes/
│   ├── startups.js        # Endpoints de startups
│   ├── founders.js        # Endpoints de fundadores
│   ├── industries.js      # Endpoints de industrias
│   └── ideas.js           # Endpoints de ideas
├── server.js              # Servidor principal
├── swagger.yaml           # Definición OpenAPI
├── package.json           # Dependencias
└── README.md              # Este archivo
```

### Testing

```bash
# Si tienes tests configurados
npm test

# O ejecuta manualmente el archivo de tests
node test-endpoints.js
```

---

## Contribuir

¿Tienes una startup más vergonzosa que agregar? ¿Encontraste un bug? 
¡Las contribuciones son bienvenidas!

Consulta el archivo [CONTRIBUTING.md](./CONTRIBUTING.md) para guidelines detallados.

### Guías rápidas:

1. 🍴 Haz un fork del proyecto
2. 🌿 Crea una rama (`git checkout -b feature/nueva-startup`)
3. 🔨 Haz tus cambios
4. 📝 Commit con mensajes claros
5. 🚀 Push a tu fork
6. 🎫 Crea un Pull Request

---

## Changelog

Todos los cambios notables de este proyecto se documentan en [CHANGELOG.md](./CHANGELOG.md).

### Versión actual: 1.0.0 (2024)

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial completo.

---

## Startups Destacadas 🏆

| # | Nombre | Shame Level |
|---|--------|-------------|
| 2 | Blockchain para sandwiches | 🔥 10 |
| 6 | Uber pero para heces | 🔥 10 |
| 12 | Crowdfunding para comprar el sol | 🔥 10 |
| 19 | VPN para conectarse desde el cielo | 🔥 10 |
| 18 | Suscripción para respirar aire limpio | 🔥 9 |
| 1 | Uber para perros | 🔥 9 |

*¿Tu startup favorita no está? ¡Agrégala con un PR!*

---

## Licencia

**MIT** - Haz lo que quieras con esta vergüenza.

```
MIT License

Copyright (c) 2026 Shameful Startups API

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

Hecho con 😓 y muchas preguntas sin respuesta.

*¿Blockchain? ¿AI? ¿DAO? ¿Por qué no los tres?*

</div>
