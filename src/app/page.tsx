"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import PressSection from "./PressSection";
import OriginalSection from "./OriginalSection";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AllWorkGallery from "./AllWorkGallery"; // Make sure this path is correct
import NewsletterPopup from "./NewsletterPopup";

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  // Initialize ref array for 5 sections
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, 5);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      const child = section.firstElementChild;
      if (!child) return;
      gsap.fromTo(
        child,
        { rotateX: -90, opacity: 0, transformOrigin: "top center" },
        {
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <div
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          className="bookfold-section mb-12"
        >
          <HeroSection />
        </div>

        {/* Projects Section */}
        <div
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className="bookfold-section mb-12"
        >
          <OriginalSection />
          <ProjectsSection onViewAllWork={() => setGalleryOpen(true)} />
        </div>

        {/* Newsletter Trigger */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setNewsletterOpen(true)}
            className="px-8 py-4 bg-annie-purple text-white rounded-full shadow-xl text-lg font-serif tracking-widest hover:bg-annie-brown hover:scale-105 transition-all duration-300 fire-hover"
          >
            Join Our Studio Newsletter
          </button>
        </div>

        {/* Press Section */}
        <div
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          id="press"
          className="bookfold-section mb-12"
        >
          <PressSection />
        </div>

        {/* Gallery Section */}
        <div
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          className="bookfold-section mb-12"
        >
          {/* This is where AllWorkGallery content would go */}
        </div>

        {/* Footer */}
        <div
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
          }}
          className="bookfold-section"
        >
          <Footer />
        </div>
      </main>

      {/* Modals */}
      {galleryOpen && <AllWorkGallery onClose={() => setGalleryOpen(false)} />}
      {newsletterOpen && (
        <NewsletterPopup onClose={() => setNewsletterOpen(false)} />
      )}
    </>
  );
}
