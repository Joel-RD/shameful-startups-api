# Contributing to Shameful Startups API

¡Gracias por tu interés en contribuir! 🎉

Este documento establece las guías y estándares para contribuir a Shameful Startups API. 
Nuestro objetivo es mantener el proyecto divertido, pero también bien estructurado y mantenible.

---

## Código de Conducta

Al participar en este proyecto, te comprometes a mantener un ambiente:
- 🤝 Respetuoso e inclusivo
- 📚 De aprendizaje y colaboración
- 😄 Divertido (pero no a costa de otros)

**Por favor, sé amable.** Estamos aquí para reírnos de las startups malas, no de las personas.

---

## ¿Cómo Contribuir?

### 🐛 Reportando Bugs

1. **Busca primero**: Verifica si el bug ya ha sido reportado
2. **Usa el template**: Incluye la mayor información posible:
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Versión de Node.js y npm
   - Screenshots si aplica

### 💡 Sugiriendo Features

1. Verifica que no exista ya la feature
2. Piensa: ¿Esto hace la API más vergonzosa (de buena manera)?
3. Describe el caso de uso y beneficios

### 🍰 Pull Requests

**¡Todo PR es bienvenido!** Desde corregir un typo hasta agregar 50 startups nuevas.

---

## Estándares de Código

### ✨ Estilo General

- Usa **ES6+** (async/await, template literals, etc.)
- Usa **2 espacios** para indentación
- Usa **comentarios humorísticos** pero útiles
- Usa **nombres descriptivos** en español o inglés

### 📝 Commits

```
tipo: descripción breve

[opcional] cuerpo más detallado
```

**Tipos aceptados:**
- `feat`: Nueva feature (nueva startup, endpoint, etc.)
- `fix`: Bug fix
- `docs`: Documentación
- `chore`: Mantenimiento (deps, config)
- `refactor`: Refactorización
- `test`: Tests
- `cringe`: Para agregar startups especialmente vergonzosas 🎭

**Ejemplos:**
```
feat: agregar endpoint /api/startups/random
fix: corregir paginación cuando no hay resultados
docs: mejorar README con más ejemplos de curl
cringe: agregar startup de Uber para mascotas NFT
```

### 🌳 Ramas

- `main`: Producción (solo merges probados)
- `develop`: Desarrollo activo
- `feature/nombre`: Nuevas features
- `fix/nombre`: Bug fixes
- `cringe/nombre`: Nuevas startups vergonzosas

---

## Proceso de Pull Request

### Para Contribuidores

1. 🍴 Fork el proyecto
2. 🌿 Crea tu rama: `git checkout -b feature/nueva-startup`
3. 🔨 Haz tus cambios (con tests si es posible)
4. 📝 Commit con mensajes claros
5. 🚀 Push a tu fork
6. 🎫 Crea un Pull Request

### Para Maintainers

1. Revisa el PR dentro de 48 horas
2. Proporciona feedback constructivo
3. Merge cuando esté listo
4. ¡Celebra la nueva contribución! 🎉

---

## Agregando Nuevas Startups

¿Quieres agregar una startup vergonzosa? ¡Perfecto!

### Requisitos

- ✅ `name`: Nombre de la startup (mientras más cringe, mejor)
- ✅ `description`: Descripción humorística
- ✅ `industry`: Industria (crypto, fintech, foodtech, etc.)
- ✅ `shame_level`: Nivel 1-10 (mínimo 5 para ser aceptada)
- ✅ `founded`: Año de fundación (puede ser falso)
- ✅ `idea_real`: La "idea real" detrás de la startup

### Reglas

1. **Sin ofensas reales**: Las startups pueden ser absurdas, pero no ofensivas
2. **Evita nombres de empresas reales**: Usa versiones paródicas
3. **Mantén el tono humorístico pero profesional**

### Ejemplo de Startup

```json
{
  "id": 23,
  "name": "DAO para decidir qué ponerse",
  "description": "Una DAO que vota si te pones jeans o ropa interior.",
  "industry": "FashionTech",
  "funding": 5000000,
  "shame_level": 9,
  "founded": 2024,
  "idea_real": "Una app que no decide nada por ti"
}
```

---

## Preguntas Frecuentes

### ¿Puedo agregar tests?
**¡Sí!** Tests son bienvenidos. Usa el archivo `test-endpoints.js` como referencia.

### ¿Necesito configurar algo?
Solo Node.js 18+ y `npm install`. Nada de bases de datos.

### ¿El proyecto tiene un Slack/Discord?
No actualmente. Usa los Issues de GitHub para讨论.

### ¿Aceptan donaciones?
¡Solo aceptamos startups vergonzosas como pago! 😄

---

## Reconocimiento

Gracias a todos los contribuyentes que hacen este proyecto posible.

*Y recuerda: si tu startup aparece aquí, al menos ya tienes publicity.* 📰

---

<div align="center">

¿Preguntas? Abre un Issue. 
¿No sabes cómo? También abre un Issue. 🐛

</div>
