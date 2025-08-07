"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { MemoryOrbs } from "./ParticlesBackground";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [0, 10]);
  const rotateY = useTransform(x, [0, 1], [0, -10]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-annie-cream relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating futuristic SVG */}
      <MemoryOrbs count={5} position="top-8 right-8" clearOnClick />
      <motion.svg
        className="absolute top-8 left-8 w-24 h-24 opacity-40"
        viewBox="0 0 64 64"
        fill="none"
        stroke="#a16207"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
      >
        <circle cx="32" cy="32" r="28" />
        <path d="M32 4v56M4 32h56" />
      </motion.svg>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8"
        style={{ rotateX, rotateY }}
      >
        Design for Storied Living
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto"
      >
      Hosanna Walle Interiors crafts spaces that are thoroughly modern and
        utterly timeless.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [10, 30, 10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 flex justify-center"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#331628"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-down animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
