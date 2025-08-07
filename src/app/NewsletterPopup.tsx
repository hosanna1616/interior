"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterPopup({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setSubmitted(false), 500);
    }, 1800);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative max-w-md w-full rounded-3xl p-10 bg-white/70 glass shadow-2xl border border-white/30 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-annie-brown hover:opacity-70 transition"
            aria-label="Close"
          >
            ×
          </button>
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <defs>
                <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fce8de" />
                  <stop offset="100%" stopColor="#a16207" />
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="28" fill="url(#grad)" opacity="0.7" />
              <path
                d="M32 16v32M16 32h32"
                stroke="#a16207"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-serif mb-6 text-annie-brown drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Join Our Studio Newsletter
          </motion.h2>
          <motion.p
            className="mb-8 text-lg text-annie-brown/80 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Be the first to know about new projects, inspiration, and exclusive
            events.
          </motion.p>
          {!submitted ? (
            <motion.form
              className="w-full flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/60 border-b-2 border-annie-brown/30 py-3 px-4 rounded-lg text-lg text-annie-brown placeholder-annie-brown/40 focus:outline-none focus:border-annie-brown transition-all duration-300 shadow-sm"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/60 border-b-2 border-annie-brown/30 py-3 px-4 rounded-lg text-lg text-annie-brown placeholder-annie-brown/40 focus:outline-none focus:border-annie-brown transition-all duration-300 shadow-sm"
              />
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.06,
                  background: "linear-gradient(90deg,#a16207,#fce8de 80%)",
                  color: "#331628",
                }}
                className="w-full py-4 mt-2 bg-annie-brown text-white uppercase tracking-widest font-semibold rounded-xl shadow-xl transition-all duration-300 text-lg fire-hover"
              >
                Subscribe
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="#a16207"
                    opacity="0.15"
                  />
                  <path
                    d="M20 34l8 8 16-16"
                    stroke="#a16207"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.p className="text-xl font-serif text-annie-brown mb-2">
                Thank you for joining!
              </motion.p>
              <motion.p className="text-base text-annie-brown/70">
                You’re officially on the list.
              </motion.p>
              <ConfettiEffect />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ConfettiEffect() {
  // Simple confetti burst using absolutely positioned divs
  const confetti = Array.from({ length: 18 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.7,
    color: ["#a16207", "#fce8de", "#fff7f1", "#331628"][i % 4],
  }));
  return (
    <div className="absolute inset-0 pointer-events-none">
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
