"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SecureForm from "./components/SecureForm";

export default function NewsletterPopup({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (data: Record<string, string>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would send this data to your backend
    console.log("Newsletter subscription data:", data);

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setSubmitted(false), 500);
    }, 1800);
  };

  const newsletterFields = [
    {
      name: "name",
      type: "text" as const,
      label: "Your Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      type: "email" as const,
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
    },
  ];

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
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-annie-brown/20 text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-serif mb-4 text-annie-brown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Welcome to the Studio!
              </motion.h2>
              <motion.p
                className="text-lg text-annie-brown/80 font-light mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Thank you for joining our newsletter. You'll be the first to
                know about new projects and exclusive events.
              </motion.p>
              <ConfettiEffect />
            </motion.div>
          ) : (
            <SecureForm
              fields={newsletterFields}
              onSubmit={handleSubmit}
              title="Join Our Studio Newsletter"
              description="Be the first to know about new projects, inspiration, and exclusive events."
              submitText="Subscribe"
              rateLimitIdentifier="newsletter-popup"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ConfettiEffect() {
  // Simple confetti burst using absolutely positioned divs
  const confetti = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.7,
    color: ["#a16207", "#fce8de", "#fff7f1", "#331628"][i % 4],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
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
