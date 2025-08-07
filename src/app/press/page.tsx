"use client";
import PressSection from "../PressSection";
import Footer from "../Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function PressPage() {
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
        <PressSection />
      </div>
      <Footer />
    </main>
  );
}
