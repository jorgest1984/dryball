import { ImageWithFallback } from './figma/ImageWithFallback';
import { UI_SPRITES } from '../data/sprites';
import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-8 text-center h-full">
      {/* ═══════════════════════════════════════════════════════════
          LOGO DEL TÍTULO
          ═══════════════════════════════════════════════════════════
          CÓMO REEMPLAZAR:
          1. Sube tu imagen a: /ui/title-logo.png
          2. Tamaño recomendado: 800x200px (horizontal)
          3. Estilo: Logo "DRYB4LL" en pixel art
          ═══════════════════════════════════════════════════════════ */}
      <div className="animate-pulse w-[90%]">
        <ImageWithFallback 
          src={UI_SPRITES.titleLogo}
          alt="DRYB4LL"
          className="w-full h-auto object-contain"
          style={{ 
            imageRendering: 'pixelated',
            transform: 'scale(1.25)'
          }}
        />
      </div>
      
      {/* ═══════════════════════════════════════════════════════════
          BOTÓN DE COMENZAR
          ═══════════════════════════════════════════════════════════
          CÓMO REEMPLAZAR:
          1. Sube tus imágenes a: /ui/button-start.png y /ui/button-start-hover.png
          2. Tamaño recomendado: 400x120px (horizontal)
          3. Estilo: Botón "COMENZAR" en pixel art
          ═══════════════════════════════════════════════════════════ */}
      <button
        onClick={onStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="animate-pulse transition-transform hover:scale-105"
      >
        <ImageWithFallback 
          src={isHovered ? UI_SPRITES.buttonStartHover : UI_SPRITES.buttonStart}
          alt="Comenzar"
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