// Security utilities for form handling and validation

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  name: /^[a-zA-Z\s'-]{2,50}$/,
  text: /^[\w\s.,!?-]{1,1000}$/,
};

// Input length limits
export const INPUT_LIMITS = {
  name: { min: 2, max: 50 },
  email: { min: 5, max: 254 },
  phone: { min: 10, max: 15 },
  text: { min: 1, max: 1000 },
  message: { min: 1, max: 2000 },
};

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// CSRF token generation and validation
let csrfToken: string | null = null;

export function generateCSRFToken(): string {
  if (!csrfToken) {
    csrfToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
  return csrfToken;
}

export function validateCSRFToken(token: string): boolean {
  return token === csrfToken;
}

// XSS Prevention - HTML character escaping
export function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return escapeHtml(input.trim());
}

// Input validation functions
export function validateEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  if (
    email.length < INPUT_LIMITS.email.min ||
    email.length > INPUT_LIMITS.email.max
  ) {
    return {
      isValid: false,
      error: `Email must be between ${INPUT_LIMITS.email.min} and ${INPUT_LIMITS.email.max} characters`,
    };
  }

  if (!VALIDATION_PATTERNS.email.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
}

export function validateName(name: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name) {
    return { isValid: false, error: "Name is required" };
  }

  if (
    name.length < INPUT_LIMITS.name.min ||
    name.length > INPUT_LIMITS.name.max
  ) {
    return {
      isValid: false,
      error: `Name must be between ${INPUT_LIMITS.name.min} and ${INPUT_LIMITS.name.max} characters`,
    };
  }

  if (!VALIDATION_PATTERNS.name.test(name)) {
    return {
      isValid: false,
      error: "Name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { isValid: true };
}

export function validatePhone(phone: string): {
  isValid: boolean;
  error?: string;
} {
  if (!phone) {
    return { isValid: false, error: "Phone number is required" };
  }

  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  if (
    cleanPhone.length < INPUT_LIMITS.phone.min ||
    cleanPhone.length > INPUT_LIMITS.phone.max
  ) {
    return {
      isValid: false,
      error: `Phone number must be between ${INPUT_LIMITS.phone.min} and ${INPUT_LIMITS.phone.max} digits`,
    };
  }

  if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
    return { isValid: false, error: "Please enter a valid phone number" };
  }

  return { isValid: true };
}

export function validateText(
  text: string,
  fieldName: string = "Text"
): { isValid: boolean; error?: string } {
  if (!text) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (
    text.length < INPUT_LIMITS.text.min ||
    text.length > INPUT_LIMITS.text.max
  ) {
    return {
      isValid: false,
      error: `${fieldName} must be between ${INPUT_LIMITS.text.min} and ${INPUT_LIMITS.text.max} characters`,
    };
  }

  if (!VALIDATION_PATTERNS.text.test(text)) {
    return {
      isValid: false,
      error: `${fieldName} contains invalid characters`,
    };
  }

  return { isValid: true };
}

// Rate limiting (5 requests per minute per IP/identifier)
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Form submission state management
export class FormSubmissionState {
  private isSubmitting: boolean = false;
  private submissionCount: number = 0;
  private lastSubmissionTime: number = 0;

  canSubmit(): boolean {
    if (this.isSubmitting) return false;

    // Prevent rapid submissions (minimum 2 seconds between submissions)
    const now = Date.now();
    if (now - this.lastSubmissionTime < 2000) return false;

    return true;
  }

  startSubmission(): void {
    this.isSubmitting = true;
    this.submissionCount++;
    this.lastSubmissionTime = Date.now();
  }

  endSubmission(): void {
    this.isSubmitting = false;
  }

  getSubmissionCount(): number {
    return this.submissionCount;
  }

  isSubmittingState(): boolean {
    return this.isSubmitting;
  }
}

// Error handling with user-friendly messages
export function handleFormError(error: unknown): string {
  // Don't expose system details to users
  console.error("Form submission error:", error);

  // Type guard to check if error is an object with specific properties
  if (error && typeof error === "object") {
    const errorObj = error as {
      name?: string;
      message?: string;
      status?: number;
    };

    if (
      errorObj.name === "NetworkError" ||
      errorObj.message?.includes("network")
    ) {
      return "Network error. Please check your connection and try again.";
    }

    if (errorObj.status === 429) {
      return "Too many requests. Please wait a moment before trying again.";
    }

    if (errorObj.status && errorObj.status >= 500) {
      return "Server error. Please try again later.";
    }

    if (errorObj.status && errorObj.status >= 400) {
      return "Invalid request. Please check your input and try again.";
    }
  }

  return "An unexpected error occurred. Please try again.";
}

// Comprehensive form validation
export function validateFormData(data: Record<string, string>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  let isValid = true;

  // Validate each field based on its type
  Object.entries(data).forEach(([field, value]) => {
    const sanitizedValue = sanitizeInput(value);

    switch (field.toLowerCase()) {
      case "email":
        const emailValidation = validateEmail(sanitizedValue);
        if (!emailValidation.isValid) {
          errors[field] = emailValidation.error!;
          isValid = false;
        }
        break;

      case "name":
        const nameValidation = validateName(sanitizedValue);
        if (!nameValidation.isValid) {
          errors[field] = nameValidation.error!;
          isValid = false;
        }
        break;

      case "phone":
        const phoneValidation = validatePhone(sanitizedValue);
        if (!phoneValidation.isValid) {
          errors[field] = phoneValidation.error!;
          isValid = false;
        }
        break;

      default:
        const textValidation = validateText(sanitizedValue, field);
        if (!textValidation.isValid) {
          errors[field] = textValidation.error!;
          isValid = false;
        }
        break;
    }
  });

  return { isValid, errors };
}
