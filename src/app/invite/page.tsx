"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Moon, CloudRain, Clock } from "lucide-react";

function RainEffect() {
  const [drops, setDrops] = useState<
    { left: string; delay: string; opacity: number }[]
  >([]);

  useEffect(() => {
    const newDrops = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `-${Math.random() * 2}s`, // Negative delay for initial stagger
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="rain-container">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: drop.left,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [noButtonStyle, setNoButtonStyle] = useState({
    top: "0px",
    left: "0px",
  });
  const [showCard, setShowCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inlineButtonRef = useRef<HTMLButtonElement>(null);

  const questions = [
    {
      question: "Do you remember our first call? 💭",
      options: ["Of course! 💝", "How could I forget? 🥰"],
    },
    {
      question: "Have I told you today how amazing you are? ✨",
      options: ["Yes, but tell me again! 😊", "I'd love to hear it! 💫"],
    },
    {
      question: "Would you like to make another beautiful memory with me? 🌙",
      options: ["I'd love to! 💖", "Absolutely! 🥰"],
    },
  ];

  const messages = [
    "Noice try! 😏",
    "Still no? 😅",
    "You can keep trying! 😘",
    "My Goldfish! 🐟",
    "You know what to do... 💝",
  ];

  useEffect(() => {
    if (inlineButtonRef.current) {
      const bbox = inlineButtonRef.current.getBoundingClientRect();
      setNoButtonStyle({
        top: `${bbox.top}px`,
        left: `${bbox.left}px`,
      });
    }
  }, []);

  const moveButton = () => {
    if (!buttonRef.current) return;

    const buttonWidth = buttonRef.current.offsetWidth;
    const buttonHeight = buttonRef.current.offsetHeight;
    const padding = 50; // Minimum distance from viewport edges

    // Calculate safe boundaries
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    const minX = padding;
    const minY = padding;

    // Ensure the button stays within bounds
    const x = Math.max(minX, Math.min(maxX, Math.random() * maxX));
    const y = Math.max(minY, Math.min(maxY, Math.random() * maxY));

    setNoButtonStyle({ top: `${y}px`, left: `${x}px` });
    setAttempts((prev) => prev + 1);
  };

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowCard(true);
    }
  };

  if (showCard) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <RainEffect />
        <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-8 animate-fade-in backdrop-blur-sm border border-slate-700 relative z-10">
          <div className="flex justify-center gap-2">
            <Moon className="w-8 h-8 text-indigo-400" />
            <Heart className="w-8 h-8 text-rose-400 animate-pulse" />
            <CloudRain className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Our first virtual date 💖
          </h1>

          <div className="space-y-6">
            <p className="text-slate-300 text-md">
              My dear wife, I love you so much 💖. Would you like to go out on a
              date with me? Well... not actually go out, but we can have a
              virtual date. So, would you like to join me and create more
              beautiful memories together?
              <br />
              <br />
              <span className="text-sm text-slate-400">
                P.S. It will be our first video call as well 🤭
              </span>
            </p>
            <div className="mt-8 text-slate-400 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Sunday at 11 PM</span>
              </div>
              <p>Dress code: Your more comfortable and cozy outfit 😊</p>
              <p>Weather forecast: Bheeshan garmi ☀️</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-fuchsia-300 font-medium">
              I can't wait to spend this magical evening with you ❤️
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <RainEffect />
      <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 backdrop-blur-sm border border-slate-700 relative z-10">
        <div className="flex justify-center gap-2">
          <Moon className="w-8 h-8 text-indigo-400" />
          <Heart className="w-8 h-8 text-rose-400 animate-bounce" />
          <CloudRain className="w-8 h-8 text-blue-400" />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            {questions[currentQuestion].question}
          </h2>

          <div className="flex flex-col gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                ref={inlineButtonRef}
                key={index}
                onClick={handleAnswer}
                className="px-8 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30"
              >
                {option}
              </button>
            ))}
            <button
              style={{
                opacity: attempts === 0 ? 1 : 0,
              }}
              onMouseEnter={() => {
                if (attempts === 0) {
                  moveButton();
                }
              }}
              onClick={() => {
                if (attempts === 0) {
                  moveButton();
                }
              }}
              className="px-8 py-3 bg-slate-600 text-white rounded-full transition-all shadow-lg shadow-slate-500/30"
            >
              No way!
            </button>
          </div>
        </div>
      </div>
      <button
        ref={buttonRef}
        style={{
          position: "fixed",
          opacity: attempts > 0 ? 1 : 0,
          zIndex: 1000,
          ...noButtonStyle,
        }}
        onMouseEnter={moveButton}
        onClick={moveButton}
        className="px-8 py-3 bg-slate-600 text-white rounded-full transition-all shadow-lg shadow-slate-500/30"
      >
        No way!
        {attempts > 0 && (
          <span className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-600">
            {messages[Math.min(attempts - 1, messages.length - 1)]}
          </span>
        )}
      </button>
    </div>
  );
}

export default App;
