"use client";

import React, { useState, useEffect } from "react";
import { Heart, Flower, Sun, Music, Camera, Sparkles } from "lucide-react";
import { getPublicPath } from "../../lib/utils";

export default function SunshinePage() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 1000);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4 flex-none overflow-hidden"
      style={{
        maxHeight: "100vh",
      }}
    >
      <div className="max-w-md w-full h-full">
        <div
          className={`transform transition-all duration-1000 max-h-full ${
            showMessage
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl px-4 py-6 space-y-4 overflow-auto max-h-full">
            <div className="flex justify-center">
              <Heart className="w-16 h-16 text-yellow-500 animate-pulse" />
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              My Sunshine
            </h1>

            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Your smile brightens my day like a sunflower following the sun.
              You bring warmth and joy to every moment we share.
            </p>

            <div className="relative mx-auto max-w-sm">
              <img
                src={getPublicPath("/images/1.jpg")}
                alt="My sunshine"
                className="rounded-lg w-full object-cover shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin-slow" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center space-y-2">
                <Flower className="w-8 h-8 text-yellow-500" />
                <span className="text-xs text-gray-600">Beautiful</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Sun className="w-8 h-8 text-orange-400" />
                <span className="text-xs text-gray-600">Radiant</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Music className="w-8 h-8 text-yellow-400" />
                <span className="text-xs text-gray-600">Melodious</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-base font-medium text-gray-700">
                Your happiness is my favorite thing in the world
              </p>
              <div className="flex justify-center space-x-2">
                <Camera className="w-5 h-5 text-yellow-500" />
                <span className="text-xs text-gray-500">
                  Forever capturing your beautiful smile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
