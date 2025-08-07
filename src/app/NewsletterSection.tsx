"use client";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  return (
    <section className="bg-annie-purple text-white px-4 py-24 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-serif mb-8"
      >
        There’s always something new happening at the studio. Let’s stay in
        touch!
      </motion.h2>
      <form className="max-w-xl mx-auto space-y-6">
        <input
          type="email"
          required
          placeholder="Enter Email Address"
          className="w-full bg-transparent border-b border-white/40 pb-3 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors duration-300 text-lg"
        />
        <button
          type="submit"
          className="w-full bg-white text-annie-purple py-4 mt-8 uppercase tracking-widest hover:bg-annie-brown hover:text-white transition-all duration-300 font-medium rounded shadow"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
