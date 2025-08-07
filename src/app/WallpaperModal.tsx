"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function WallpaperModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-annie-purple text-white p-12 max-w-lg w-full rounded-xl relative shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl hover:opacity-70 transition"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-3xl font-serif mb-6">ADI Wallpaper</h2>
            <p className="mb-8 opacity-90 text-lg leading-relaxed">
              Let your walls do the talking. The inaugural collection of ADI product is here!
            </p>
            <button className="bg-white text-annie-purple px-8 py-3 rounded font-semibold uppercase tracking-widest hover:bg-annie-brown hover:text-white transition-all duration-300">
              View Here
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 