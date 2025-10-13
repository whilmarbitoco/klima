"use client";

import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot?: boolean;
}

interface ChatSectionProps {
  messages: Message[];
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  setMode: React.Dispatch<React.SetStateAction<"voice" | "text">>;
}

export default function ChatSection({
  messages,
  transcript,
  setTranscript,
  handleSend,
  setMode,
}: ChatSectionProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-full max-h-[80dvh] lg:max-h-[80vh] sm:max-w-4xl sm:mx-auto
        bg-gray-900 sm:bg-transparent"
    >
      <div
        className="
          flex items-center justify-between p-4
          bg-gray-800/40 backdrop-blur-sm border-b border-gray-700/50
          sm:rounded-t-xl
        "
      >
        <button
          onClick={() => setMode("voice")}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">
            KLIMA AI Assistant
          </h2>
        </div>
        <div className="w-9" />
      </div>

      {/* Messages */}
      <div
        className="
          flex-1 overflow-y-auto p-4 space-y-4
          bg-gray-900 sm:bg-gray-800/10 backdrop-blur-sm border-x sm:border border-gray-700/50
        "
      >
        {messages.length ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isBot ? "" : "flex-row-reverse space-x-reverse"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.isBot
                    ? "bg-gray-700/50 text-gray-100 rounded-tl-none"
                    : "bg-green-600/20 text-green-100 border border-green-600/30 rounded-tr-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Welcome to KLIMA AI
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Ask me anything about your crops, weather conditions, or farming
              advice. I&apos;m here to help!
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="
          p-4 bg-gray-800/40 backdrop-blur-sm border-t border-gray-700/50
          sm:rounded-b-xl
        "
      >
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about weather, crops, irrigation..."
              rows={1}
              className="
                w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50
                focus:border-green-500 focus:outline-none resize-none text-sm placeholder-gray-400
              "
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!transcript.trim()}
            className="
              p-3 bg-green-600 text-white rounded-xl hover:bg-green-700
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
