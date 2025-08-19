"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 20 + Math.random() * 18,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 10 + Math.random() * 10,
  opacity: 0.08 + Math.random() * 0.12,
}));

export const orbs = [
  "Design is intelligence made visible.",
  "Creativity takes courage.",
  "Your space, your story.",
  "Color is a power which directly influences the soul.",
  "Every room needs a touch of black.",
  "Less is more.",
  "Form follows function.",
  "Make it simple, but significant.",
  " Great design is transparent.",
  

  "Design is a journey of discovery.",
  "Functionality breeds beauty.",
  "Let your walls do the talking.",
];

export function MemoryOrbs({
  count = 2,
  position = "bottom-8 right-8",
  className = "",
 /* clearOnClick = false,*/
 
}: {
  count?: number;
  position?: string;
  className?: string;
  clearOnClick?: boolean;
}) {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);
  const [randomQuotes] = useState(() =>
    Array.from(
      { length: count },
      () => orbs[Math.floor(Math.random() * orbs.length)]
    )
  );
  return (
    <div
      className={`absolute ${position} flex flex-col gap-6 items-end pointer-events-none z-10 ${className}`}
    >
      {randomQuotes.map((quote, i) => (
        <motion.div
          key={i}
          className={`rounded-full bg-white shadow-2xl border-2 border-annie-brown cursor-pointer pointer-events-auto flex items-center justify-center transition-all duration-300 ${
            activeOrb === i ? "ring-4 ring-annie-brown/60" : ""
          }`}
          style={{
            width: 44,
            height: 44,
            opacity: 0.98,
            boxShadow:
              activeOrb === i
                ? "0 0 32px 12px #a16207cc"
                : "0 2px 12px 0 #a1620733",
            zIndex: 20,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.98 }}
          transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.18,
            boxShadow: "0 0 40px 16px #a16207cc",
            opacity: 1,
          }}
          onClick={() => setActiveOrb(activeOrb === i ? null : i)}
        >
          <motion.span
            className="block w-3 h-3 rounded-full bg-annie-brown"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {activeOrb === i && (
            <motion.div
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-annie-brown text-sm px-4 py-2 rounded-xl shadow-xl border border-annie-brown whitespace-nowrap font-serif font-semibold max-w-xs text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: "auto", zIndex: 30 }}
            >
              {getInteriorDesignQuote(quote)}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function getInteriorDesignQuote(quote: string) {
  // Optionally, you can map or enhance the quote for more context
  // For now, just return the quote, but you could add more logic here
  return quote;
}

export default function ParticlesBackground() {
  const [windowHeight, setWindowHeight] = useState(1000); // Default fallback for SSR

  useEffect(() => {
    // Only access window on the client side
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(120deg, #fce8de 0%, #fff7f1 50%, #fce8de 100%)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-annie-brown"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: -p.size,
            opacity: p.opacity,
            filter: "blur(3px)",
            zIndex: 1,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -windowHeight - 100, opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Memory orbs removed from background by default; use <MemoryOrbs /> where needed */}
    </div>
  );
}
