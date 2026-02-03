import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  getEventTypeSprite,
  EventType,
  EXPLORATION_UI_SPRITES,
} from "../data/sprites";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HallwayScreenProps {
  selectedDirection: "left" | "right" | null;
  leftEventType: EventType;
  rightEventType: EventType;
  containerHeight: number;
  frameWidth: number;
  frameHeight: number;
}

export function HallwayScreen({
  selectedDirection,
  leftEventType,
  rightEventType,
  containerHeight,
  frameWidth,
  frameHeight,
}: HallwayScreenProps) {
  // Estados para controlar las animaciones
  const [animationPhase, setAnimationPhase] = useState<"idle" | "fadeUnselected" | "moveToCenter" | "wait" | "fadeOut">("idle");
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [backgroundChanged, setBackgroundChanged] = useState(false);

  // Detectar cuando se selecciona una dirección
  useEffect(() => {
    if (selectedDirection && animationPhase === "idle") {
      // Iniciar secuencia de animación
      setAnimationPhase("fadeUnselected");
      
      // Fase 1: Fade out del lado no elegido (0.8s)
      setTimeout(() => {
        if (selectedDirection === "left") {
          setShowRight(false);
        } else {
          setShowLeft(false);
        }
        setAnimationPhase("moveToCenter");
        setBackgroundChanged(true); // Cambiar fondo al mismo tiempo que inicia el movimiento
        
        // Fase 2: Mover al centro (1.2s)
        setTimeout(() => {
          setAnimationPhase("wait");
          
          // Fase 3: Esperar 2 segundos antes del fade out
          setTimeout(() => {
            setAnimationPhase("fadeOut");
          }, 2000);
        }, 1200);
      }, 800);
    }
  }, [selectedDirection, animationPhase]);

  // Calcular dimensiones del pasillo basadas en el marco
  // Pasillo original: 96x128 (contenido dentro del marco 112x160)
  const hallwayWidth = frameWidth * (96 / 112);
  const hallwayHeight = frameHeight * (128 / 160);
  
  // Calcular tamaño de las imágenes de selección (24x24 proporcional al marco)
  const hintSize = frameWidth * (24 / 112);

  return (
    <motion.div
      className="inline-flex items-center justify-center relative"
      style={{ width: `${frameWidth}px`, height: `${frameHeight}px` }}
      animate={{
        opacity: animationPhase === "fadeOut" ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Pasillo con efecto de perspectiva */}
      <div
        className="relative bg-black overflow-hidden"
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
        }}
      >
        {/* ══════════════════════════════════════════════════════════
            FONDO DEL PASILLO
            ═══════════════════════════════════════════════════════════
            CÓMO REEMPLAZAR:
            1. Sube tu imagen a: /exploration/hallway-background.png
            2. Tamaño: 96x128px (escalado x3 = 288x384px)
            3. Estilo: Pasillo oscuro de mazmorra en pixel art
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
          style={{
            width: `${hallwayWidth}px`,
            height: `${hallwayHeight}px`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={backgroundChanged ? "alt" : "original"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ImageWithFallback
                src={backgroundChanged ? EXPLORATION_UI_SPRITES.hallwayBackgroundAlt : EXPLORATION_UI_SPRITES.hallwayBackground}
                alt="Pasillo oscuro"
                className="block"
                style={{
                  imageRendering: "pixelated",
                  width: `${hallwayWidth}px`,
                  height: `${hallwayHeight}px`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay oscuro para mejorar contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Placeholder de Imagen - Lado Izquierdo - Centrado */}
        <AnimatePresence>
          {showLeft && (
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 overflow-hidden"
              initial={false}
              animate={{
                left: (animationPhase === "moveToCenter" || animationPhase === "wait" || animationPhase === "fadeOut") && selectedDirection === "left" 
                  ? "50%" 
                  : `calc(50% - ${hintSize * 0.6875 * 1.21}px)`,
                opacity: animationPhase === "fadeUnselected" && selectedDirection === "right" ? 0 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationPhase === "moveToCenter" ? 1.2 : 0.8, ease: "easeInOut" }}
              style={{ 
                width: `${hintSize}px`,
                height: `${hintSize}px`
              }}
            >
              <ImageWithFallback
                src={getEventTypeSprite(leftEventType)}
                alt={`Pista: ${leftEventType}`}
                className="w-full h-full object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder de Imagen - Lado Derecho - Centrado */}
        <AnimatePresence>
          {showRight && (
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 overflow-hidden"
              initial={false}
              animate={{
                left: (animationPhase === "moveToCenter" || animationPhase === "wait" || animationPhase === "fadeOut") && selectedDirection === "right" 
                  ? "50%" 
                  : `calc(50% + ${hintSize * 0.6875 * 1.21}px)`,
                opacity: animationPhase === "fadeUnselected" && selectedDirection === "left" ? 0 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationPhase === "moveToCenter" ? 1.2 : 0.8, ease: "easeInOut" }}
              style={{ 
                width: `${hintSize}px`,
                height: `${hintSize}px`
              }}
            >
              <ImageWithFallback
                src={getEventTypeSprite(rightEventType)}
                alt={`Pista: ${rightEventType}`}
                className="w-full h-full object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MARCO DECORATIVO SUPERIOR
          ═══════════════════════════════════════════════════════════
          CÓMO REEMPLAZAR:
          1. Sube tu imagen a: /public/assets/exploration/frame-overlay.png
          2. Tamaño: 112x160px (escalado x3 = 336x480px)
          3. Estilo: Marco decorativo en pixel art con transparencia
          4. La imagen debe tener el centro transparente para ver el contenido
          ═══════════════════════════════════════════════════════════ */}
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
    </motion.div>
  );
}