import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Player, Enemy, Item, MadnessState } from '../App';
import { InventoryPanel } from './InventoryPanel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { COMBAT_SPRITES, getEnemySprite, EXPLORATION_UI_SPRITES } from '../data/sprites';
import { GameHUD } from './GameHUD';

interface CombatScreenProps {
  player: Player;
  enemy: Enemy;
  inventory: Item[];
  combatLog: string[];
  onVictory: (enemy: Enemy) => void;
  onDefeat: () => void;
  onPlayerUpdate: (player: Player) => void;
  onEnemyUpdate: (enemy: Enemy) => void;
  onLogUpdate: (log: string[]) => void;
  onUseItem: (item: Item) => void;
  frameWidth?: number;
  frameHeight?: number;
  containerHeight?: number;
}

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

export function CombatScreen({
  player,
  enemy,
  inventory,
  combatLog,
  onVictory,
  onDefeat,
  onPlayerUpdate,
  onEnemyUpdate,
  onLogUpdate,
  onUseItem,
  frameWidth,
  frameHeight,
  containerHeight,
}: CombatScreenProps) {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  const [animatingDamage, setAnimatingDamage] = useState<'player' | 'enemy' | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Ref para medir el contenedor central y calcular dimensiones proporcionales
  const centralContainerRef = useRef<HTMLDivElement>(null);
  const [localContainerHeight, setLocalContainerHeight] = useState(480); // Altura por defecto

  useEffect(() => {
    const currentRef = centralContainerRef.current;
    if (currentRef) {
      const updateDimensions = () => {
        const height = currentRef.offsetHeight;
        setLocalContainerHeight(height);
      };
      
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  // Calcular dimensiones basadas en la altura del contenedor (igual que HallwayScreen)
  const finalFrameHeight = frameHeight ? frameHeight : (containerHeight ? containerHeight * 0.9 : localContainerHeight * 0.9);
  const finalFrameWidth = frameWidth ? frameWidth : finalFrameHeight * (112 / 160);
  const finalImageWidth = finalFrameWidth * (96 / 112);
  const finalImageHeight = finalFrameHeight * (128 / 160);

  const addLog = (message: string) => {
    onLogUpdate([...combatLog, message]);
  };

  const playerAttack = () => {
    if (!isPlayerTurn || actionInProgress) return;
    
    setActionInProgress(true);
    
    // Verificar si falla el ataque (solo si está loco)
    if (player.madnessState === 'mad' && Math.random() < 0.2) {
      addLog('¡Tu ataque falla! La locura te confunde.');
      setIsPlayerTurn(false);
      setActionInProgress(false);
      return;
    }
    
    let baseDamage = 20 + Math.floor(Math.random() * 15);
    let selfDamage = 0;
    let isCritical = false;
    
    // Aplicar efectos según estado
    if (player.madnessState === 'enlightened') {
      // Iluminado: daño doble
      baseDamage *= 2;
    } else if (player.madnessState === 'mad') {
      // Loco: puede ser crítico
      if (Math.random() < 0.3) {
        baseDamage *= 2;
        selfDamage = 20;
        isCritical = true;
      }
    }
    
    const damage = Math.max(1, baseDamage);
    const newEnemyHp = Math.max(0, enemy.hp - damage);
    const newPlayerHp = Math.max(0, player.hp - selfDamage);
    
    onEnemyUpdate({ ...enemy, hp: newEnemyHp });
    
    if (isCritical) {
      addLog(`¡Ataque CRÍTICO! Haces ${damage} de daño pero te lastimas ${selfDamage}.`);
      onPlayerUpdate({ ...player, hp: newPlayerHp });
    } else if (player.madnessState === 'enlightened') {
      addLog(`Atacaste con poder ILUMINADO causando ${damage} de daño.`);
    } else {
      addLog(`Atacaste a ${enemy.name} causando ${damage} de daño.`);
    }
    
    setAnimatingDamage('enemy');
    
    setTimeout(() => {
      if (newEnemyHp <= 0) {
        addLog(`¡${enemy.name} ha caído!`);
        setTimeout(() => onVictory(enemy), 1500);
      } else if (newPlayerHp <= 0) {
        addLog('Te has herido fatalmente...');
        setTimeout(() => onDefeat(), 1500);
      } else {
        setAnimatingDamage(null);
        setIsPlayerTurn(false);
        setActionInProgress(false);
      }
    }, 500);
  };

  const playerMagicAttack = () => {
    if (!isPlayerTurn || actionInProgress || player.mp < 20) return;
    
    setActionInProgress(true);
    
    // Verificar si falla el ataque (solo si está loco)
    if (player.madnessState === 'mad' && Math.random() < 0.2) {
      const newPlayerMp = player.mp - 20;
      onPlayerUpdate({ ...player, mp: newPlayerMp });
      addLog('¡Tu hechizo falla! El maná se desperdicia.');
      setIsPlayerTurn(false);
      setActionInProgress(false);
      return;
    }
    
    let baseDamage = 35 + Math.floor(Math.random() * 20);
    let selfDamage = 0;
    let isCritical = false;
    
    // Aplicar efectos según estado
    if (player.madnessState === 'enlightened') {
      // Iluminado: daño doble
      baseDamage *= 2;
    } else if (player.madnessState === 'mad') {
      // Loco: puede ser crítico
      if (Math.random() < 0.3) {
        baseDamage *= 2;
        selfDamage = 20;
        isCritical = true;
      }
    }
    
    const damage = Math.max(1, baseDamage);
    const newEnemyHp = Math.max(0, enemy.hp - damage);
    const newPlayerMp = player.mp - 20;
    const newPlayerHp = Math.max(0, player.hp - selfDamage);
    
    onEnemyUpdate({ ...enemy, hp: newEnemyHp });
    
    if (isCritical) {
      addLog(`¡Hechizo CRÍTICO! Haces ${damage} de daño pero te lastimas ${selfDamage}.`);
      onPlayerUpdate({ ...player, mp: newPlayerMp, hp: newPlayerHp });
    } else if (player.madnessState === 'enlightened') {
      addLog(`Lanzaste un hechizo ILUMINADO causando ${damage} de daño.`);
      onPlayerUpdate({ ...player, mp: newPlayerMp });
    } else {
      addLog(`Lanzaste un hechizo oscuro causando ${damage} de daño.`);
      onPlayerUpdate({ ...player, mp: newPlayerMp });
    }
    
    setAnimatingDamage('enemy');
    
    setTimeout(() => {
      if (newEnemyHp <= 0) {
        addLog(`¡${enemy.name} ha sido aniquilado!`);
        setTimeout(() => onVictory(enemy), 1500);
      } else if (newPlayerHp <= 0) {
        addLog('Te has herido fatalmente...');
        setTimeout(() => onDefeat(), 1500);
      } else {
        setAnimatingDamage(null);
        setIsPlayerTurn(false);
        setActionInProgress(false);
      }
    }, 500);
  };

  const enemyTurn = () => {
    if (isPlayerTurn) return;
    
    setTimeout(() => {
      let baseDamage = 15 + Math.floor(Math.random() * 15);
      
      // Aplicar modificador según estado del jugador
      if (player.madnessState === 'enlightened') {
        // Iluminado: recibe la mitad de daño
        baseDamage *= 0.5;
      } else if (player.madnessState === 'mad') {
        // Loco: recibe más daño
        baseDamage *= 1.3;
      }
      
      const damage = Math.max(1, Math.floor(baseDamage));
      
      // Aumentar locura al recibir daño (pequeña cantidad)
      const madnessGain = Math.floor(3 + Math.random() * 4); // 3-6 puntos
      const adjustedMadnessGain = Math.floor(madnessGain * player.madnessMultiplier);
      
      const newPlayerHp = Math.max(0, player.hp - damage);
      let newMadness = Math.min(player.madness + adjustedMadnessGain, player.maxMadness);
      
      let updatedPlayer = { ...player, hp: newPlayerHp, madness: newMadness };
      
      onPlayerUpdate(updatedPlayer);
      
      if (player.madnessState === 'enlightened') {
        addLog(`${enemy.name} te atacó pero tu ILUMINACIÓN reduce el daño a ${damage}.`);
      } else if (player.madnessState === 'mad') {
        addLog(`${enemy.name} te atacó brutalmente causando ${damage} de daño.`);
      } else {
        addLog(`${enemy.name} te atacó causando ${damage} de daño.`);
      }
      
      setAnimatingDamage('player');
      
      setTimeout(() => {
        setAnimatingDamage(null);
        
        // Verificar umbral de locura
        updatedPlayer = checkMadnessThreshold(updatedPlayer, addLog);
        onPlayerUpdate(updatedPlayer);
        
        if (newPlayerHp <= 0) {
          addLog('Has sido derrotado...');
          setTimeout(() => onDefeat(), 1500);
        } else {
          setIsPlayerTurn(true);
        }
      }, 500);
    }, 1000);
  };

  useEffect(() => {
    if (!isPlayerTurn && enemy.hp > 0 && player.hp > 0) {
      enemyTurn();
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showInventory || !isPlayerTurn || actionInProgress) return;
      
      if (e.key === ' ' || e.key === 'Enter') {
        playerAttack();
      } else if (e.key === 'm' || e.key === 'M') {
        playerMagicAttack();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInventory(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlayerTurn, player, enemy, showInventory, actionInProgress]);

  const handleUseItemInCombat = (item: Item) => {
    setActionInProgress(true);
    onUseItem(item);
    setShowInventory(false);
    setTimeout(() => {
      setIsPlayerTurn(false);
      setActionInProgress(false);
    }, 500);
  };

  const enemyIcon = {
    skeleton: '💀',
    demon: '👿',
    wraith: '👻',
    boss: '👹',
  }[enemy.type];

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

  const handleAttack = () => {
    playerAttack();
  };

  const handleOpenInventory = () => {
    setShowInventory(true);
  };

  const handleMagicAttack = () => {
    playerMagicAttack();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center bg-black">
      {/* 1. ESTADÍSTICAS - Justificadas al marco central y ancladas hacia abajo */}
      <div className="w-full flex justify-center items-end pb-0">
        <div style={{ width: `${finalFrameWidth}px` }}>
          <GameHUD player={player} />
        </div>
      </div>

      {/* 2. SECCIÓN CENTRAL - Parte mayoritaria de la pantalla */}
      <div 
        ref={centralContainerRef} 
        className="flex items-end justify-center overflow-visible"
        style={{ height: `${finalFrameHeight}px` }}
      >
        <div
          className="inline-flex items-center justify-center relative"
          style={{ width: `${finalFrameWidth}px`, height: `${finalFrameHeight}px` }}
        >
          {/* Imagen del enemigo - Mismas dimensiones que eventos (96x128) */}
          <div className="relative bg-black overflow-hidden" style={{ width: `${finalFrameWidth}px`, height: `${finalFrameHeight}px` }}>
            {/* Fondo del pasillo */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={EXPLORATION_UI_SPRITES.hallwayBackgroundAlt}
                alt="Pasillo oscuro"
                className="opacity-60 block"
                style={{
                  imageRendering: "pixelated",
                  width: `${finalImageWidth}px`,
                  height: `${finalImageHeight}px`,
                }}
              />
            </div>

            {/* Overlay oscuro para mejorar contraste */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Enemigo sobre el fondo */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <ImageWithFallback 
                src={getEnemySprite(enemy.type)}
                alt={enemy.name}
                className={`block transition-all duration-200 ${animatingDamage === 'enemy' ? 'scale-90 opacity-50' : 'scale-100'}`}
                style={{ 
                  imageRendering: 'pixelated',
                  width: `${finalImageWidth}px`,
                  height: `${finalImageHeight}px`
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
                width: `${finalFrameWidth}px`,
                height: `${finalFrameHeight}px`,
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
            width: `${finalFrameWidth}px`, 
            height: "100px",
            border: `${Math.max(1, Math.round(finalFrameWidth / 112))}px solid white`
          }}
        >
          {combatLog.slice(-2).map((log, index) => (
            <div 
              key={combatLog.length - 2 + index} 
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
          className="relative flex items-center justify-center gap-4"
          style={{ width: `${finalFrameWidth}px`, height: "auto" }}
        >
          {/* Botón Ataque - Izquierda */}
          <button
            onClick={handleAttack}
            disabled={!isPlayerTurn || showInventory || actionInProgress}
            className={`transition-all ${
              isPlayerTurn && !showInventory && !actionInProgress 
                ? 'hover:opacity-80 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ImageWithFallback
              src={COMBAT_SPRITES.buttonAttack}
              alt="Atacar"
              className="w-auto h-auto"
              style={{
                imageRendering: "pixelated",
                width: `${finalFrameWidth * (32 / 112)}px`,
                height: `${finalFrameWidth * (32 / 112)}px`,
              }}
            />
          </button>

          {/* Botón Objeto - Centro */}
          <button
            onClick={handleOpenInventory}
            disabled={!isPlayerTurn || actionInProgress}
            className={`transition-all ${
              isPlayerTurn && !actionInProgress
                ? 'hover:opacity-80 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ImageWithFallback
              src={COMBAT_SPRITES.buttonItem}
              alt="Objeto"
              className="w-auto h-auto"
              style={{
                imageRendering: "pixelated",
                width: `${finalFrameWidth * (32 / 112)}px`,
                height: `${finalFrameWidth * (32 / 112)}px`,
              }}
            />
          </button>

          {/* Botón Magia - Derecha */}
          <button
            onClick={handleMagicAttack}
            disabled={!isPlayerTurn || player.mp < 20 || showInventory || actionInProgress}
            className={`transition-all ${
              isPlayerTurn && player.mp >= 20 && !showInventory && !actionInProgress
                ? 'hover:opacity-80 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ImageWithFallback
              src={COMBAT_SPRITES.buttonMagic}
              alt="Magia"
              className="w-auto h-auto"
              style={{
                imageRendering: "pixelated",
                width: `${finalFrameWidth * (32 / 112)}px`,
                height: `${finalFrameWidth * (32 / 112)}px`,
              }}
            />
          </button>
        </div>
      </div>
      
      {/* Inventory Panel Overlay */}
      {showInventory && (
        <InventoryPanel
          inventory={inventory}
          onClose={() => setShowInventory(false)}
          onUseItem={handleUseItemInCombat}
          inCombat={true}
          frameWidth={finalFrameWidth}
        />
      )}
    </div>
  );
}