"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import VoiceSection from "@/components/VoiceSection";
import ChatSection from "@/components/ChatSection";
import { FarmDetails, Message, Weather } from "@/types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { TTSService } from "@/lib/tts";
import { getUserFarmDetails } from "@/sevice/userService";
import { getCache, getLatestPrediction } from "@/sevice/weatherService";
import { cleanAIResponse } from "@/lib/utils";

export default function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ttsRef = useRef<TTSService | null>(null);

  const [currentUser, loading] = useCurrentUser();
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [farmData, setFarmData] = useState<FarmDetails | null>(null);
  const [cacheDevice, setcacheDevice] = useState("");

  useEffect(() => {
    ttsRef.current = new TTSService();
    return () => ttsRef.current?.stop();
  }, []);

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
      console.log(event);

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

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mode]);

  useEffect(() => {
    async function checkFarmDetails() {
      if (loading || !currentUser) return;

      const farmDetails = await getUserFarmDetails(currentUser.uid);
      console.log(JSON.stringify(farmDetails));

      setFarmData(farmDetails);

      const cacheDevice = await getCache(currentUser.uid);

      if (cacheDevice != null) {
        setcacheDevice(cacheDevice);
        const cacheWeather = await getLatestPrediction(cacheDevice);
        setWeatherData(cacheWeather);
        console.log("Cache: ", cacheDevice);
      }
    }
    checkFarmDetails();
  }, [currentUser, loading]);

  const handleSend = () => {
    ttsRef.current?.stop();
    if (!transcript.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: transcript,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setTranscript("");

    fetchBotResponse(transcript);
  };

  const fetchBotResponse = async (userMessage: string) => {
    try {
      const requestBody = {
        message: userMessage,
        deviceId: cacheDevice,
        weather: weatherData,
        farm: farmData,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "Error fetching response. Please try again.",
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.message,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (mode === "voice" && ttsRef.current) {
        ttsRef.current.speak(data.message);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 flex items-center justify-center">
      <div ref={containerRef} className="w-full max-w-6xl">
        {mode === "voice" ? (
          <div className="flex flex-col items-center max-w-md mx-auto">
            <VoiceSection
              isListening={isListening}
              transcript={transcript}
              setIsListening={setIsListening}
              handleSend={handleSend}
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
