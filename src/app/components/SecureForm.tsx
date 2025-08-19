"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  validateFormData,
  validateEmail,
  validateName,
  validatePhone,
  sanitizeInput,
  checkRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  FormSubmissionState,
  handleFormError,
  INPUT_LIMITS,
} from "../utils/security";

interface FormField {
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  label: string;
  placeholder: string;
  required?: boolean;
  validation?: (value: string) => { isValid: boolean; error?: string };
}

interface SecureFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  title?: string;
  description?: string;
  submitText?: string;
  className?: string;
  rateLimitIdentifier?: string;
}

export default function SecureForm({
  fields,
  onSubmit,
  title = "Contact Form",
  description = "Please fill out the form below",
  submitText = "Submit",
  className = "",
  rateLimitIdentifier = "default",
}: SecureFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const submissionState = useRef(new FormSubmissionState());

  // Generate CSRF token on mount
  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, []);

  // Real-time validation
  const validateField = (name: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);

    // Find the field configuration
    const field = fields.find((f) => f.name === name);
    if (!field) return { isValid: true };

    // Use custom validation if provided, otherwise use default validation
    if (field.validation) {
      return field.validation(sanitizedValue);
    }

    // Default validation based on field type
    switch (field.type) {
      case "email":
        return validateEmail(sanitizedValue);
      case "tel":
        return validatePhone(sanitizedValue);
      default:
        return validateName(sanitizedValue);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputBlur = (name: string, value: string) => {
    const validation = validateField(name, value);
    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, [name]: validation.error! }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if form can be submitted
    if (!submissionState.current.canSubmit()) {
      setSubmitMessage({
        type: "error",
        text: "Please wait before submitting again.",
      });
      return;
    }

    // Check rate limiting
    if (!checkRateLimit(rateLimitIdentifier)) {
      setSubmitMessage({
        type: "error",
        text: "Too many requests. Please wait a moment before trying again.",
      });
      return;
    }

    // Validate CSRF token
    if (!validateCSRFToken(csrfToken)) {
      setSubmitMessage({
        type: "error",
        text: "Security validation failed. Please refresh the page and try again.",
      });
      return;
    }

    // Validate all fields
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitMessage({
        type: "error",
        text: "Please correct the errors above.",
      });
      return;
    }

    // Start submission
    submissionState.current.startSubmission();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await onSubmit(formData);

      setSubmitMessage({
        type: "success",
        text: "Form submitted successfully!",
      });

      // Clear form data on success
      setFormData({});
      setErrors({});
    } catch (error) {
      const errorMessage = handleFormError(error);
      setSubmitMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      submissionState.current.endSubmission();
      setIsSubmitting(false);
    }
  };

  const getInputProps = (field: FormField) => {
    const baseProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      value: formData[field.name] || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleInputChange(field.name, e.target.value),
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleInputBlur(field.name, e.target.value),
      className: `w-full bg-white/60 border-b-2 py-3 px-4 rounded-lg text-lg text-annie-brown placeholder-annie-brown/40 focus:outline-none transition-all duration-300 shadow-sm ${
        errors[field.name]
          ? "border-red-500 focus:border-red-500"
          : "border-annie-brown/30 focus:border-annie-brown"
      }`,
    };

    // Add maxLength based on field type
    switch (field.type) {
      case "email":
        return {
          ...baseProps,
          type: "email",
          maxLength: INPUT_LIMITS.email.max,
        };
      case "tel":
        return { ...baseProps, type: "tel", maxLength: INPUT_LIMITS.phone.max };
      case "textarea":
        return {
          ...baseProps,
          as: "textarea",
          rows: 4,
          maxLength: INPUT_LIMITS.message.max,
        };
      default:
        return { ...baseProps, type: "text", maxLength: INPUT_LIMITS.name.max };
    }
  };

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-annie-brown/20 ${className}`}
    >
      <motion.h2
        className="text-3xl font-serif mb-4 text-annie-brown text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="mb-8 text-lg text-annie-brown/80 font-light text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {description}
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CSRF Token */}
        <input type="hidden" name="csrfToken" value={csrfToken} />

        {/* Form Fields */}
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            className="space-y-2"
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-annie-brown"
            >
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea {...getInputProps(field)} />
            ) : (
              <input {...getInputProps(field)} />
            )}

            {/* Error Message */}
            <AnimatePresence>
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors[field.name]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-8 rounded-full text-lg font-serif tracking-widest transition-all duration-300 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-annie-purple text-white hover:bg-annie-brown hover:scale-105 shadow-xl"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {isSubmitting ? "Submitting..." : submitText}
        </motion.button>

        {/* Submit Message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg text-center ${
                submitMessage.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {submitMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
