import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const planets = ["☉", "☽", "☿", "♀", "♂", "♃", "♄", "♅", "♆", "♇"];

export const CosmicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background starfield overflow-hidden"
    >
      {/* Rotating zodiac wheel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-96 h-96"
        >
          {zodiacSigns.map((sign, i) => {
            const angle = (i * 360) / zodiacSigns.length;
            const x = Math.cos((angle * Math.PI) / 180) * 180;
            const y = Math.sin((angle * Math.PI) / 180) * 180;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute text-6xl"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-cosmic-cyan drop-shadow-[0_0_10px_hsl(var(--cosmic-cyan))]">
                  {sign}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Orbiting planets */}
      <div className="absolute inset-0 flex items-center justify-center">
        {planets.map((planet, i) => {
          const radius = 120 + i * 20;
          return (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
              style={{ width: radius * 2, height: radius * 2 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl"
              >
                <span className="text-cosmic-purple drop-shadow-[0_0_8px_hsl(var(--cosmic-purple))]">
                  {planet}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Center cosmic circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10"
      >
        <div className="w-32 h-32 rounded-full cosmic-gradient animate-pulse-glow flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
        </div>
      </motion.div>

      {/* Title text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold cosmic-gradient bg-clip-text text-transparent mb-4">
          宇宙能量的軌跡
        </h1>
        <p className="text-lg text-muted-foreground">西洋星盤復盤學習系統</p>
      </motion.div>
    </motion.div>
  );
};
