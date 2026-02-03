import { Player } from '../App';

interface GameWorldProps {
  player: Player;
  bossDefeated: boolean;
}

export function GameWorld({ player, bossDefeated }: GameWorldProps) {
  const gridSize = 10;

  const getTileType = (x: number, y: number) => {
    // Boss location
    if (x === 9 && y === 0 && !bossDefeated) {
      return 'boss';
    }
    
    // Walls
    if (x === 0 || x === 9 || y === 0 || y === 9) {
      return 'wall';
    }
    
    // Random decorations
    const seed = x * 13 + y * 17;
    if (seed % 7 === 0) return 'rock';
    if (seed % 11 === 0) return 'skull';
    
    return 'floor';
  };

  const getTileColor = (type: string) => {
    switch (type) {
      case 'wall':
        return 'bg-stone-800 border-stone-900';
      case 'rock':
        return 'bg-stone-700 border-stone-800';
      case 'skull':
        return 'bg-stone-900 border-red-900';
      case 'boss':
        return 'bg-red-900 border-red-950 animate-pulse';
      default:
        return 'bg-stone-900 border-stone-950';
    }
  };

  const getTileSymbol = (type: string) => {
    switch (type) {
      case 'wall':
        return '█';
      case 'rock':
        return '▲';
      case 'skull':
        return '☠';
      case 'boss':
        return '👹';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full aspect-square">
      {/* Grid */}
      <div className="absolute inset-0 grid grid-cols-10 gap-[0.2%]">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const tileType = getTileType(x, y);
          
          return (
            <div
              key={index}
              className={`${getTileColor(tileType)} border-2 flex items-center justify-center transition-all`}
              style={{
                imageRendering: 'pixelated',
                fontSize: 'clamp(12px, 2vw, 24px)',
              }}
            >
              {getTileSymbol(tileType)}
            </div>
          );
        })}
      </div>
      
      {/* Player */}
      <div
        className="absolute transition-all duration-200 flex items-center justify-center z-10"
        style={{
          left: `${(player.x / gridSize) * 100}%`,
          top: `${(player.y / gridSize) * 100}%`,
          width: `${100 / gridSize}%`,
          height: `${100 / gridSize}%`,
        }}
      >
        <div className="animate-bounce" style={{ fontSize: 'clamp(20px, 3vw, 40px)' }}>
          ⚔️
        </div>
      </div>
      
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60"></div>
      </div>
    </div>
  );
}
