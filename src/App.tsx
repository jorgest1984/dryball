import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HallwayScreen } from "./components/HallwayScreen";
import { CombatScreen } from "./components/CombatScreen";
import { GameHUD } from "./components/GameHUD";
import { InventoryPanel } from "./components/InventoryPanel";
import { DialogueBox } from "./components/DialogueBox";
import { GameOver } from "./components/GameOver";
import { StartScreen } from "./components/StartScreen";
import {
  DecisionScreen,
  DECISION_EVENTS,
  DecisionEvent,
} from "./components/DecisionScreen";
import {
  EventType,
  EXPLORATION_UI_SPRITES,
} from "./data/sprites";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export type GameState =
  | "start"
  | "exploration"
  | "combat"
  | "dialogue"
  | "inventory"
  | "gameOver"
  | "victory"
  | "decision"
  | "hallway";

export type MadnessState = "normal" | "enlightened" | "mad";

export interface Player {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  madness: number;
  maxMadness: number;
  madnessState: MadnessState;
  madnessMultiplier: number;
}

export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  type: "skeleton" | "demon" | "wraith" | "boss";
}

export interface Item {
  id: string;
  name: string;
  type: "potion" | "mana" | "key";
  effect: number;
}

const MYSTIC_EVENTS = [1, 2, 4, 6, 8];
const OBJECT_EVENTS = [11, 12, 13, 14, 15, 16];
const AMBIENT_EVENTS = [17, 18, 19, 20];
const SHOP_EVENTS = [21, 22, 23]; // Eventos de tienda únicos

export default function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [player, setPlayer] = useState<Player>({
    hp: 100,
    maxHp: 100,
    mp: 100,
    maxMp: 100,
    madness: 0,
    maxMadness: 100,
    madnessState: "normal",
    madnessMultiplier: 1.0,
  });

  const [inventory, setInventory] = useState<Item[]>([
    { id: "1", name: "Poción de vida", type: "potion", effect: 30 },
    { id: "2", name: "Poción de vida", type: "potion", effect: 30 },
    { id: "3", name: "Poción de maná", type: "mana", effect: 20 },
  ]);

  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [dialogue, setDialogue] = useState<string>("");
  const [showInventory, setShowInventory] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [explorationLog, setExplorationLog] = useState<string[]>([
    "Explorando las mazmorras...",
  ]);
  const [currentDecision, setCurrentDecision] = useState<DecisionEvent | null>(
    null
  );
  const [eventCount, setEventCount] = useState(0);
  const [bossSpawned, setBossSpawned] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState<
    "left" | "right" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [leftEventType, setLeftEventType] = useState<EventType>("ambiental");
  const [rightEventType, setRightEventType] = useState<EventType>("combate");

  // Estados para controlar las dimensiones de los marcos
  const centralContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(480); // Valor inicial razonable
  const [frameWidth, setFrameWidth] = useState(480 * 0.9 * (112 / 160)); // Calculado desde altura inicial
  const [frameHeight, setFrameHeight] = useState(480 * 0.9); // 90% de altura inicial

  const startGame = () => {
    setGameState("hallway");
    setPlayer({
      hp: 100,
      maxHp: 100,
      mp: 100,
      maxMp: 100,
      madness: 0,
      maxMadness: 100,
      madnessState: "normal",
      madnessMultiplier: 1.0,
    });
    setInventory([
      { id: "1", name: "Poción de vida", type: "potion", effect: 30 },
      { id: "2", name: "Poción de vida", type: "potion", effect: 30 },
      { id: "3", name: "Poción de maná", type: "mana", effect: 20 },
    ]);
    setEventCount(0);
    setBossSpawned(false);
    setExplorationLog(["Entrando a los pasillos oscuros..."]);

    const eventTypes: EventType[] = [
      "ambiental",
      "combate",
      "tesoro",
      "objeto",
      "mistico",
    ];
    const leftType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];
    let rightType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];
    while (rightType === leftType) {
      rightType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    }
    setLeftEventType(leftType);
    setRightEventType(rightType);
  };

  const spawnEnemy = useCallback((): Enemy => {
    const enemyTypes: Enemy[] = [
      { name: "Esqueleto", hp: 40, maxHp: 40, type: "skeleton" },
      { name: "Demonio Menor", hp: 60, maxHp: 60, type: "demon" },
      { name: "Espectro", hp: 50, maxHp: 50, type: "wraith" },
    ];
    const randomEnemy =
      enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    return { ...randomEnemy };
  }, []);

  const spawnBoss = (): Enemy => {
    return {
      name: "Señor de las Tinieblas",
      hp: 350,
      maxHp: 350,
      type: "boss",
    };
  };

  const handleCombatVictory = (enemy: Enemy) => {
    if (enemy.type === "boss") {
      setGameState("victory");
    } else {
      const eventTypes: EventType[] = [
        "ambiental",
        "combate",
        "tesoro",
        "objeto",
        "mistico",
      ];
      const leftType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];
      let rightType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];
      while (rightType === leftType) {
        rightType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      }
      setLeftEventType(leftType);
      setRightEventType(rightType);

      setGameState("hallway");
      setExplorationLog((prev) => [
        ...prev,
        "Victoria. Continúas por el pasillo...",
      ]);
    }

    setCombatLog([]);
    setCurrentEnemy(null);
  };

  const handleCombatDefeat = () => {
    setGameState("gameOver");
  };

  const handleDecisionComplete = (
    updatedPlayer: Player,
    itemToAdd?: Item,
    itemToRemove?: string
  ) => {
    setPlayer(updatedPlayer);

    if (itemToAdd) {
      setInventory((prev) => [...prev, itemToAdd]);
      setExplorationLog((prev) => [
        ...prev,
        `¡Obtuviste ${itemToAdd.name}!`,
      ]);
    }

    if (itemToRemove) {
      setInventory((prev) => prev.filter((item) => item.id !== itemToRemove));
    }

    if (updatedPlayer.hp <= 0) {
      setGameState("gameOver");
    } else {
      setGameState("hallway");
      setExplorationLog((prev) => [
        ...prev,
        "Tomas tu decisión y avanzas...",
      ]);
    }
    setCurrentDecision(null);
  };

  const handleUseItem = (item: Item) => {
    if (gameState !== "combat") return;

    setPlayer((prev) => {
      const multiplier = prev.madnessState === "enlightened" ? 2 : 1;
      if (item.type === "potion") {
        const healAmount = item.effect * multiplier;
        return {
          ...prev,
          hp: Math.min(prev.hp + healAmount, prev.maxHp),
        };
      } else if (item.type === "mana") {
        // Manejo especial para items con efecto negativo (Cristal de Lucidez)
        if (item.effect < 0) {
          const madnessReduction = Math.abs(item.effect);
          return {
            ...prev,
            madness: Math.max(0, prev.madness - madnessReduction),
          };
        } else {
          const manaAmount = item.effect * multiplier;
          return {
            ...prev,
            mp: Math.min(prev.mp + manaAmount, prev.maxMp),
          };
        }
      }
      return prev;
    });

    setInventory((prev) => {
      const index = prev.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const newInventory = [...prev];
        newInventory.splice(index, 1);
        return newInventory;
      }
      return prev;
    });

    const multiplier = player.madnessState === "enlightened" ? 2 : 1;
    if (item.effect < 0) {
      setCombatLog((prev) => [
        ...prev,
        `Usaste ${item.name} - Tu locura disminuyó`,
      ]);
    } else if (multiplier > 1) {
      setCombatLog((prev) => [
        ...prev,
        `Usaste ${item.name} (¡EFECTO DOBLE POR ILUMINACIÓN!)`,
      ]);
    } else {
      setCombatLog((prev) => [...prev, `Usaste ${item.name}`]);
    }
    setShowInventory(false);
  };

  const triggerRandomEncounter = useCallback(() => {
    const enemy = spawnEnemy();
    setCurrentEnemy(enemy);
    setGameState("combat");
    setCombatLog([`¡Apareció un ${enemy.name}!`]);
  }, [spawnEnemy]);

  const findTreasure = () => {
    const treasures = [
      {
        id: Date.now().toString(),
        name: "Poción de vida",
        type: "potion" as const,
        effect: 30,
      },
      {
        id: Date.now().toString(),
        name: "Poción de maná",
        type: "mana" as const,
        effect: 20,
      },
    ];
    const treasure =
      treasures[Math.floor(Math.random() * treasures.length)];
    setInventory((prev) => [...prev, treasure]);
    setExplorationLog((prev) => [
      ...prev,
      `¡Encontraste ${treasure.name}!`,
    ]);
  };

  const triggerRandomDecision = () => {
    const randomEvent =
      DECISION_EVENTS[Math.floor(Math.random() * DECISION_EVENTS.length)];
    setCurrentDecision(randomEvent);
    setGameState("decision");
  };

  const getRandomEventByType = (eventType: EventType): void => {
    let eventIds: number[] = [];

    switch (eventType) {
      case "ambiental":
        eventIds = AMBIENT_EVENTS;
        break;
      case "tesoro":
        eventIds = SHOP_EVENTS;
        break;
      case "objeto":
        eventIds = OBJECT_EVENTS;
        break;
      case "mistico":
        eventIds = MYSTIC_EVENTS;
        break;
      case "combate":
        triggerRandomEncounter();
        return;
    }

    if (eventIds.length === 0) {
      triggerRandomEncounter();
      return;
    }

    const randomEventId =
      eventIds[Math.floor(Math.random() * eventIds.length)];
    const selectedEvent = DECISION_EVENTS.find((e) => e.id === randomEventId);

    if (selectedEvent) {
      setCurrentDecision(selectedEvent);
      setGameState("decision");
    } else {
      triggerRandomEncounter();
    }
  };

  const generateNewEventTypes = useCallback(() => {
    const eventTypes: EventType[] = [
      "ambiental",
      "combate",
      "tesoro",
      "objeto",
      "mistico",
    ];

    const leftType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];
    let rightType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];

    while (rightType === leftType) {
      rightType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    }

    setLeftEventType(leftType);
    setRightEventType(rightType);
  }, []);

  const handleChooseDirection = (direction: "left" | "right") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSelectedDirection(direction);

    const chosenEventType =
      direction === "left" ? leftEventType : rightEventType;
    setExplorationLog((prev) => [
      ...prev,
      `Avanzas hacia la ${direction === "left" ? "izquierda" : "derecha"}...`,
    ]);

    setTimeout(() => {
      const newEventCount = eventCount + 1;
      setEventCount(newEventCount);

      if (newEventCount >= 50 && !bossSpawned && Math.random() < 0.25) {
        const boss = spawnBoss();
        setCurrentEnemy(boss);
        setGameState("combat");
        setCombatLog([`¡${boss.name} emerge de las sombras!`]);
        setBossSpawned(true);
        setExplorationLog((prev) => [
          ...prev,
          "Una presencia oscura se acerca...",
        ]);
      } else {
        getRandomEventByType(chosenEventType);
      }

      generateNewEventTypes();
      setSelectedDirection(null);
      setIsAnimating(false);
    }, 5000);
  };

  useEffect(() => {
    if (gameState !== "hallway") return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "i") {
        setShowInventory(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState]);

  useEffect(() => {
    if (gameState === "hallway") {
      if (player.madnessState === "enlightened") {
        setExplorationLog((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (!lastMessage?.includes("ILUMINADO")) {
            return [
              ...prev,
              "¡Estás ILUMINADO! Tu poder se ha duplicado...",
            ];
          }
          return prev;
        });
      } else if (player.madnessState === "mad") {
        setExplorationLog((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (!lastMessage?.includes("LOCO")) {
            return [
              ...prev,
              "¡Has ENLOQUECIDO! Tu mente está fragmentada...",
            ];
          }
          return prev;
        });
      } else if (player.madness >= 90) {
        setExplorationLog((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (
            !lastMessage?.includes("CRÍTICO") &&
            !lastMessage?.includes("límite")
          ) {
            return [
              ...prev,
              "¡ALERTA CRÍTICA! Tu cordura está al límite...",
            ];
          }
          return prev;
        });
      } else if (player.madness >= 70) {
        setExplorationLog((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (
            !lastMessage?.includes("aumenta") &&
            !lastMessage?.includes("CUIDADO")
          ) {
            return [
              ...prev,
              "Tu locura aumenta peligrosamente...",
            ];
          }
          return prev;
        });
      }
    }
  }, [player.madness, player.madnessState, gameState]);

  useLayoutEffect(() => {
    const currentRef = centralContainerRef.current;
    if (currentRef) {
      const updateDimensions = () => {
        // Usar requestAnimationFrame para asegurar que el layout se ha completado
        requestAnimationFrame(() => {
          const height = currentRef.offsetHeight;
          
          // Solo actualizar si tenemos dimensiones válidas
          if (height > 0) {
            setContainerHeight(height);
            
            // Calcular dimensiones del marco basadas en la altura del contenedor
            // Usar 0.9 para consistencia en todas las pantallas
            const frameHeight = height * 0.9;
            const calculatedFrameWidth = frameHeight * (112 / 160);
            
            setFrameWidth(calculatedFrameWidth);
            setFrameHeight(frameHeight);
          }
        });
      };
      
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []); // Sin dependencias - solo se ejecuta en mount y en resize

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <StartScreen onStart={startGame} />
          </motion.div>
        )}

        {gameState === "hallway" && (
          <motion.div
            key="hallway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col justify-center bg-black"
          >
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
              <HallwayScreen
                selectedDirection={selectedDirection}
                leftEventType={leftEventType}
                rightEventType={rightEventType}
                containerHeight={containerHeight}
                frameWidth={frameWidth}
                frameHeight={frameHeight}
              />
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
                {explorationLog.slice(-2).map((log, index) => (
                  <div
                    key={explorationLog.length - 2 + index}
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
                {/* Botón Izquierda - Ajustado al margen izquierdo */}
                <button
                  onClick={() => handleChooseDirection("left")}
                  disabled={isAnimating}
                  className="absolute left-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
                  style={{ zIndex: 1 }}
                >
                  <ImageWithFallback
                    src={EXPLORATION_UI_SPRITES.buttonLeft}
                    alt="Ir a la izquierda"
                    className="w-auto h-auto"
                    style={{
                      imageRendering: "pixelated",
                      width: `${frameWidth * (50 / 112)}px`,
                      height: `${frameWidth * (32 / 112)}px`,
                    }}
                  />
                </button>

                {/* Botón Inventario - Centrado y superpuesto */}
                <button
                  onClick={() => setShowInventory(true)}
                  className="absolute transition-all hover:opacity-80"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10
                  }}
                >
                  <ImageWithFallback
                    src={EXPLORATION_UI_SPRITES.buttonInventory}
                    alt="Abrir inventario"
                    className="w-auto h-auto"
                    style={{
                      imageRendering: "pixelated",
                      width: `${frameWidth * (32 / 112)}px`,
                      height: `${frameWidth * (32 / 112)}px`,
                    }}
                  />
                </button>

                {/* Botón Derecha - Ajustado al margen derecho */}
                <button
                  onClick={() => handleChooseDirection("right")}
                  disabled={isAnimating}
                  className="absolute right-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
                  style={{ zIndex: 1 }}
                >
                  <ImageWithFallback
                    src={EXPLORATION_UI_SPRITES.buttonRight}
                    alt="Ir a la derecha"
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

            {showInventory && (
              <InventoryPanel
                inventory={inventory}
                onClose={() => setShowInventory(false)}
                onUseItem={handleUseItem}
                inCombat={false}
                frameWidth={frameWidth}
              />
            )}
          </motion.div>
        )}

        {gameState === "combat" && currentEnemy && (
          <motion.div
            key="combat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <CombatScreen
              player={player}
              enemy={currentEnemy}
              inventory={inventory}
              combatLog={combatLog}
              onVictory={handleCombatVictory}
              onDefeat={handleCombatDefeat}
              onPlayerUpdate={setPlayer}
              onEnemyUpdate={setCurrentEnemy}
              onLogUpdate={setCombatLog}
              onUseItem={handleUseItem}
              frameWidth={frameWidth}
              frameHeight={frameHeight}
            />
          </motion.div>
        )}

        {gameState === "dialogue" && (
          <motion.div
            key="dialogue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <DialogueBox text={dialogue} onClose={() => setGameState("hallway")} />
          </motion.div>
        )}

        {gameState === "decision" && currentDecision && (
          <motion.div
            key="decision"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <DecisionScreen
              player={player}
              event={currentDecision}
              inventory={inventory}
              onComplete={handleDecisionComplete}
              frameWidth={frameWidth}
              frameHeight={frameHeight}
            />
          </motion.div>
        )}

        {gameState === "gameOver" && (
          <motion.div
            key="gameOver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <GameOver onRestart={() => setGameState("start")} />
          </motion.div>
        )}

        {gameState === "victory" && (
          <motion.div
            key="victory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center gap-8 p-8">
              <h1 className="text-6xl text-amber-400 animate-pulse pixel-text">
                ¡VICTORIA!
              </h1>
              <p className="text-2xl text-gray-300 pixel-text text-center max-w-2xl">
                Has derrotado al Señor de las Tinieblas y restaurado la luz al
                reino.
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-black pixel-text text-xl transition-colors border-4 border-amber-800"
              >
                Jugar de nuevo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}