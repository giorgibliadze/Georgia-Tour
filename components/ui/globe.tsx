"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number;
}

/**
 * Animated rotating Earth sphere.
 * Uses CSS background-position animation on a geographic texture.
 * The inset box-shadow creates a realistic lit/shaded hemisphere effect.
 */
const Globe: React.FC<GlobeProps> = ({ className, size = 240 }) => {
  const starPositions = [
    { left: -8,   top: 12,  delay: "0s",    duration: "3s"   },
    { left: -22,  top: 48,  delay: "0.4s",  duration: "2.2s" },
    { left: 195,  top: 95,  delay: "0.8s",  duration: "4s"   },
    { left: 225,  top: -18, delay: "1.2s",  duration: "3.5s" },
    { left: 205,  top: 210, delay: "0.2s",  duration: "2.8s" },
    { left: 250,  top: -35, delay: "1.6s",  duration: "3.2s" },
    { left: 280,  top: 70,  delay: "0.6s",  duration: "2.5s" },
  ];

  return (
    <>
      <style>{`
        @keyframes globe-rotate {
          0%   { background-position: 0 center; }
          100% { background-position: ${size * 1.67}px center; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
      `}</style>

      <div
        className={cn("relative flex-shrink-0", className)}
        style={{ width: size, height: size }}
        role="img"
        aria-label="Rotating Earth globe"
      >
        {/* Globe sphere */}
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            backgroundImage:
              "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
            animation: "globe-rotate 30s linear infinite",
            boxShadow: [
              "0 0 24px rgba(255,255,255,0.12)",
              "-5px 0 10px #c3f4ff inset",
              "15px 3px 28px #000000 inset",
              "-26px -3px 36px rgba(195,244,255,0.45) inset",
              `${size}px 0 44px rgba(0,0,0,0.4) inset`,
              `${size * 0.62}px 0 38px rgba(0,0,0,0.67) inset`,
            ].join(", "),
          }}
        />

        {/* Ambient star particles */}
        {starPositions.map((star, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            aria-hidden="true"
            style={{
              left: star.left,
              top: star.top,
              animation: `star-twinkle ${star.duration} ${star.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Globe;
