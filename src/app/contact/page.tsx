"use client";
import { motion } from "framer-motion";
import SecureForm from "../components/SecureForm";
import Footer from "../Footer";

export default function ContactPage() {
  const handleSubmit = async (data: Record<string, string>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend
    console.log("Contact form data:", data);

    // Simulate different response scenarios
    if (Math.random() > 0.8) {
      throw new Error("Network error");
    }
  };

  const contactFields = [
    {
      name: "name",
      type: "text" as const,
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      type: "email" as const,
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      name: "phone",
      type: "tel" as const,
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: false,
    },
    {
      name: "subject",
      type: "text" as const,
      label: "Subject",
      placeholder: "What is this regarding?",
      required: true,
    },
    {
      name: "message",
      type: "textarea" as const,
      label: "Message",
      placeholder: "Tell us about your project or inquiry",
      required: true,
    },
  ];

  return (
    <main className="pt-24 min-h-screen bg-annie-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your space? Let's discuss your vision and create
            something extraordinary together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-serif text-annie-brown mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">512 651 5742</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">studio@anniedowning.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Studio Address
                  </h3>
                  <p className="text-gray-600">
                    919 W. 29th St. Suite 203
                    <br />
                    Austin, TX 78705
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-annie-brown mb-4">
                Security Features
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Input validation for all fields</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>XSS prevention with HTML escaping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CSRF protection with tokens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rate limiting (5 requests/minute)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Double submission prevention</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Input length constraints</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <SecureForm
              fields={contactFields}
              onSubmit={handleSubmit}
              title="Send us a Message"
              description="Fill out the form below and we'll get back to you within 24 hours."
              submitText="Send Message"
              rateLimitIdentifier="contact-form"
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
