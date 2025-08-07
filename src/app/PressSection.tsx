"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Added Next.js Image component

const press = [
  {
    title:
      "Anatomy Of A Design: ADI Wallpaper Launches Its Inaugural Collection",
    source: "Aspire",
    link: "#",
    img: "/v12.webp",
    quote: "A visionary leap in modern interiors.",
  },
  {
    title:
      "Lindye Galloway's designs for RH, must-see releases from McGee & Co., Roman and Williams Guild, and more",
    source: "Business of Home",
    link: "#",
    img: "/v8.webp",
    quote: "Design that feels like the future, today.",
  },
  {
    title:
      "A 1960s Houston House Gets a Refresh to Match Its Owners' Youthful Energy",
    source: "Frederic Magazine",
    link: "#",
    img: "/v7.webp",
    quote: "Spaces that inspire and rejuvenate.",
  },
];

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  const confetti = Array.from({ length: 18 }, (_item, index) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.7,
    color: ["#a16207", "#fce8de", "#fff7f1", "#331628"][index % 4],
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {confetti.map((c, index) => (
        <motion.div
          key={index}
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

export default function PressSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [confettiIdx, setConfettiIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { rotateX: -80, opacity: 0, transformOrigin: "top center" },
          {
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  function ParallaxBg() {
    const dots = Array.from({ length: 18 }, (_item, index) => ({
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
        {dots.map((d, index) => (
          <motion.div
            key={index}
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

  return (
    <section id="press" className="relative max-w-7xl mx-auto px-4 py-24">
      <ParallaxBg />
      <h2 className="text-2xl uppercase tracking-widest mb-16 font-light text-center text-annie-brown">
        In the Press
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {press.map((item, index) => (
          <motion.div
            key={item.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group cursor-pointer bg-white/60 glass text-annie-brown rounded-3xl p-0 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-visible border border-annie-brown/10"
            style={{ minHeight: 420 }}
            whileHover={{
              scale: 1.04,
              rotateY: 8,
              boxShadow: "0 8px 32px 0 #a1620733",
            }}
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => {
              setConfettiIdx(index);
              setTimeout(() => setConfettiIdx(null), 1400);
            }}
          >
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
              <motion.div
                className="rounded-full bg-annie-brown text-annie-cream px-6 py-2 text-lg font-serif shadow-xl border-2 border-white/60"
                animate={{
                  scale: hovered === index ? [1, 1.12, 1] : 1,
                  boxShadow:
                    hovered === index
                      ? "0 0 32px 8px #a16207cc"
                      : "0 2px 12px 0 #a1620733",
                }}
                transition={{
                  duration: 1.2,
                  repeat: hovered === index ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                {item.source}
              </motion.div>
            </motion.div>
            <div className="overflow-hidden rounded-t-3xl relative">
              <Image
                src={item.img}
                alt={item.source}
                width={500}
                height={300}
                className="w-full h-48 object-cover glow-hover"
              />
              <AnimatePresence>
                {hovered === index && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-lg rounded-t-3xl z-30"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.p
                      className="text-xl font-serif text-annie-brown text-center px-6 drop-shadow-lg"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      “{item.quote}”
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="p-8">
              <p className="text-xs uppercase tracking-widest opacity-70 leading-relaxed mb-4 text-footer">
                {item.title}
              </p>
              <motion.h4
                className="text-2xl font-serif mb-4 text-annie-brown"
                animate={{ color: hovered === index ? "#a16207" : "#331628" }}
                transition={{ duration: 0.3 }}
              >
                {item.source}
              </motion.h4>
              <motion.a
                href={item.link}
                className="inline-flex items-center text-sm uppercase tracking-widest text-footer hover:text-annie-brown transition-colors duration-300 px-4 py-2 rounded relative overflow-hidden"
                whileHover={{ scale: 1.08 }}
                onMouseDown={(e) => {
                  const btn = e.currentTarget;
                  const ripple = document.createElement("span");
                  ripple.className = "press-ripple";
                  ripple.style.left = `${e.nativeEvent.offsetX}px`;
                  ripple.style.top = `${e.nativeEvent.offsetY}px`;
                  btn.appendChild(ripple);
                  setTimeout(() => ripple.remove(), 600);
                }}
              >
                <span className="relative z-10">Read More</span>
                <motion.svg
                  className="w-4 h-4 ml-3 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>
            </div>
            <ConfettiBurst show={confettiIdx === index} />
          </motion.div>
        ))}
      </div>
      <style>{`
        .press-ripple {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #a16207 0%, #fce8de 80%, transparent 100%);
          opacity: 0.25;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0);
          animation: ripple-press 0.6s cubic-bezier(0.4,0,0.2,1);
          z-index: 2;
        }
        @keyframes ripple-press {
          to {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
