# ✅ Objeto "Llama Sagrada" - Implementación Completa

## 📋 Resumen de Cambios

Se ha añadido correctamente el objeto "Llama Sagrada" al juego Dark Realm con las siguientes modificaciones:

---

## 🔧 Cambios Realizados

### 1. **Sistema de Sprites** (`/data/sprites.ts`)
✅ Añadida la imagen de la Llama Sagrada al objeto `ITEM_SPRITES`:
```typescript
'llama-sagrada': `${ASSETS_BASE_URL}/inventory/item-llama-sagrada.png`
```

### 2. **Mapeo de Inventario** (`/components/InventoryPanel.tsx`)
✅ Actualizado el mapeo de nombres de objetos:
```typescript
'Llama Sagrada': 'llama-sagrada',
'Antorcha Sagrada': 'llama-sagrada', // Por si acaso se usa el nombre antiguo
```

### 3. **Evento de la Antorcha Sagrada** (`/components/DecisionScreen.tsx`)
✅ Modificado el evento ID 13 para que:
- Cambie el texto del botón de "TOMAR ANTORCHA" a **"ENCENDER"**
- Cambie el icono de 🔦 a **🔥**
- Otorgue el objeto **"Llama Sagrada"** con ID `sacred_flame`
- Mensaje actualizado: *"Enciendes la antorcha. Una llama sagrada arde con luz purificadora."*

### 4. **Evento de la Criatura de Sombras** (`/components/DecisionScreen.tsx`)
✅ Actualizado el evento ID 14 para que:
- Requiera el objeto con ID `sacred_flame` (Llama Sagrada)
- Cambie el botón de "USAR ANTORCHA" a **"USAR LLAMA"**
- Verifique correctamente la presencia de `sacred_flame` en el inventario
- Consuma la Llama Sagrada al usarla exitosamente

---

## 🎮 Funcionamiento en el Juego

### **Secuencia de Eventos:**

1. **Evento ID 13 - Antorcha Sagrada**
   - El jugador encuentra una antorcha apagada
   - Si elige "ENCENDER", recibe la **Llama Sagrada**
   - La llama aparece en el inventario con su sprite correspondiente

2. **Evento ID 14 - Criatura de Sombras**
   - Una criatura de sombras bloquea el pasillo
   - Si el jugador tiene la Llama Sagrada:
     - Puede elegir "USAR LLAMA" para disipar las sombras
     - Reduce 30 puntos de Locura
     - La Llama Sagrada se consume
   - Sin la llama:
     - "USAR LLAMA" no funciona (aumenta +25 Locura)
     - "ENFRENTAR" causa -30 HP y +20 Locura

---

## 🎨 Imagen Necesaria

**Archivo a crear:**
```
/public/assets/inventory/item-llama-sagrada.png
```

**Especificaciones:**
- **Tamaño:** 32x32 píxeles (o 64x64px)
- **Formato:** PNG con transparencia
- **Estilo:** Pixel art de fantasía oscura
- **Descripción:** Antorcha con una llama brillante de tonos dorados/anaranjados con aura sagrada
- **Colores sugeridos:** 
  - Mango de antorcha: #8B4513 (marrón)
  - Llama: #FFD700, #FFA500, #FF6347 (dorado a naranja)
  - Aura sagrada: #FFFFFF con brillo (blanco brillante)

---

## ✨ Características del Objeto

**Nombre:** Llama Sagrada  
**ID:** `sacred_flame`  
**Tipo:** `key` (objeto especial)  
**Efecto:** 0 (no se usa en combate)  
**Uso:** Se consume al usarse contra la Criatura de Sombras  
**Beneficio:** -30 Locura al ahuyentar las sombras  

---

## 📝 Notas Adicionales

- El objeto **NO puede usarse en combate** (tipo `key`)
- Aparece en el inventario con el sprite correspondiente
- Se muestra con opacidad reducida en el inventario fuera de eventos específicos
- La mecánica de `requiredItem` garantiza que el evento 14 cambie según tengas o no la llama

---

## 🔗 Objetos Relacionados del Sistema

El juego también tiene otros objetos especiales de tienda:

1. **Elixir de Renovación** - Restaura 50 HP y 30 MP (comprado con 30 Locura)
2. **Cristal de Lucidez** - Reduce 50 Locura (comprado con 40 HP)
3. **Esencia Arcana** - Restaura 80 MP (comprado con 25 HP)

Todos estos objetos ya tienen sus sprites configurados y funcionan correctamente.

---

## ✅ Estado

**IMPLEMENTACIÓN COMPLETA** - Solo falta crear la imagen PNG del sprite.
