"use client";

import { useEffect, useRef } from "react";
import { Mic, MicOff, Keyboard } from "lucide-react";
import gsap from "gsap";

interface VoiceSectionProps {
  isListening: boolean;
  transcript: string;
  handleSend: () => void;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<"voice" | "text">>;
}

export default function VoiceSection({
  isListening,
  transcript,
  setIsListening,
  handleSend,
  setMode,
}: VoiceSectionProps) {
  const micRef = useRef<HTMLButtonElement | null>(null);

  const handleMicClick = () => {
    setIsListening((prev) => !prev);
    console.log(isListening);

    if (isListening) handleSend();
  };

  useEffect(() => {
    if (micRef.current) {
      if (isListening) {
        gsap.to(micRef.current, {
          boxShadow: "0 0 25px 10px rgba(34,197,94,0.6)",
          scale: 1.15,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(micRef.current, {
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          scale: 1,
          duration: 0.3,
          clearProps: "all",
        });
      }
    }
  }, [isListening]);

  return (
    <>
      <button
        ref={micRef}
        onClick={handleMicClick}
        className="p-10 rounded-full bg-emerald-600 transition focus:outline-none"
      >
        {isListening ? <MicOff size={48} /> : <Mic size={48} />}
      </button>

      <p className="mt-6 text-lg font-medium">
        {isListening
          ? "Listening..."
          : transcript
          ? "Tap to speak again"
          : "Tap to start speaking"}
      </p>

      {transcript && (
        <p className="text-emerald-400 mt-2 text-sm italic max-w-xs text-center">
          “{transcript}”
        </p>
      )}

      <button
        onClick={() => setMode("text")}
        className="mt-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <Keyboard size={16} /> Switch to text
      </button>
    </>
  );
}
