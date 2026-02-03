interface DialogueBoxProps {
  text: string;
  onClose: () => void;
}

export function DialogueBox({ text, onClose }: DialogueBoxProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-end justify-center p-8 z-50">
      <div className="bg-stone-900 border-4 border-amber-700 p-8 max-w-3xl w-full">
        <p className="text-xl text-gray-200 pixel-text mb-6">{text}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-amber-700 hover:bg-amber-600 border-2 border-amber-900 text-white pixel-text transition-colors"
        >
          CONTINUAR (ESPACIO)
        </button>
      </div>
    </div>
  );
}
