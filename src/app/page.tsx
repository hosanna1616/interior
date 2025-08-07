"use client";
import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import OriginalSection from "./components/OriginalSection";
import AllWorkGallery from "./components/AllWorkGallery";
import PressSection from "./components/PressSection";
import Footer from "./components/Footer";

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize ref array
  const initializeRefs = () => {
    sectionsRef.current = sectionsRef.current.slice(0, 4);
  };

  return (
    <>
      <main className="pt-24">
        <div
          ref={(el) => {
            initializeRefs();
            if (el) sectionsRef.current[0] = el;
          }}
          className="bookfold-section mb-12"
        >
          <HeroSection />
        </div>

        <div
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className="bookfold-section mb-12"
        >
          <OriginalSection />
        </div>

        <div
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          className="bookfold-section mb-12"
        >
          <AllWorkGallery />
        </div>

        <div
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          id="press"
          className="bookfold-section mb-12"
        >
          <PressSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
