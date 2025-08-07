"use client";
import Footer from "../Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function InformationPage() {
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
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Information</h1>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Connect</h2>
            <p>512 651 5742</p>
            <p>studio@anniedowning.com</p>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Studio</h2>
            <p>
              919 W. 29th St. Suite 203,
              <br />
              Austin, TX 78705
            </p>
          </div>
          <a href="#" className="text-base underline hover:text-annie-brown">
            FAQ
          </a>
        </section>
      </div>
      <Footer />
    </main>
  );
}
