import { X } from "lucide-react";
import type { ReactNode } from "react";

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SlidePanel({
  isOpen,
  onClose,
  children,
}: SlidePanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        flex items-center justify-center w-full max-w-2xl h-auto 
        rounded-2xl bg-slate-800 z-50 p-8 shadow-2xl"
        style={{
          transition: "none",
          transformOrigin: "center center",
          animation: "none",
          willChange: "auto",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </>
  );
}
