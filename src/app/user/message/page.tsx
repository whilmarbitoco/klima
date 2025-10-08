"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import VoiceSection from "@/components/VoiceSection";
import ChatSection from "@/components/ChatSection";

export default function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<{ id: number; text: string; isBot?: boolean }[]>([]);
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 🎙️ Speech recognition logic
  useEffect(() => {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) {
      console.warn("Speech Recognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcriptText = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscript(transcriptText);
    };

    recognition.onend = () => setIsListening(false);

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [isListening]);

  // 🎬 Smooth GSAP transition when mode changes
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mode]);

  const handleSend = () => {
    if (!transcript.trim()) return;
    const userMessage = { id: Date.now(), text: transcript, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setTranscript("");
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thanks for your message! I'm here to help with your farming needs. What would you like to know about weather, crops, or irrigation?",
        isBot: true
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full max-w-6xl"
      >
        {mode === "voice" ? (
          <div className="flex flex-col items-center max-w-md mx-auto">
            <VoiceSection
              isListening={isListening}
              transcript={transcript}
              setIsListening={setIsListening}
              setMode={setMode}
            />
          </div>
        ) : (
          <ChatSection
            messages={messages}
            transcript={transcript}
            setTranscript={setTranscript}
            handleSend={handleSend}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}
