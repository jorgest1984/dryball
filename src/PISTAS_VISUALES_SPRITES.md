# Sprites de Pistas Visuales para el Pasillo

## 📋 Descripción General

Las imágenes del pasillo ahora dan pistas sobre el tipo de evento que ocurrirá al elegir cada dirección. El jugador verá dos imágenes (izquierda y derecha) que representan los tipos de eventos disponibles.

## 🎨 Sprites Necesarios

### Ubicación: `/exploration/`

| Archivo | Descripción | Representa |
|---------|-------------|------------|
| `hint-ambiental.png` | Pista de evento ambiental | Eventos ID: 1-10 (altares, espejos, pociones, etc.) |
| `hint-combate.png` | Pista de combate | Encuentros con enemigos (esqueletos, demonios, espectros) |
| `hint-tienda.png` | Pista de tienda | Eventos ID: 21-25 (tendero misterioso) |
| `hint-objeto.png` | Pista de evento con objetos | Eventos ID: 11-16 (llaves, antorchas, amuletos) |
| `hint-mistico.png` | Pista de evento místico | Eventos ID: 17-20, 26-30 (cristales, almas, caminos) |

## 🎯 Cómo Funcionan

1. **Al entrar al pasillo**: Se generan aleatoriamente dos tipos de eventos diferentes
2. **Lado izquierdo**: Muestra el sprite correspondiente al tipo de evento izquierdo
3. **Lado derecho**: Muestra el sprite correspondiente al tipo de evento derecho
4. **Al elegir dirección**: Se activa un evento aleatorio del tipo correspondiente
5. **Después del evento**: Se generan nuevos tipos para el siguiente pasillo

## 📝 Categorías de Eventos

### 🌫️ Ambiental (IDs: 1-10)
- Altar oscuro
- Espejo distorsionado
- Poción burbujeante
- Voces en la oscuridad
- Libro antiguo
- Estatua llorosa
- Cofre encadenado
- Vela negra
- Cráneo místico
- Círculo de runas

### ⚔️ Combate
- Esqueleto
- Demonio Menor
- Espectro
- (Evento especial del tipo combate)

### 🏪 Tienda (IDs: 21-25)
- Tendero misterioso ofreciendo diferentes items
- Intercambios de recursos (vida, maná, locura)

### 🗝️ Objeto (IDs: 11-16)
- Llave antigua
- Puerta cerrada
- Antorcha sagrada
- Criatura de sombras
- Amuleto protector
- Portal demoníaco

### ✨ Místico (IDs: 17-20, 26-30)
- Cristal de energía
- Pozo oscuro
- Campana gigante
- Fragmento de alma
- Caminos y decisiones de exploración

## 🎨 Recomendaciones de Diseño

- **Estilo**: Pixel art consistente con el resto del juego
- **Tamaño**: 128x128 píxeles (se mostrará en 32x32)
- **Paleta**: Oscura, de fantasía gótica
- **Iconografía**:
  - Ambiental: Elementos de escenario (altar, libro, vela)
  - Combate: Espadas, calaveras, armas
  - Tienda: Monedas, balanza, capa misteriosa
  - Objeto: Llave, cofre, objeto brillante
  - Místico: Runas, energía, magia

## 🔄 Flujo de Juego

```
Inicio → Generar 2 tipos aleatorios diferentes
       ↓
Mostrar sprites de pista en el pasillo
       ↓
Jugador elige dirección (←/→)
       ↓
Activar evento del tipo correspondiente
       ↓
Generar nuevos 2 tipos → Volver al pasillo
```

## 💡 Ejemplo de Uso

```typescript
// El jugador ve:
// Izquierda: hint-combate.png
// Derecha: hint-tienda.png

// Si elige izquierda → Combate con enemigo aleatorio
// Si elige derecha → Evento de tienda (ID 21-25)
```
