"use client";
import { motion } from "framer-motion";
import SecureForm from "./components/SecureForm";

export default function NewsletterSection() {
  const handleSubmit = async (data: Record<string, string>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would send this data to your backend
    console.log("Newsletter section subscription data:", data);
  };

  const newsletterFields = [
    {
      name: "email",
      type: "email" as const,
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
    },
  ];

  return (
    <section className="bg-annie-purple text-white px-4 py-24 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-serif mb-8"
      >
        There&apos;s always something new happening at the studio. Let&apos;s
        stay in touch!
      </motion.h2>

      <div className="max-w-xl mx-auto">
        <SecureForm
          fields={newsletterFields}
          onSubmit={handleSubmit}
          title=""
          description=""
          submitText="Subscribe"
          rateLimitIdentifier="newsletter-section"
          className="bg-transparent border-white/20 text-white"
        />
      </div>
    </section>
  );
}
