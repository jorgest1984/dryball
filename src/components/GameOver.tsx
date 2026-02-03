import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UI_SPRITES } from '../data/sprites';

interface GameOverProps {
  onRestart: () => void;
}

export function GameOver({ onRestart }: GameOverProps) {
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fade in lento
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center gap-8 p-8 text-center h-full w-full transition-opacity duration-[2000ms]"
      style={{ opacity }}
    >
      <div className="mb-4">
        <ImageWithFallback
          src={UI_SPRITES.gameOver}
          alt="Game Over"
          className="w-auto h-auto"
          style={{ 
            imageRendering: 'pixelated',
            width: '200px',
            height: 'auto'
          }}
        />
      </div>
      <h1 className="text-6xl text-red-600 pixel-text">GAME OVER</h1>
      <p className="text-2xl text-gray-400 pixel-text">Has caído en la oscuridad...</p>
      
      <button
        onClick={onRestart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="transition-transform hover:scale-105 mt-4"
      >
        <ImageWithFallback 
          src={isHovered ? UI_SPRITES.buttonStartHover : UI_SPRITES.buttonStart}
          alt="Reintentar"
          className="w-auto h-auto object-contain"
          style={{ 
            imageRendering: 'pixelated',
            transform: 'scale(2)'
          }}
        />
      </button>
    </div>
  );
}