"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const images = ["/v9.webp", "/v10.webp", "/v11.webp"];

export default function OriginalSection({
  onViewAllWork,
}: {
  onViewAllWork?: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !textRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        pin: textRef.current,
        pinSpacing: false,
        scrub: true,
      });

      imgRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: -320,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center bg-annie-cream overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-row items-center justify-between gap-8 pointer-events-none z-0 w-full h-full">
        {images.map((src, index) => (
          <div
            key={src}
            ref={(el) => {
              imgRefs.current[index] = el; // Fixed ref callback - no return value
            }}
            className="h-[340px] w-1/3 rounded-xl overflow-hidden shadow-xl bg-white"
            style={{ zIndex: 1 }}
          >
            <Image
              src={src}
              alt="Work"
              width={500}
              height={340}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div
        ref={textRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full flex flex-col items-center"
      >
        <h2
          className="text-6xl md:text-7xl font-serif mb-8 inline-block px-8 py-4 rounded-xl shadow text-black"
          style={{ background: "transparent" }}
        >
          Original, Personal,
          <br />
          Convivial
        </h2>
        {onViewAllWork && (
          <button
            onClick={onViewAllWork}
            className="mt-4 text-lg uppercase tracking-widest border-b-2 border-black/60 pb-2 px-8 py-3 rounded bg-white text-black font-medium shadow hover:border-footer focus:outline-none transition-all duration-300 hover:bg-footer hover:text-annie-cream"
          >
            View All Work
          </button>
        )}
      </div>
    </section>
  );
}
