# 🎨 ESTRUCTURA DE SPRITES - Dark Realm RPG

## 📦 Repositorio de GitHub
**URL Base:** `https://raw.githubusercontent.com/Rau10mr/SpritesDryB4ll/main/`

## 📁 Estructura de Carpetas Requerida

Tu repositorio de GitHub debe tener la siguiente estructura:

```
SpritesDryB4ll/
├── events/
│   ├── event-01-altar-oscuro.png
│   ├── event-02-espejo-distorsionado.png
│   ├── event-03-pocion-burbujeante.png
│   ├── event-04-voces-oscuridad.png
│   ├── event-05-libro-antiguo.png
│   ├── event-06-estatua-llorosa.png
│   ├── event-07-cofre-encadenado.png
│   ├── event-08-vela-negra.png
│   ├── event-09-craneo-mistico.png
│   ├── event-10-puerta-susurrante.png
│   ├── event-11-charco-sangre.png
│   ├── event-12-cadenas-rotas.png
│   ├── event-13-cueva-misteriosa.png
│   ├── event-14-runas-brillantes.png
│   ├── event-15-campamento-abandonado.png
│   ├── event-16-arbol-retorcido.png
│   ├── event-17-pozo-oscuro.png
│   ├── event-18-mercader-sombrio.png
│   ├── event-19-teletransportador.png
│   ├── event-20-portal-dimensional.png
│   ├── event-21-ritual-interrumpido.png
│   ├── event-22-cristal-resonante.png
│   ├── event-23-guardian-dormido.png
│   ├── event-24-biblioteca-maldita.png
│   ├── event-25-fuente-vida.png
│   ├── event-26-reloj-detenido.png
│   ├── event-27-mariposa-sombria.png
│   ├── event-28-espada-clavada.png
│   ├── event-29-mascara-antigua.png
│   └── event-30-umbral-pesadillas.png
│
├── enemies/
│   ├── enemy-skeleton.png
│   ├── enemy-demon.png
│   ├── enemy-wraith.png
│   └── enemy-boss.png
│
├── combat/
│   ├── button-attack.png
│   ├── button-magic.png
│   └── button-item.png
│
├── inventory/
│   ├── item-pocion-vida.png
│   ├── item-pocion-mana.png
│   └── item-llave-oxidada.png
│
├── effects/
│   ├── state-normal.png
│   ├── state-enlightened.png
│   └── state-mad.png
│
└── exploration/
    ├── event-side-left.png
    └── event-side-right.png
```

## 🔧 Archivos Modificados

### 1. `/data/sprites.ts` (NUEVO)
- Archivo central de configuración de sprites
- Define la URL base de GitHub
- Exporta funciones helper para obtener sprites:
  - `getEventSprite(eventId: number)`
  - `getEnemySprite(enemyType: string)`
  - `getItemSprite(itemId: string)`
  - `getStateSprite(state: string)`

### 2. `/components/DecisionScreen.tsx`
- ✅ Importa `getEventSprite` desde `/data/sprites`
- ✅ Usa `getEventSprite(event.id)` para cargar imágenes de eventos

### 3. `/components/CombatScreen.tsx`
- ✅ Importa `COMBAT_SPRITES` y `getEnemySprite` desde `/data/sprites`
- ✅ Usa `getEnemySprite(enemy.type)` para sprites de enemigos
- ✅ Usa `COMBAT_SPRITES.buttonAttack/buttonMagic/buttonItem` para botones

### 4. `/components/InventoryPanel.tsx`
- ✅ Importa `getItemSprite` desde `/data/sprites`
- ✅ Usa `getItemSprite(itemId)` para cargar imágenes de items

### 5. `/components/HallwayScreen.tsx`
- ✅ Importa `EXPLORATION_SPRITES` desde `/data/sprites`
- ✅ Usa `EXPLORATION_SPRITES.leftSide` y `EXPLORATION_SPRITES.rightSide`

## 📝 Notas Importantes

1. **Todas las URLs usan la ruta "raw" de GitHub:**
   - ✅ Correcto: `https://raw.githubusercontent.com/Rau10mr/SpritesDryB4ll/main/`
   - ❌ Incorrecto: `https://github.com/Rau10mr/SpritesDryB4ll/tree/main/`

2. **Los sprites deben estar en formato PNG**

3. **Se recomienda estilo pixel art para mantener la estética del juego**

4. **La propiedad `imageRendering: 'pixelated'` está aplicada en todos los sprites para mantener el estilo pixel art**

## 🎯 IDs de Eventos

Los eventos están numerados del 1 al 30:
- **Eventos 1-10:** Eventos principales (altar, espejo, pócima, etc.)
- **Eventos 11-20:** Eventos con sistema de objetos (llaves, antorchas, amuletos)
- **Eventos 21-25:** Eventos de tienda (mercader sombrío)
- **Eventos 26-30:** Eventos de continuar (bifurcaciones de camino)

## 🔍 Cómo Verificar si los Sprites Cargan Correctamente

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network" (Red)
3. Filtra por "Images" (Imágenes)
4. Verifica que las URLs apunten a:
   ```
   https://raw.githubusercontent.com/Rau10mr/SpritesDryB4ll/main/...
   ```
5. Si hay errores 404, verifica que la estructura de carpetas en GitHub coincida exactamente

## ✅ Completado

Todos los componentes del juego ahora cargan imágenes directamente desde tu repositorio de GitHub. Solo necesitas subir los sprites con los nombres correctos en la estructura de carpetas especificada.
