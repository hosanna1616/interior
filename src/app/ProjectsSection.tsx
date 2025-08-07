"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    number: "01.",
    title: "Living Room MakeOver",
    city: "Houston, TX",
    year: "2024",
    photo: "Lindsay Brown",
    styling: "Adam Fortner",
    img: "/living-room1.jpg",
  },
  {
    number: "02.",
    title: "Bedroom Retreat",
    city: "Austin, TX",
    year: "2024",
    photo: "Lindsay Brown",
    styling: "Adam Fortner",
    img: "/bedroom2.jpg",
  },
  {
    number: "03.",
    title: "shelfie styling",
    city: "Austin, TX",
    year: "2024",
    photo: "Lindsay Brown",
    styling: "Amy Bodle",
    img: "/kitchen.jpg",
  },
];

export default function ProjectsSection({
  onViewAllWork,
}: {
  onViewAllWork?: () => void;
}) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 py-24">
      {projects.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
          className="flex flex-col md:flex-row items-start mb-20 md:mb-32"
        >
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-6xl md:text-8xl font-serif opacity-20 leading-none">
              {p.number}
            </h3>
            <div className="mt-8 text-xs uppercase tracking-widest space-y-2 opacity-70">
              <p>
                Photography <span className="font-semibold">{p.photo}</span>
              </p>
              <p>
                Styling <span className="font-semibold">{p.styling}</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-5/6 md:pl-20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl uppercase tracking-widest font-semibold mb-1">
                  {p.title}
                </h4>
                <p className="text-sm uppercase tracking-widest opacity-60">
                  {p.city}
                </p>
              </div>
              <p className="text-sm uppercase tracking-widest opacity-60">
                Completed {p.year}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={p.img}
                alt={p.title}
                width={900}
                height={500}
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
                priority
              />
            </div>
          </div>
        </motion.div>
      ))}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 32px 0 rgba(51,22,40,0.25)",
            backgroundColor: "#331628",
            color: "#fce8de",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-base uppercase tracking-widest border-b-2 border-black/60 pb-2 px-8 py-3 rounded bg-white text-black font-medium shadow hover:border-footer focus:outline-none"
          onClick={onViewAllWork}
        >
          View All Work
        </motion.button>
      </div>
    </section>
  );
}
