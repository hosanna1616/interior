"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Projects", to: "#projects" },
  { label: "ADI Wallpaper", to: "#adi-wallpaper" },
  { label: "Information", to: "#information" },
  { label: "Press", to: "#press" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navLinks[0].to);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      // Update active link based on scroll position
      const sections = navLinks.map((l) => l.to.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY + 80 >= el.offsetTop) {
          setActive(navLinks[i].to);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-footer/90 shadow-lg backdrop-blur" : "bg-footer/60"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <span className="text-xl font-serif tracking-widest select-none">
          Hosanna Walle
        </span>
        <div className="flex items-center space-x-8 relative">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className={`text-base font-medium uppercase tracking-widest relative px-2 py-1 transition-colors duration-200 focus:outline-none ${
                active === link.to
                  ? "text-annie-brown"
                  : "text-footer hover:text-annie-brown"
              }`}
              onClick={() => setActive(link.to)}
            >
              {link.label}
              {active === link.to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-annie-brown rounded"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
