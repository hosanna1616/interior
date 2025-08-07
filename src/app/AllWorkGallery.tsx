"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/v1.webp",
    title: "sofa styling",
  },
  {
    src: "/v6.webp",
    title: "Office styling",
  },
  {
    src: "/v7.webp",
    title: "Dining Table",
  },
  {
    src: "/v4.webp",
    title: "Dining table",
  },
  {
    src: "/v5.webp",
    title: "Office styling",
  },
  {
    src: "/v2.webp",
    title: "Glamorous Bedroom",
  },
  {
    src: "/v1.webp",
    title: "Artful Living",
  },
  {
    src: "/v3.webp",
    title: "kitchen",
  },
  {
    src: "/v7.webp",
    title: "cloth draping",
  },
];

function ParallaxBg() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 18 + Math.random() * 18,
    opacity: 0.08 + Math.random() * 0.12,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 10,
  }));
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(120deg, #fff7f1 0%, #fce8de 50%, #fff7f1 100%)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-annie-brown"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            top: `${d.top}%`,
            opacity: d.opacity,
            filter: "blur(3px)",
            zIndex: 1,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: d.opacity }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  const confetti = Array.from({ length: 22 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.7,
    color: ["#a16207", "#fce8de", "#fff7f1", "#331628"][i % 4],
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {confetti.map((c, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${c.left}%`,
            top: "50%",
            background: c.color,
            zIndex: 100,
          }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -80 - Math.random() * 60, opacity: 0, scale: 1.6 }}
          transition={{ delay: c.delay, duration: 1.2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function AllWorkGallery({ onClose }: { onClose: () => void }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [confettiIdx, setConfettiIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-annie-cream/95 flex flex-col items-center justify-center px-4 py-12 overflow-auto"
    >
      <ParallaxBg />
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-3xl text-footer hover:opacity-70 transition fire-hover rounded-full w-14 h-14 flex items-center justify-center shadow-xl bg-white/80 backdrop-blur-lg border-2 border-annie-brown"
        aria-label="Close"
      >
        <motion.span
          whileHover={{ rotate: 90, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ×
        </motion.span>
      </button>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-serif mb-10 text-footer drop-shadow-lg"
      >
        All Work
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full"
        initial={{ opacity: 0, scale: 0.96, rotateX: -30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className="rounded-2xl overflow-hidden shadow-2xl bg-white relative cursor-pointer border border-annie-brown/10"
            whileHover={{
              scale: 1.06,
              rotateY: 8,
              boxShadow: "0 8px 32px 0 #a1620733",
            }}
            onHoverStart={() => {}}
            onClick={() => {
              setLightboxIdx(i);
              setConfettiIdx(i);
              setTimeout(() => setConfettiIdx(null), 1400);
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover glow-hover"
            />
            {/* Floating project title overlay on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-lg rounded-2xl z-30 opacity-0 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl font-serif text-annie-brown text-center px-6 drop-shadow-lg">
                {img.title}
              </span>
            </motion.div>
            <ConfettiBurst show={confettiIdx === i} />
          </motion.div>
        ))}
      </motion.div>
      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 60 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg"
            onClick={() => setLightboxIdx(null)}
          >
            <motion.div
              initial={{ rotateY: 60, scale: 0.92 }}
              animate={{ rotateY: 0, scale: 1 }}
              exit={{ rotateY: 60, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative max-w-3xl w-full rounded-3xl p-6 bg-white/90 glass shadow-2xl border border-white/30 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute top-4 right-4 text-2xl text-annie-brown hover:opacity-70 transition rounded-full w-12 h-12 flex items-center justify-center bg-white/80 border-2 border-annie-brown shadow-lg"
                aria-label="Close"
              >
                <motion.span whileHover={{ rotate: 90, scale: 1.2 }}>
                  ×
                </motion.span>
              </button>
              <img
                src={images[lightboxIdx].src}
                alt={images[lightboxIdx].title}
                className="w-full max-h-[70vh] object-contain rounded-2xl shadow-xl mb-6"
              />
              <h3 className="text-2xl font-serif text-annie-brown mb-2 text-center">
                {images[lightboxIdx].title}
              </h3>
              <p className="text-lg text-annie-brown/70 text-center mb-2">
                A showcase of modern, original, and convivial design.
              </p>
              <ConfettiBurst show={confettiIdx === lightboxIdx} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Close Gallery section at the bottom */}
      <div className="flex justify-center mt-16 mb-4 w-full">
        <motion.button
          onClick={onClose}
          whileHover={{
            scale: 1.08,
            backgroundColor: "#a16207",
            color: "#fff",
            boxShadow: "0 8px 32px 0 #a1620733",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-10 py-5 rounded-full bg-footer text-annie-cream text-2xl font-serif font-semibold shadow-xl border-2 border-annie-brown tracking-widest uppercase fire-hover"
        >
          Close Gallery
        </motion.button>
      </div>
    </motion.div>
  );
}
