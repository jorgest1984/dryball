import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Player, Item, MadnessState } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getEventSprite, EXPLORATION_UI_SPRITES } from '../data/sprites';
import { GameHUD } from './GameHUD';

const checkMadnessThreshold = (player: Player, addLog: (msg: string) => void): Player => {
  if (player.madness >= player.maxMadness) {
    const roll = Math.random();
    
    if (roll < 0.05) {
      // 5% - Estado Iluminado
      addLog('¡Tu locura alcanza su límite y TRASCIENDE! ¡Estás ILUMINADO!');
      return {
        ...player,
        madness: 0,
        madnessState: 'enlightened',
        madnessMultiplier: 2.0,
      };
    } else {
      // 95% - Estado Loco
      addLog('¡Tu cordura se quiebra! ¡Has enloquecido completamente!');
      return {
        ...player,
        madness: 0,
        madnessState: 'mad',
        madnessMultiplier: 0.5,
      };
    }
  }
  return player;
};

export interface DecisionEvent {
  id: number;
  description: string;
  yesText: string;
  noText: string;
  yesEffect: (player: Player, inventory: Item[]) => { player: Player; message: string; itemToAdd?: Item; itemToRemove?: string };
  noEffect: (player: Player, inventory: Item[]) => { player: Player; message: string; itemToAdd?: Item };
  icon: string;
  imageName: string; // nombre del archivo de imagen
  requiredItem?: string; // ID del item requerido
  alternativeDescription?: string; // Descripción si no tienes el item
}

interface DecisionScreenProps {
  player: Player;
  event: DecisionEvent;
  inventory: Item[];
  onComplete: (updatedPlayer: Player, itemToAdd?: Item, itemToRemove?: string) => void;
  frameWidth?: number;
  frameHeight?: number;
}

export function DecisionScreen({ player, event, inventory, onComplete, frameWidth: propFrameWidth, frameHeight: propFrameHeight }: DecisionScreenProps) {
  const hasRequiredItem = event.requiredItem ? inventory.some(item => item.id === event.requiredItem) : true;
  const displayDescription = !hasRequiredItem && event.alternativeDescription ? event.alternativeDescription : event.description;
  
  const [eventLog, setEventLog] = useState<string[]>([displayDescription]);
  const [resolved, setResolved] = useState(false);
  
  // Ref para medir el contenedor central y calcular dimensiones proporcionales
  const centralContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(480); // Altura por defecto

  useLayoutEffect(() => {
    const currentRef = centralContainerRef.current;
    if (currentRef) {
      const updateDimensions = () => {
        const height = currentRef.offsetHeight;
        setContainerHeight(height);
      };
      
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  // Calcular dimensiones basadas en la altura del contenedor (igual que HallwayScreen)
  const frameHeight = propFrameHeight || containerHeight * 0.9;
  const frameWidth = propFrameWidth || frameHeight * (112 / 160);
  
  // Calcular dimensiones de imagen basadas en el marco
  // Imagen original: 96x128
  const imageWidth = frameWidth * (96 / 112);
  const imageHeight = frameHeight * (128 / 160);

  const handleDecision = (choice: 'yes' | 'no') => {
    if (resolved) return;
    
    setResolved(true);
    const effect = choice === 'yes' ? event.yesEffect : event.noEffect;
    let result = effect(player, inventory);
    
    // Aplicar multiplicador de locura al cambio
    const originalMadness = player.madness;
    const newMadness = result.player.madness;
    const madnessDiff = newMadness - originalMadness;
    
    if (madnessDiff !== 0) {
      const adjustedDiff = Math.floor(madnessDiff * player.madnessMultiplier);
      result.player = {
        ...result.player,
        madness: Math.max(0, Math.min(originalMadness + adjustedDiff, result.player.maxMadness))
      };
    }
    
    // Aplicar efecto doble de pociones si está iluminado
    if (player.madnessState === 'enlightened') {
      const hpDiff = result.player.hp - player.hp;
      const mpDiff = result.player.mp - player.mp;
      
      if (hpDiff > 0) {
        result.player = {
          ...result.player,
          hp: Math.min(player.hp + (hpDiff * 2), result.player.maxHp)
        };
      }
      
      if (mpDiff > 0) {
        result.player = {
          ...result.player,
          mp: Math.min(player.mp + (mpDiff * 2), result.player.maxMp)
        };
      }
    }
    
    setEventLog([...eventLog, result.message]);
    
    // Verificar umbral de locura
    result.player = checkMadnessThreshold(result.player, (msg) => setEventLog(prev => [...prev, msg]));
    
    setTimeout(() => {
      onComplete(result.player, result.itemToAdd, result.itemToRemove);
    }, 2000);
  };

  const hpPercent = (player.hp / player.maxHp) * 100;
  const mpPercent = (player.mp / player.maxMp) * 100;
  const madnessPercent = (player.madness / player.maxMadness) * 100;

  // Colores según estado de locura
  const getMadnessColor = () => {
    if (player.madnessState === 'enlightened') return 'bg-yellow-400';
    if (player.madnessState === 'mad') return 'bg-red-700';
    return 'bg-purple-600';
  };

  const getMadnessBorderColor = () => {
    if (player.madnessState === 'enlightened') return 'border-yellow-600';
    if (player.madnessState === 'mad') return 'border-red-900';
    return 'border-purple-900';
  };

  const getStateText = () => {
    if (player.madnessState === 'enlightened') return 'ILUMINADO';
    if (player.madnessState === 'mad') return 'LOCO';
    return 'LOCURA';
  };

  const getStateTextColor = () => {
    if (player.madnessState === 'enlightened') return 'text-yellow-400';
    if (player.madnessState === 'mad') return 'text-red-500';
    return 'text-purple-500';
  };

  return (
    <div className="w-full h-full flex flex-col justify-center bg-black">
      {/* 1. ESTADÍSTICAS - Justificadas al marco central y ancladas hacia abajo */}
      <div className="w-full flex justify-center items-end pb-0">
        <div style={{ width: `${frameWidth}px` }}>
          <GameHUD player={player} />
        </div>
      </div>

      {/* 2. SECCIÓN CENTRAL - Parte mayoritaria de la pantalla */}
      <div 
        ref={centralContainerRef} 
        className="flex items-end justify-center overflow-visible"
        style={{ height: `${frameHeight}px` }}
      >
        <div
          className="inline-flex items-center justify-center relative"
          style={{ width: `${frameWidth}px`, height: `${frameHeight}px` }}
        >
          {/* Imagen del evento - Mismas dimensiones que el pasillo (96x128) */}
          <div className="relative bg-black overflow-hidden" style={{ width: `${frameWidth}px`, height: `${frameHeight}px` }}>
            <div className="relative flex items-center justify-center overflow-hidden" style={{ width: '100%', height: '100%' }}>
              <ImageWithFallback 
                src={getEventSprite(event.id)}
                alt={event.description}
                className="block"
                style={{ 
                  imageRendering: 'pixelated',
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`
                }}
              />
            </div>
          </div>

          {/* Marco decorativo superior - igual que en exploración */}
          <div
            className="absolute flex items-center justify-center z-20 pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
              left: "0",
              top: "0",
            }}
          >
            <ImageWithFallback
              src={EXPLORATION_UI_SPRITES.frameOverlay}
              alt="Marco decorativo"
              style={{
                imageRendering: "pixelated",
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. MARCO DE TEXTO - Pegado al marco decorativo */}
      <div className="w-full flex justify-center">
        <div
          className="bg-black p-0 flex flex-col justify-end overflow-hidden"
          style={{ 
            width: `${frameWidth}px`, 
            height: "100px",
            border: `${Math.max(1, Math.round(frameWidth / 112))}px solid white`
          }}
        >
          {eventLog.slice(-2).map((log, index) => (
            <div 
              key={eventLog.length - 2 + index} 
              className="text-gray-300 pixel-text text-lg mb-1"
            >
              &gt; {log}
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTONES - Justo debajo del marco de texto, ajustados al margen inferior */}
      <div className="w-full flex justify-center pb-8 mb-4 pt-4">
        <div
          className="relative flex items-center justify-center"
          style={{ width: `${frameWidth}px`, height: `${frameWidth * (32 / 112)}px` }}
        >
          {/* Botón Izquierda (NO) - Ajustado al margen izquierdo */}
          <button
            onClick={() => handleDecision('no')}
            disabled={resolved}
            className="absolute left-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
          >
            <ImageWithFallback
              src={EXPLORATION_UI_SPRITES.buttonLeft}
              alt={event.noText}
              className="w-auto h-auto"
              style={{
                imageRendering: "pixelated",
                width: `${frameWidth * (50 / 112)}px`,
                height: `${frameWidth * (32 / 112)}px`,
              }}
            />
          </button>

          {/* Espacio central vacío (sin botón de inventario en eventos) */}
          
          {/* Botón Derecha (YES) - Ajustado al margen derecho */}
          <button
            onClick={() => handleDecision('yes')}
            disabled={resolved}
            className="absolute right-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
          >
            <ImageWithFallback
              src={EXPLORATION_UI_SPRITES.buttonRight}
              alt={event.yesText}
              className="w-auto h-auto"
              style={{
                imageRendering: "pixelated",
                width: `${frameWidth * (50 / 112)}px`,
                height: `${frameWidth * (32 / 112)}px`,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// Eventos de decisión - Actualizados con solo los eventos que tienen imágenes
export const DECISION_EVENTS: DecisionEvent[] = [
  // ═══════════════════════════════════════════════════════════
  // EVENTOS MÍSTICOS (IDs: 1, 2, 4, 6, 8)
  // ═══════════════════════════════════════════════════════════
  {
    id: 1,
    description: 'Encuentras un altar oscuro que emana una energía extraña. ¿Rezar ante él?',
    yesText: 'REZAR',
    noText: 'IGNORAR',
    icon: '⛧',
    imageName: 'event-01-altar-oscuro.png',
    yesEffect: (player, inventory) => {
      const roll = Math.random();
      if (roll < 0.5) {
        return {
          player: { ...player, madness: Math.max(0, player.madness - 20) },
          message: 'Una paz extraña invade tu mente. Tu locura disminuye.'
        };
      } else {
        return {
          player: { ...player, hp: Math.max(0, player.hp - 20) },
          message: 'El altar te drena la vida. Sufres las consecuencias.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player,
      message: 'Decides no tentar al destino. Continúas tu camino.'
    })
  },
  {
    id: 2,
    description: 'Un espejo muestra tu reflejo distorsionado. ¿Mirarlo fijamente?',
    yesText: 'MIRAR',
    noText: 'APARTAR LA VISTA',
    icon: '🪞',
    imageName: 'event-02-espejo-distorsionado.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, madness: Math.min(player.maxMadness, player.madness + 15) },
      message: 'Tu reflejo te susurra secretos prohibidos. La locura crece.'
    }),
    noEffect: (player, inventory) => ({
      player: { ...player, mp: Math.min(player.maxMp, player.mp + 15) },
      message: 'Rompes el espejo. Tu maná se fortalece con su energía.'
    })
  },
  {
    id: 4,
    description: 'Voces susurran desde la oscuridad, ofreciendo poder. ¿Escucharlas?',
    yesText: 'ESCUCHAR',
    noText: 'TAPAR OÍDOS',
    icon: '👂',
    imageName: 'event-04-voces-oscuridad.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, mp: Math.min(player.maxMp, player.mp + 25), madness: Math.min(player.maxMadness, player.madness + 20) },
      message: 'Las voces te otorgan maná, pero tu mente se fractura.'
    }),
    noEffect: (player, inventory) => ({
      player: { ...player, madness: Math.max(0, player.madness - 10) },
      message: 'Silencias las voces. Tu cordura mejora ligeramente.'
    })
  },
  {
    id: 6,
    description: 'Una estatua llora lágrimas de sangre. ¿Tocarlas?',
    yesText: 'TOCAR',
    noText: 'ALEJARSE',
    icon: '🗿',
    imageName: 'event-06-estatua-llorosa.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, hp: Math.max(0, player.hp - 15), mp: Math.min(player.maxMp, player.mp + 20) },
      message: 'La sangre quema tu piel pero aumenta tu poder mágico.'
    }),
    noEffect: (player, inventory) => ({
      player,
      message: 'Te alejas de la estatua maldita.'
    })
  },
  {
    id: 8,
    description: 'Una vela negra arde con llama verde. ¿Apagarla?',
    yesText: 'APAGAR',
    noText: 'DEJAR ARDER',
    icon: '🕯️',
    imageName: 'event-08-vela-negra.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, madness: Math.max(0, player.madness - 25) },
      message: 'La llama maldita se extingue. Tu mente se aclara.'
    }),
    noEffect: (player, inventory) => ({
      player: { ...player, madness: Math.min(player.maxMadness, player.madness + 10) },
      message: 'La llama verde intensifica su brillo. Sientes inquietud.'
    })
  },
  
  // ═══════════════════════════════════════════════════════════
  // EVENTOS CON OBJETOS (IDs: 11, 12, 13, 14, 15)
  // ═══════════════════════════════════════════════════════════
  {
    id: 11,
    description: 'Encuentras una llave antigua en el suelo. Parece importante.',
    yesText: 'TOMAR LLAVE',
    noText: 'DEJAR',
    icon: '🗝️',
    imageName: 'event-11-llave-antigua.png',
    yesEffect: (player, inventory) => ({
      player,
      message: 'Tomas la llave antigua. Quizás la necesites más adelante.',
      itemToAdd: { id: 'ancient_key', name: 'Llave Antigua', type: 'key', effect: 0 }
    }),
    noEffect: (player, inventory) => ({
      player,
      message: 'Dejas la llave. Probablemente no era importante.'
    })
  },
  {
    id: 12,
    description: 'Una puerta cerrada bloquea tu camino. Tiene una cerradura oxidada.',
    yesText: 'USAR LLAVE',
    noText: 'FORZAR PUERTA',
    icon: '🚪',
    requiredItem: 'ancient_key',
    alternativeDescription: 'Una puerta cerrada bloquea tu camino. No tienes la llave.',
    imageName: 'event-12-puerta-cerrada.png',
    yesEffect: (player, inventory) => {
      const hasKey = inventory.some(item => item.id === 'ancient_key');
      if (hasKey) {
        return {
          player: { ...player, hp: Math.min(player.maxHp, player.hp + 30), mp: Math.min(player.maxMp, player.mp + 20) },
          message: '¡La llave funciona! Detrás hay un cofre con tesoros curativos.',
          itemToRemove: 'ancient_key'
        };
      } else {
        return {
          player: { ...player, madness: Math.min(player.maxMadness, player.madness + 15) },
          message: 'No tienes llave. La frustración te consume.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player: { ...player, hp: Math.max(0, player.hp - 20), madness: Math.min(player.maxMadness, player.madness + 10) },
      message: 'Intentas forzar la puerta. Te lastimas y la puerta no cede.'
    })
  },
  {
    id: 13,
    description: 'Encuentras una antorcha apagada cubierta de aceite sagrado.',
    yesText: 'ENCENDER',
    noText: 'IGNORAR',
    icon: '🔥',
    imageName: 'event-13-antorcha-sagrada.png',
    yesEffect: (player, inventory) => ({
      player,
      message: 'Enciendes la antorcha. Una llama sagrada arde con luz purificadora.',
      itemToAdd: { id: 'sacred_flame', name: 'Llama Sagrada', type: 'key', effect: 0 }
    }),
    noEffect: (player, inventory) => ({
      player,
      message: 'Dejas la antorcha apagada. La oscuridad no te asusta... aún.'
    })
  },
  {
    id: 14,
    description: 'Una criatura de sombras bloquea el pasillo. La luz podría ahuyentarla.',
    yesText: 'USAR LLAMA',
    noText: 'ENFRENTAR',
    icon: '👻',
    requiredItem: 'sacred_flame',
    alternativeDescription: 'Una criatura de sombras bloquea el pasillo. Desearías tener luz.',
    imageName: 'event-14-criatura-sombras.png',
    yesEffect: (player, inventory) => {
      const hasFlame = inventory.some(item => item.id === 'sacred_flame');
      if (hasFlame) {
        return {
          player: { ...player, madness: Math.max(0, player.madness - 30) },
          message: '¡La llama sagrada disipa las sombras! Tu mente se aclara.',
          itemToRemove: 'sacred_flame'
        };
      } else {
        return {
          player: { ...player, madness: Math.min(player.maxMadness, player.madness + 25) },
          message: 'Sin luz, las sombras susurran en tu mente. La locura crece.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player: { ...player, hp: Math.max(0, player.hp - 30), madness: Math.min(player.maxMadness, player.madness + 20) },
      message: 'Intentas atravesar las sombras. Te drenan vida y cordura.'
    })
  },
  {
    id: 15,
    description: 'Un amuleto brillante descansa en un pedestal. Emite una luz cálida.',
    yesText: 'TOMAR AMULETO',
    noText: 'NO TOCAR',
    icon: '📿',
    imageName: 'event-15-amuleto-brillante.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, madness: Math.max(0, player.madness - 10) },
      message: 'Tomas el amuleto protector. Su calidez calma tu mente.',
      itemToAdd: { id: 'protective_amulet', name: 'Amuleto Protector', type: 'key', effect: 0 }
    }),
    noEffect: (player, inventory) => ({
      player,
      message: 'Respetas el pedestal y continúas tu camino.'
    })
  },
  {
    id: 16,
    description: 'Un portal demoníaco se abre ante ti. Energía oscura emana de él.',
    yesText: 'USAR AMULETO',
    noText: 'HUIR',
    icon: '🌀',
    requiredItem: 'protective_amulet',
    alternativeDescription: 'Un portal demoníaco se abre. Sin protección, estás vulnerable.',
    imageName: 'event-16-portal-demoniaco.png',
    yesEffect: (player, inventory) => {
      const hasAmulet = inventory.some(item => item.id === 'protective_amulet');
      if (hasAmulet) {
        return {
          player: { ...player, hp: Math.min(player.maxHp, player.hp + 40), madness: Math.max(0, player.madness - 20) },
          message: '¡El amuleto absorbe la energía demoníaca! Te fortalece y purifica tu mente.',
          itemToRemove: 'protective_amulet'
        };
      } else {
        return {
          player: { ...player, hp: Math.max(0, player.hp - 40), madness: Math.min(player.maxMadness, player.madness + 30) },
          message: 'Sin protección, la energía demoníaca te corrompe. Dolor y locura invaden tu ser.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player: { ...player, hp: Math.max(0, player.hp - 20), madness: Math.min(player.maxMadness, player.madness + 15) },
      message: 'Huyes, pero la energía del portal te alcanza. Te sientes débil y confundido.'
    })
  },
  
  // ═══════════════════════════════════════════════════════════
  // EVENTOS AMBIENTALES (IDs: 17, 18, 19, 20)
  // ═══════════════════════════════════════════════════════════
  {
    id: 17,
    description: 'Encuentras un cristal de energía pura flotando en el aire.',
    yesText: 'ABSORBER',
    noText: 'ALEJARSE',
    icon: '💎',
    imageName: 'event-17-cristal-energia.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, mp: Math.min(player.maxMp, player.mp + 50), madness: Math.min(player.maxMadness, player.madness + 15) },
      message: 'Absorbes el cristal. Maná desbordante, pero tu mente se tambalea.'
    }),
    noEffect: (player, inventory) => ({
      player: { ...player, hp: Math.min(player.maxHp, player.hp + 10) },
      message: 'Te alejas. El cristal emite un pulso curativo antes de desvanecerse.'
    })
  },
  {
    id: 18,
    description: 'Un pozo de agua oscura. Puedes ver tu reflejo del pasado.',
    yesText: 'BEBER',
    noText: 'ESCUPIR EN ÉL',
    icon: '🌊',
    imageName: 'event-18-pozo-oscuro.png',
    yesEffect: (player, inventory) => {
      const roll = Math.random();
      if (roll < 0.5) {
        return {
          player: { ...player, hp: Math.min(player.maxHp, player.hp + 25), madness: Math.max(0, player.madness - 20) },
          message: 'El agua purifica tu cuerpo y mente. Te sientes renovado.'
        };
      } else {
        return {
          player: { ...player, hp: Math.max(0, player.hp - 15), madness: Math.min(player.maxMadness, player.madness + 25) },
          message: 'El agua estaba maldita. Visiones horribles inundan tu mente.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player: { ...player, madness: Math.min(player.maxMadness, player.madness + 5) },
      message: 'Escupes en el pozo. Tu reflejo te mira con odio.'
    })
  },
  {
    id: 19,
    description: 'Una campana gigante cuelga del techo. Tiene inscripciones antiguas.',
    yesText: 'TOCAR CAMPANA',
    noText: 'SILENCIO',
    icon: '🔔',
    imageName: 'event-19-campana-gigante.png',
    yesEffect: (player, inventory) => {
      const roll = Math.random();
      if (roll < 0.4) {
        return {
          player: { ...player, madness: Math.max(0, player.madness - 35) },
          message: 'El sonido sagrado purifica tu mente. La locura se desvanece.'
        };
      } else {
        return {
          player: { ...player, hp: Math.max(0, player.hp - 20), madness: Math.min(player.maxMadness, player.madness + 20) },
          message: 'El sonido atrae criaturas. Sufres un ataque repentino.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player,
      message: 'Pasas en silencio. A veces es mejor no hacer ruido.'
    })
  },
  {
    id: 20,
    description: 'Encuentras un fragmento de alma atrapado en una gema.',
    yesText: 'LIBERAR ALMA',
    noText: 'TOMAR GEMA',
    icon: '✨',
    imageName: 'event-20-gema-alma.png',
    yesEffect: (player, inventory) => ({
      player: { ...player, hp: Math.min(player.maxHp, player.hp + 20), mp: Math.min(player.maxMp, player.mp + 20), madness: Math.max(0, player.madness - 20) },
      message: 'Liberas el alma. En agradecimiento, te bendice con sus últimas fuerzas.'
    }),
    noEffect: (player, inventory) => ({
      player: { ...player, mp: Math.min(player.maxMp, player.mp + 40), madness: Math.min(player.maxMadness, player.madness + 30) },
      message: 'Tomas la gema. El alma grita en tu mente. Poder a cambio de cordura.'
    })
  },
  
  // ═══════════════════════════════════════════════════════════
  // EVENTOS DE TIENDA (IDs: 21, 22, 23)
  // ═══════════════════════════════════════════════════════════
  {
    id: 21,
    description: 'Un vendedor encapuchado te ofrece un Elixir de Renovación. "50 de vida y 30 de maná... a cambio de 30 de tu cordura."',
    yesText: 'COMPRAR (30 LOCURA)',
    noText: 'RECHAZAR',
    icon: '🧪',
    imageName: 'event-21-tienda-elixir.png',
    yesEffect: (player, inventory) => {
      if (player.madness >= 30) {
        return {
          player: { ...player, madness: player.madness - 30 },
          message: 'Pagas con tu cordura. El vendedor te entrega el elixir.',
          itemToAdd: { id: 'renewal_elixir', name: 'Elixir de Renovación', type: 'potion', effect: 50 }
        };
      } else {
        return {
          player,
          message: 'No tienes suficiente locura para pagar. El vendedor desaparece entre las sombras.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player,
      message: 'Rechazas la oferta. El vendedor asiente y se desvanece en la oscuridad.'
    })
  },
  {
    id: 22,
    description: 'El mismo vendedor aparece con un Cristal de Lucidez. "Reduce 50 de locura permanentemente... pero necesito 40 de tu vida."',
    yesText: 'COMPRAR (40 VIDA)',
    noText: 'RECHAZAR',
    icon: '💠',
    imageName: 'event-22-tienda-cristal.png',
    yesEffect: (player, inventory) => {
      if (player.hp > 40) {
        return {
          player: { ...player, hp: player.hp - 40 },
          message: 'Sangre por claridad. El cristal es tuyo.',
          itemToAdd: { id: 'lucidity_crystal', name: 'Cristal de Lucidez', type: 'mana', effect: -50 }
        };
      } else {
        return {
          player,
          message: 'No tienes suficiente vida para pagar. El vendedor guarda el cristal.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player,
      message: 'Rechazas el trato. "Sabio", dice el vendedor antes de partir.'
    })
  },
  {
    id: 23,
    description: 'El vendedor regresa con una Esencia Arcana que brilla intensamente. "80 de poder mágico puro... solo cuesta 25 de tu fuerza vital."',
    yesText: 'COMPRAR (25 VIDA)',
    noText: 'RECHAZAR',
    icon: '⚗️',
    imageName: 'event-23-tienda-esencia.png',
    yesEffect: (player, inventory) => {
      if (player.hp > 25) {
        return {
          player: { ...player, hp: player.hp - 25 },
          message: 'Sientes el drenaje, pero la esencia arcana vale el precio.',
          itemToAdd: { id: 'arcane_essence', name: 'Esencia Arcana', type: 'mana', effect: 80 }
        };
      } else {
        return {
          player,
          message: 'No tienes suficiente vida. El vendedor guarda la esencia con cuidado.'
        };
      }
    },
    noEffect: (player, inventory) => ({
      player,
      message: 'Declines. El vendedor sonríe. "Hasta la próxima, viajero."'
    })
  },
];