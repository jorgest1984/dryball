# ✅ Objeto "Amuleto Protector" - Implementación Completa

## 📋 Resumen de Cambios

Se ha añadido correctamente el objeto "Amuleto Protector" al juego Dark Realm con las siguientes modificaciones:

---

## 🔧 Cambios Realizados

### 1. **Sistema de Sprites** (`/data/sprites.ts`)
✅ Añadida la imagen del Amuleto Protector al objeto `ITEM_SPRITES`:
```typescript
'amuleto-protector': `${ASSETS_BASE_URL}/inventory/item-amuleto-protector.png`
```

✅ Añadida la imagen del evento 16 (Portal Demoníaco):
```typescript
16: `${ASSETS_BASE_URL}/events/event-16-portal-demoniaco.png`
```

### 2. **Mapeo de Inventario** (`/components/InventoryPanel.tsx`)
✅ Actualizado el mapeo de nombres de objetos:
```typescript
'Amuleto Protector': 'amuleto-protector'
```
Ahora el amuleto tiene su propia imagen única en lugar de compartir la imagen de la llave.

### 3. **Evento del Amuleto Brillante** (`/components/DecisionScreen.tsx`)
✅ El evento ID 15 ya está configurado correctamente para:
- Otorgar el **"Amuleto Protector"** con ID `protective_amulet`
- Reducir 10 puntos de Locura al tomarlo
- Mensaje: *"Tomas el amuleto protector. Su calidez calma tu mente."*

### 4. **Evento del Portal Demoníaco - NUEVO** (`/components/DecisionScreen.tsx`)
✅ Creado el evento ID 16 que:
- Requiere el objeto con ID `protective_amulet` (Amuleto Protector)
- Opciones:
  - **"USAR AMULETO"**: Si tienes el amuleto, absorbe la energía demoníaca (+40 HP, -20 Locura)
  - **"HUIR"**: Recibes daño parcial (-20 HP, +15 Locura)
- Sin el amuleto:
  - **"USAR AMULETO"** no funciona y causa daño severo (-40 HP, +30 Locura)

### 5. **Array de Eventos** (`/App.tsx`)
✅ Actualizado `OBJECT_EVENTS` para incluir el evento 16:
```typescript
const OBJECT_EVENTS = [11, 12, 13, 14, 15, 16];
```

---

## 🎮 Funcionamiento en el Juego

### **Secuencia de Eventos:**

1. **Evento ID 15 - Amuleto Brillante**
   - El jugador encuentra un amuleto en un pedestal
   - Si elige "TOMAR AMULETO", recibe el **Amuleto Protector**
   - Reduce 10 puntos de Locura
   - El amuleto aparece en el inventario con su sprite correspondiente

2. **Evento ID 16 - Portal Demoníaco**
   - Un portal al infierno se abre ante el jugador
   - **Con el Amuleto Protector:**
     - Puede elegir "USAR AMULETO" para absorber la energía
     - Restaura +40 HP y reduce -20 Locura
     - El Amuleto Protector se consume
   - **Sin el amuleto:**
     - "USAR AMULETO" falla y causa -40 HP y +30 Locura
     - "HUIR" causa -20 HP y +15 Locura (menos daño)

---

## 🎨 Imágenes Necesarias

**Archivos a crear:**

### 1. Sprite del Objeto
```
/public/assets/inventory/item-amuleto-protector.png
```

**Especificaciones:**
- **Tamaño:** 32x32 píxeles (o 64x64px)
- **Formato:** PNG con transparencia
- **Estilo:** Pixel art de fantasía oscura
- **Descripción:** Amuleto con gema central brillante, colgante dorado con aura protectora
- **Colores sugeridos:** 
  - Marco del amuleto: #FFD700, #DAA520 (dorado)
  - Gema central: #00CED1, #1E90FF (azul brillante/turquesa)
  - Aura: #FFFFFF con brillo suave (blanco brillante)
  - Cadena: #C0C0C0 (plateado)

### 2. Imagen del Evento
```
/public/assets/events/event-16-portal-demoniaco.png
```

**Especificaciones:**
- **Tamaño:** 256x256 píxeles
- **Formato:** PNG con transparencia (opcional)
- **Estilo:** Pixel art de fantasía oscura
- **Descripción:** Vórtex o portal giratorio de energía demoníaca con tonos rojos y morados
- **Colores sugeridos:**
  - Portal: #8B0000, #DC143C (rojo oscuro/carmesí)
  - Energía: #4B0082, #8B008B (morado oscuro)
  - Bordes brillantes: #FF4500 (naranja brillante)
  - Fondo: Negro con destellos rojos

---

## ✨ Características del Objeto

**Nombre:** Amuleto Protector  
**ID:** `protective_amulet`  
**Tipo:** `key` (objeto especial)  
**Efecto:** 0 (no se usa en combate)  
**Obtención:** Evento ID 15 (Amuleto Brillante)
**Uso:** Se consume al usarse en el evento 16 (Portal Demoníaco)  
**Beneficio al obtener:** -10 Locura  
**Beneficio al usar:** +40 HP, -20 Locura (cierra el portal)

---

## 🔗 Cadena de Eventos Relacionados

### **Secuencia Completa de Objetos Especiales:**

1. **Llave Antigua** (ID 11) → **Puerta Cerrada** (ID 12)
   - Obtención: Tomar llave del suelo
   - Uso: Abrir puerta para obtener +30 HP, +20 MP

2. **Llama Sagrada** (ID 13) → **Criatura de Sombras** (ID 14)
   - Obtención: Encender antorcha sagrada
   - Uso: Ahuyentar sombras para reducir -30 Locura

3. **Amuleto Protector** (ID 15) → **Portal Demoníaco** (ID 16)
   - Obtención: Tomar amuleto del pedestal (-10 Locura)
   - Uso: Cerrar portal demoníaco (+40 HP, -20 Locura)

---

## 📊 Comparativa de Objetos Especiales

| Objeto | Evento Obtención | Evento Uso | Beneficio Obtención | Beneficio Uso | Se Consume |
|--------|------------------|------------|---------------------|---------------|------------|
| Llave Antigua | ID 11 | ID 12 | Ninguno | +30 HP, +20 MP | ✅ Sí |
| Llama Sagrada | ID 13 | ID 14 | Ninguno | -30 Locura | ✅ Sí |
| **Amuleto Protector** | **ID 15** | **ID 16** | **-10 Locura** | **+40 HP, -20 Locura** | **✅ Sí** |

---

## 📝 Notas de Diseño

- El Amuleto Protector es el **único objeto especial que otorga beneficio al obtenerlo** (reduce Locura)
- Tiene el **mayor beneficio de HP** al usarse (+40 HP)
- Es especialmente útil para **combatir locura alta** (-20 Locura al usar, -10 al obtener)
- El evento sin el amuleto es el **más punitivo** (-40 HP, +30 Locura si intentas usar el amuleto sin tenerlo)
- **Estrategia recomendada**: Guardar el amuleto para momentos de alta locura o baja vida

---

## ✅ Estado

**IMPLEMENTACIÓN COMPLETA** - Solo faltan crear las dos imágenes PNG:
1. `item-amuleto-protector.png` - Sprite del objeto en inventario
2. `event-16-portal-demoniaco.png` - Imagen del evento del portal
