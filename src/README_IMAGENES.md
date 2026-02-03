# 🎮 DRYB4LL - Guía Rápida de Imágenes

## 📂 ¿Dónde poner las imágenes?

Todas las imágenes deben colocarse en la carpeta `/public/assets/` de tu proyecto.

### Estructura de carpetas:

```
/public/assets/
  ├─ ui/            → Logo del título, estados de locura
  ├─ exploration/   → Fondo de pasillo, botones, pistas visuales
  ├─ combat/        → Botones de ataque, magia, objeto
  ├─ enemies/       → Sprites de enemigos (esqueleto, demonio, etc.)
  ├─ inventory/     → Objetos (pociones, llaves, amuletos)
  └─ events/        → Eventos de decisión (30 imágenes)
```

## 📋 Documentación completa:

- **Guía detallada:** Ver archivo `/GUIA_IMAGENES_LOCAL.txt`
- **Lista de todas las imágenes:** Ver archivo `/LISTA_IMAGENES_NECESARIAS.md`
- **Configuración de rutas:** Ver archivo `/data/sprites.ts`

## ⚠️ Importante:

1. ✅ Las imágenes deben estar en `/public/assets/` (NO en `/src/assets/`)
2. ✅ Los nombres de archivo deben ser exactos (con guiones y .png)
3. ✅ Formato recomendado: PNG con transparencia
4. ✅ Estilo: Pixel art de fantasía oscura

## 🚀 Inicio rápido:

1. Crea la carpeta `/public/assets/` si no existe
2. Crea las 6 subcarpetas: `ui`, `exploration`, `combat`, `enemies`, `inventory`, `events`
3. Copia tus imágenes PNG con los nombres exactos
4. Recarga el navegador (Ctrl+Shift+R o Cmd+Shift+R)

## 📖 Total de imágenes necesarias: ~55

- **Prioridad Alta:** Botones de combate (3), objetos básicos (3), eventos principales (10)
- **Prioridad Media:** Resto de eventos (20), pistas visuales (5), botones exploración (4)
- **Prioridad Baja:** Sprites de enemigos (4), estados de locura (3), logo (1)

---

Para más detalles, consulta `/GUIA_IMAGENES_LOCAL.txt` 📘
