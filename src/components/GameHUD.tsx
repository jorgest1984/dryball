import { Player } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { STAT_BAR_SPRITES } from '../data/sprites';

interface GameHUDProps {
  player: Player;
}

export function GameHUD({ player }: GameHUDProps) {
  const hpPercent = (player.hp / player.maxHp) * 100;
  const mpPercent = (player.mp / player.maxMp) * 100;
  const madnessPercent = (player.madness / player.maxMadness) * 100;

  return (
    <div className="flex justify-center items-end gap-8" style={{ height: "100px" }}>
      {/* HP Bar */}
      <div className="flex flex-col items-center h-full justify-end">
        <div className="w-10 flex-1 relative">
          {/* Contenedor de la barra */}
          <div className="w-full h-full bg-black relative overflow-hidden flex flex-col-reverse">
            <div
              className="w-full bg-white transition-all duration-300"
              style={{ height: `${hpPercent}%` }}
            />
          </div>
          {/* Marco de imagen superpuesto */}
          <ImageWithFallback
            src={STAT_BAR_SPRITES.frameHP}
            alt="HP Frame"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
      
      {/* Madness Bar - Center */}
      <div className="flex flex-col items-center h-full justify-end">
        <div className="w-10 flex-1 relative">
          {/* Contenedor de la barra */}
          <div className="w-full h-full bg-black relative overflow-hidden flex flex-col-reverse">
            <div
              className="w-full bg-white transition-all duration-300"
              style={{ height: `${madnessPercent}%` }}
            />
          </div>
          {/* Marco de imagen superpuesto */}
          <ImageWithFallback
            src={STAT_BAR_SPRITES.frameMadness}
            alt="Madness Frame"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
      
      {/* MP Bar */}
      <div className="flex flex-col items-center h-full justify-end">
        <div className="w-10 flex-1 relative">
          {/* Contenedor de la barra */}
          <div className="w-full h-full bg-black relative overflow-hidden flex flex-col-reverse">
            <div
              className="w-full bg-white transition-all duration-300"
              style={{ height: `${mpPercent}%` }}
            />
          </div>
          {/* Marco de imagen superpuesto */}
          <ImageWithFallback
            src={STAT_BAR_SPRITES.frameMP}
            alt="MP Frame"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
}