"use client";
import Footer from "../Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function ADIWallpaperPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      const child = sectionRef.current.firstElementChild;
      if (child) {
        gsap.fromTo(
          child,
          { rotateX: -90, opacity: 0, transformOrigin: "top center" },
          {
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }
  }, []);
  return (
    <main className="pt-24">
      <div ref={sectionRef} className="bookfold-section mb-12">
        <section className="min-h-[60vh] flex flex-col items-center justify-center bg-footer text-footer px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">
            ADI Wallpaper
          </h1>
          <p className="mb-8 max-w-xl mx-auto text-lg opacity-90">
            Let your walls do the talking. The inaugural collection of ADI
            product is here!
          </p>
          <button className="bg-white text-footer px-8 py-4 rounded font-semibold uppercase tracking-widest hover:bg-annie-brown hover:text-white transition-all duration-300">
            View Collection
          </button>
        </section>
      </div>
      <Footer />
    </main>
  );
}
