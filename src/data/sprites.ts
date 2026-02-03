// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN DE SPRITES - Local Assets
// ═══════════════════════════════════════════════════════════
// 
// INSTRUCCIONES PARA AGREGAR IMÁGENES:
// 
// 1. Crea las carpetas de assets en tu proyecto si no existen:
//    - /public/assets/combat/
//    - /public/assets/enemies/
//    - /public/assets/events/
//    - /public/assets/exploration/
//    - /public/assets/inventory/
//    - /public/assets/ui/
//
// 2. Coloca tus imágenes PNG en las carpetas correspondientes
//    siguiendo los nombres exactos indicados en este archivo
//
// 3. Las imágenes se cargarán automáticamente desde /public/assets/
//
// ═══════════════════════════════════════════════════════════

const ASSETS_BASE_URL = '/assets';

// ═══════════════════════════════════════════════════════════
// EVENTOS DE DECISIÓN (IDs: 1, 2, 4, 6, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23)
// ═══════════════════════════════════════════════════════════
export const getEventSprite = (eventId: number): string => {
  const eventSprites: Record<number, string> = {
    1: `${ASSETS_BASE_URL}/events/event-01-altar-oscuro.png`,
    2: `${ASSETS_BASE_URL}/events/event-02-espejo-distorsionado.png`,
    4: `${ASSETS_BASE_URL}/events/event-04-voces-oscuridad.png`,
    6: `${ASSETS_BASE_URL}/events/event-06-estatua-llorosa.png`,
    8: `${ASSETS_BASE_URL}/events/event-08-vela-negra.png`,
    11: `${ASSETS_BASE_URL}/events/event-11-llave-antigua.png`,
    12: `${ASSETS_BASE_URL}/events/event-12-puerta-cerrada.png`,
    13: `${ASSETS_BASE_URL}/events/event-13-antorcha-sagrada.png`,
    14: `${ASSETS_BASE_URL}/events/event-14-criatura-sombras.png`,
    15: `${ASSETS_BASE_URL}/events/event-15-amuleto-brillante.png`,
    16: `${ASSETS_BASE_URL}/events/event-16-portal-demoniaco.png`,
    17: `${ASSETS_BASE_URL}/events/event-17-cristal-energia.png`,
    18: `${ASSETS_BASE_URL}/events/event-18-pozo-oscuro.png`,
    19: `${ASSETS_BASE_URL}/events/event-19-campana-gigante.png`,
    20: `${ASSETS_BASE_URL}/events/event-20-gema-alma.png`,
    21: `${ASSETS_BASE_URL}/events/event-21-tienda-elixir.png`,
    22: `${ASSETS_BASE_URL}/events/event-22-tienda-cristal.png`,
    23: `${ASSETS_BASE_URL}/events/event-23-tienda-esencia.png`,
  };
  
  return eventSprites[eventId] || `${ASSETS_BASE_URL}/events/event-01-altar-oscuro.png`;
};

// ═══════════════════════════════════════════════════════════
// ENEMIGOS
// ═══════════════════════════════════════════════════════════
export const ENEMY_SPRITES = {
  skeleton: `${ASSETS_BASE_URL}/enemies/enemy-skeleton.png`,
  demon: `${ASSETS_BASE_URL}/enemies/enemy-demon.png`,
  wraith: `${ASSETS_BASE_URL}/enemies/enemy-wraith.png`,
  boss: `${ASSETS_BASE_URL}/enemies/enemy-boss.png`,
};

// ═══════════════════════════════════════════════════════════
// BOTONES DE COMBATE
// ═══════════════════════════════════════════════════════════
export const COMBAT_SPRITES = {
  buttonAttack: `${ASSETS_BASE_URL}/combat/button-attack.png`,
  buttonMagic: `${ASSETS_BASE_URL}/combat/button-magic.png`,
  buttonItem: `${ASSETS_BASE_URL}/combat/button-item.png`,
};

// ══════════════════════════════════════════════════════════
// ITEMS DE INVENTARIO
// ═══════════════════════════════════════════════════════════
export const ITEM_SPRITES = {
  'pocion-vida': `${ASSETS_BASE_URL}/inventory/item-pocion-vida.png`,
  'pocion-mana': `${ASSETS_BASE_URL}/inventory/item-pocion-mana.png`,
  'llave-oxidada': `${ASSETS_BASE_URL}/inventory/item-llave-oxidada.png`,
  'llama-sagrada': `${ASSETS_BASE_URL}/inventory/item-llama-sagrada.png`,
  'amuleto-protector': `${ASSETS_BASE_URL}/inventory/item-amuleto-protector.png`,
  'elixir-renovacion': `${ASSETS_BASE_URL}/inventory/item-elixir-renovacion.png`,
  'cristal-lucidez': `${ASSETS_BASE_URL}/inventory/item-cristal-lucidez.png`,
  'esencia-arcana': `${ASSETS_BASE_URL}/inventory/item-esencia-arcana.png`,
};

// ═══════════════════════════════════════════════════════════
// UI - MARCOS Y PANELES
// ═══════════════════════════════════════════════════════════
export const INVENTORY_SPRITES = {
  frameInventory: `${ASSETS_BASE_URL}/ui/frame-inventory.png`,
};

// ═══════════════════════════════════════════════════════════
// UI - MARCOS DE BARRAS DE ESTADÍSTICAS
// ═══════════════════════════════════════════════════════════
// INSTRUCCIONES PARA REEMPLAZAR:
// 1. Coloca tus imágenes en /public/assets/ui/
// 2. Nombres de archivo: 
//    - stat-bar-frame-hp.png (marco para Vida)
//    - stat-bar-frame-mp.png (marco para Maná)
//    - stat-bar-frame-madness.png (marco para Locura)
// 3. Formato recomendado: PNG con transparencia
// 4. Dimensiones BASE en pixel art: 12x30px (vertical)
// 5. Escala automática: Se escalarán 4x a 48x120px en pantalla
// 6. Ratio: 2:5 (ancho:alto)
// 7. Estilo: Marco decorativo pixel art que rodea cada barra vertical

export const STAT_BAR_SPRITES = {
  frameHP: `${ASSETS_BASE_URL}/ui/stat-bar-frame-hp.png`,
  frameMP: `${ASSETS_BASE_URL}/ui/stat-bar-frame-mp.png`,
  frameMadness: `${ASSETS_BASE_URL}/ui/stat-bar-frame-madness.png`,
};

// ═══════════════════════════════════════════════════════════
// ESTADOS DE LOCURA
// ═══════════════════════════════════════════════════════════
export const STATE_SPRITES = {
  normal: `${ASSETS_BASE_URL}/ui/state-normal.png`,
  enlightened: `${ASSETS_BASE_URL}/ui/state-enlightened.png`,
  mad: `${ASSETS_BASE_URL}/ui/state-mad.png`,
};

// ═══════════════════════════════════════════════════════════
// EXPLORACIÓN (LADOS DE PASILLO)
// ═══════════════════════════════════════════════════════════
export const EXPLORATION_SPRITES = {
  leftSide: `${ASSETS_BASE_URL}/exploration/event-side-left.png`,
  rightSide: `${ASSETS_BASE_URL}/exploration/event-side-right.png`,
};

// ═══════════════════════════════════════════════════════════
// EXPLORACIÓN - FONDOS Y BOTONES DE PANTALLA
// ══════════════════════════════════════════════════════════
// INSTRUCCIONES PARA REEMPLAZAR ESTAS IMÁGENES:
// 1. Coloca tus imágenes en /public/assets/exploration/
// 2. Los nombres de archivo deben ser exactamente como se indican abajo
// 3. Formato recomendado: PNG con transparencia donde sea necesario
// 4. Dimensiones recomendadas:
//    - hallway-background.png: 1200x800px (ratio 3:2)
//    - button-left.png: 400x300px
//    - button-inventory.png: 400x300px  
//    - button-right.png: 400x300px
//    - frame-overlay.png: 1200x800px (ratio 3:2) - Marco decorativo con transparencia

export const EXPLORATION_UI_SPRITES = {
  hallwayBackground: `${ASSETS_BASE_URL}/exploration/hallway-background.png`,
  hallwayBackgroundAlt: `${ASSETS_BASE_URL}/exploration/hallway-background-alt.png`,
  buttonLeft: `${ASSETS_BASE_URL}/exploration/button-left.png`,
  buttonInventory: `${ASSETS_BASE_URL}/exploration/button-inventory.png`,
  buttonRight: `${ASSETS_BASE_URL}/exploration/button-right.png`,
  frameOverlay: `${ASSETS_BASE_URL}/exploration/frame-overlay.png`,
};

// ═══════════════════════════════════════════════════════════
// UI - PANTALLA INICIAL Y LOGOS
// ═══════════════════════════════════════════════════════════
// INSTRUCCIONES PARA REEMPLAZAR:
// 1. Coloca tu imagen en /public/assets/ui/
// 2. Nombre del archivo: title-logo.png
// 3. Formato recomendado: PNG con transparencia
// 4. Dimensiones recomendadas: 800x200px o similar (horizontal)
// 5. Estilo: Logo del juego "DRYB4LL" en pixel art

export const UI_SPRITES = {
  titleLogo: `${ASSETS_BASE_URL}/ui/title-logo.png`,
  buttonStart: `${ASSETS_BASE_URL}/ui/button-start.png`,
  buttonStartHover: `${ASSETS_BASE_URL}/ui/button-start-hover.png`,
  gameOver: `${ASSETS_BASE_URL}/ui/gameover.png`,
};

// ═══════════════════════════════════════════════════════════
// TIPOS DE EVENTOS EN PASILLO - Pistas visuales
// ═══════════════════════════════════════════════════════════
export type EventType = 'ambiental' | 'combate' | 'tesoro' | 'objeto' | 'mistico';

export const EVENT_TYPE_SPRITES = {
  ambiental: `${ASSETS_BASE_URL}/exploration/hint-ambiental.png`,
  combate: `${ASSETS_BASE_URL}/exploration/hint-combate.png`,
  tesoro: `${ASSETS_BASE_URL}/exploration/hint-tienda.png`,
  objeto: `${ASSETS_BASE_URL}/exploration/hint-objeto.png`,
  mistico: `${ASSETS_BASE_URL}/exploration/hint-mistico.png`,
};

// ═══════════════════════════════════════════════════════════
// HELPER: Obtener sprite de tipo de evento
// ═══════════════════════════════════════════════════════════
export const getEventTypeSprite = (eventType: EventType): string => {
  return EVENT_TYPE_SPRITES[eventType] || EVENT_TYPE_SPRITES.ambiental;
};

// ═══════════════════════════════════════════════════════════
// HELPER: Obtener sprite de item por ID
// ═══════════════════════════════════════════════════════════
export const getItemSprite = (itemId: string): string => {
  return ITEM_SPRITES[itemId as keyof typeof ITEM_SPRITES] || ITEM_SPRITES['pocion-vida'];
};

// ═══════════════════════════════════════════════════════════
// HELPER: Obtener sprite de enemigo
// ═══════════════════════════════════════════════════════════
export const getEnemySprite = (enemyType: string): string => {
  return ENEMY_SPRITES[enemyType as keyof typeof ENEMY_SPRITES] || ENEMY_SPRITES.skeleton;
};

// ═══════════════════════════════════════════════════════════
// HELPER: Obtener sprite de estado de locura
// ═══════════════════════════════════════════════════════════
export const getStateSprite = (state: string): string => {
  return STATE_SPRITES[state as keyof typeof STATE_SPRITES] || STATE_SPRITES.normal;
};
