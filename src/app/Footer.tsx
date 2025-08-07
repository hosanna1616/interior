"use client";
import { motion } from "framer-motion";
import { MemoryOrbs } from "./ParticlesBackground";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="2" y="2" width="20" height="20" rx="6" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M22 5.92a8.38 8.38 0 01-2.36.65A4.13 4.13 0 0021.4 4.1a8.19 8.19 0 01-2.6 1A4.11 4.11 0 0012 8.09v.5A11.66 11.66 0 013 4.59s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.1 4.1 0 00-.08-.74A7.72 7.72 0 0022 5.92z"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2" />
        <path
          d="M16 8a4 4 0 014 4v5h-4v-5a1 1 0 00-2 0v5h-4v-9h4v1.5"
          strokeWidth="2"
        />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-footer text-footer px-4 py-16 mt-12 relative"
    >
      {/* MemoryOrbs removed from footer */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-serif mb-10 leading-tight">
          Spaces for celebration & rejuvenation.
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4 opacity-80">
              Connect
            </h4>
            <div className="space-y-2 text-sm">
              <p>512 651 5742</p>
              <p>studio@hosannawalle.com</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4 opacity-80">
              Studio
            </h4>
            <p className="text-sm">
              919 W. 29th St. Suite 203,
              <br />
              Austin, TX 78705
            </p>
          </div>
          <div>
           
            <a
              href="#"
              className="text-sm hover:opacity-70 transition-opacity duration-300"
            >
            
            </a>
          </div>
        </div>
        {/* Animated Social Icons */}
        <div className="flex justify-center mt-12 gap-8">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2 + i * 0.15,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{
                scale: 1.2,
                rotate: -8 + i * 8,
                color: "#a16207",
                boxShadow: "0 4px 24px 0 rgba(161,98,7,0.18)",
              }}
              className="text-footer hover:text-annie-brown transition-colors duration-300"
              aria-label={s.name}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/20 text-sm opacity-80 gap-4">
          <div className="flex space-x-8">
            <a
              href="#"
              className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-widest"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-widest"
            >
              Project Inquiries
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-widest"
            >
              Privacy Policy
            </a>
          </div>
          <p className="mt-4 md:mt-0">
            Site by SDCO Partners &nbsp; © 2025 Hosanna Walle Interiors
          </p>
        </div>
      </div>
    </footer>
  );
}
