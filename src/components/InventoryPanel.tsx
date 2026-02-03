import { Item } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getItemSprite, EXPLORATION_UI_SPRITES } from '../data/sprites';
import { useEffect } from 'react';

// Mapeo de nombres de items a IDs de sprites
const getItemSpriteId = (item: Item): string => {
  const nameMap: { [key: string]: string } = {
    'Poción de vida': 'pocion-vida',
    'Poción Superior': 'pocion-vida',
    'Poción de Sangre': 'pocion-vida',
    'Tónico Prohibido': 'pocion-vida',
    'Poción de maná': 'pocion-mana',
    'Elixir Arcano': 'pocion-mana',
    'Frasco Etéreo': 'pocion-mana',
    'Llave Antigua': 'llave-oxidada',
    'Llama Sagrada': 'llama-sagrada',
    'Antorcha Sagrada': 'llama-sagrada',
    'Amuleto Protector': 'amuleto-protector',
    'Elixir de Renovación': 'elixir-renovacion',
    'Cristal de Lucidez': 'cristal-lucidez',
    'Esencia Arcana': 'esencia-arcana',
  };
  return nameMap[item.name] || 'pocion-vida';
};

interface InventoryPanelProps {
  inventory: Item[];
  onClose: () => void;
  onUseItem: (item: Item) => void;
  inCombat: boolean;
  frameWidth: number;
}

export function InventoryPanel({ inventory, onClose, onUseItem, inCombat, frameWidth }: InventoryPanelProps) {
  const handleItemClick = (item: Item) => {
    if (inCombat && item.type !== 'key') {
      onUseItem(item);
    }
  };

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  // Calcular dimensiones del inventario basándose en frameWidth
  // El inventario será 80% del ancho del marco normal
  // Marco de inventario original: 112x140 píxeles (ratio 0.8)
  const inventoryWidth = frameWidth * 0.8;
  const inventoryHeight = inventoryWidth * (140 / 112); // Mantener proporción del marco del inventario
  
  // Calcular padding proporcional
  const paddingTop = inventoryHeight * 0.12; // 12% arriba para el botón cerrar
  const paddingSides = inventoryWidth * 0.08; // 8% a los lados
  const paddingBottom = inventoryHeight * 0.08; // 8% abajo

  return (
    <div 
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Contenedor con imagen de marco */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Marco decorativo */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <ImageWithFallback
            src={EXPLORATION_UI_SPRITES.frameOverlay}
            alt="Marco de inventario"
            className="w-full h-full"
            style={{ 
              imageRendering: 'pixelated',
              width: `${inventoryWidth}px`,
              height: `${inventoryHeight}px`,
            }}
          />
        </div>

        {/* Contenido del inventario */}
        <div 
          className="relative bg-black"
          style={{ 
            width: `${inventoryWidth}px`, 
            height: `${inventoryHeight}px`,
            padding: `${paddingTop}px ${paddingSides}px ${paddingBottom}px ${paddingSides}px`,
            border: `${Math.max(1, Math.round(inventoryWidth / 112))}px solid white`,
            zIndex: 20,
          }}
        >
          {/* Grid de items con scroll */}
          {inventory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              {/* Inventario vacío sin texto */}
            </div>
          ) : (
            <div 
              className="h-full overflow-y-auto pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#78716c #000000'
              }}
            >
              <div className="grid grid-cols-3 gap-6 place-items-center">
                {inventory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`flex items-center justify-center transition-all border-0 bg-transparent relative ${
                      inCombat && item.type !== 'key' 
                        ? 'hover:scale-110 cursor-pointer hover:brightness-110' 
                        : 'cursor-default opacity-70'
                    }`}
                    disabled={!inCombat || item.type === 'key'}
                    style={{
                      width: `${inventoryWidth * 0.2}px`,
                      height: `${inventoryWidth * 0.2}px`,
                      padding: '8px',
                    }}
                  >
                    {/* Imagen del objeto */}
                    <ImageWithFallback
                      src={getItemSprite(getItemSpriteId(item))}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      style={{ 
                        imageRendering: 'pixelated',
                        transform: 'scale(1.5)',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilo personalizado para scrollbar en navegadores Webkit */}
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #000000;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #78716c;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a29e;
        }
      `}</style>
    </div>
  );
}