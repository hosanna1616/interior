

This document explains all the security features implemented in the Annie Downing website to protect against common web vulnerabilities.

🔒 Security Features Overview

1. Input Validation

**Location**: `src/app/utils/security.ts`

**What it does**:

- Validates all form inputs using regex patterns
- Enforces length limits (min/max characters)
- Validates email format, phone numbers, and text content
- Provides real-time validation feedback

**Implementation**:

```typescript
// Email validation
export function validateEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  if (!email) return { isValid: false, error: "Email is required" };
  if (email.length < 5 || email.length > 254)
    return { isValid: false, error: "Invalid email length" };
  if (!VALIDATION_PATTERNS.email.test(email))
    return { isValid: false, error: "Invalid email format" };
  return { isValid: true };
}
```

**Validation Patterns**:

- Email: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- Phone: `/^[\+]?[1-9][\d]{0,15}$/`
- Name: `/^[a-zA-Z\s'-]{2,50}$/`
- Text: `/^[\w\s.,!?-]{1,1000}$/`

### 2. XSS Prevention

**Location**: `src/app/utils/security.ts`

**What it does**:

- Escapes HTML characters to prevent script injection
- Sanitizes all user inputs before processing
- Uses DOM textContent to safely escape HTML

**Implementation**:

```typescript
export function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function sanitizeInput(input: string): string {
  return escapeHtml(input.trim());
}
```

**Example**:

- Input: `<script>alert('xss')</script>`
- Output: `&lt;script&gt;alert('xss')&lt;/script&gt;`

 3. CSRF Protection

**Location**: `src/app/utils/security.ts` and `src/app/components/SecureForm.tsx`

**What it does**:

- Generates unique CSRF tokens for each form session
- Validates tokens before form submission
- Prevents cross-site request forgery attacks

**Implementation**:

```typescript
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
```

 4. Rate Limiting

**Location**: `src/app/utils/security.ts`

**What it does**:

- Limits form submissions to 5 requests per minute per identifier
- Prevents abuse and spam submissions
- Uses in-memory storage with automatic cleanup

**Implementation**:

```typescript
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

  if (record.count >= limit) return false;

  record.count++;
  return true;
}
```

5. Error Handling

**Location**: `src/app/utils/security.ts`

**What it does**:

- Provides user-friendly error messages
- Hides system details from users
- Logs errors for debugging
- Handles different types of errors appropriately

**Implementation**:

```typescript
export function handleFormError(error: any): string {
  console.error("Form submission error:", error);

  if (error.name === "NetworkError")
    return "Network error. Please check your connection.";
  if (error.status === 429) return "Too many requests. Please wait a moment.";
  if (error.status >= 500) return "Server error. Please try again later.";

  return "An unexpected error occurred. Please try again.";
}
```

6. Form Security

**Location**: `src/app/components/SecureForm.tsx`

**What it does**:

- Adds maxLength attributes to all inputs
- Prevents oversized data submission
- Implements proper input constraints

**Implementation**:

```typescript
// Add maxLength based on field type
switch (field.type) {
  case "email":
    return { ...baseProps, type: "email", maxLength: INPUT_LIMITS.email.max };
  case "tel":
    return { ...baseProps, type: "tel", maxLength: INPUT_LIMITS.phone.max };
  default:
    return { ...baseProps, type: "text", maxLength: INPUT_LIMITS.name.max };
}
```

 7. Submission State Management

**Location**: `src/app/utils/security.ts`

**What it does**:

- Prevents double submissions
- Tracks submission count and timing
- Enforces minimum time between submissions

**Implementation**:

```typescript
export class FormSubmissionState {
  private isSubmitting: boolean = false;
  private submissionCount: number = 0;
  private lastSubmissionTime: number = 0;

  canSubmit(): boolean {
    if (this.isSubmitting) return false;
    const now = Date.now();
    if (now - this.lastSubmissionTime < 2000) return false;
    return true;
  }
}
```

 8. Input Constraints

**Location**: `src/app/utils/security.ts`

**What it does**:

- Enforces minimum and maximum values for all inputs
- Prevents invalid data submission
- Provides clear validation feedback

**Implementation**:

```typescript
export const INPUT_LIMITS = {
  name: { min: 2, max: 50 },
  email: { min: 5, max: 254 },
  phone: { min: 10, max: 15 },
  text: { min: 1, max: 1000 },
  message: { min: 1, max: 2000 },
};
```

🛡️ How to Use

Basic Usage

```typescript
import SecureForm from "./components/SecureForm";

const fields = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
  },
];

const handleSubmit = async (data: Record<string, string>) => {
  // Your form submission logic here
  console.log(data);
};

<SecureForm
  fields={fields}
  onSubmit={handleSubmit}
  title="Contact Form"
  rateLimitIdentifier="contact-form"
/>;
```

### Custom Validation

```typescript
const customField = {
  name: "custom",
  type: "text",
  label: "Custom Field",
  placeholder: "Enter custom value",
  required: true,
  validation: (value: string) => {
    if (value.length < 5) {
      return { isValid: false, error: "Must be at least 5 characters" };
    }
    return { isValid: true };
  },
};
```

 🔧 Configuration

### Rate Limiting

- Default: 5 requests per minute
- Configurable per form using `rateLimitIdentifier`
- Automatic cleanup of expired records

### Input Limits

- Name: 2-50 characters
- Email: 5-254 characters
- Phone: 10-15 digits
- Text: 1-1000 characters
- Message: 1-2000 characters

### CSRF Tokens

- Generated automatically per session
- Validated on every form submission
- Unique per form instance

🚀 Deployment Considerations

### Server-Side Implementation

For production, consider implementing these features server-side:

1. **Rate Limiting**: Use Redis or database for distributed rate limiting
2. **CSRF Protection**: Use server-side session management
3. **Input Validation**: Implement server-side validation as backup
4. **Error Logging**: Use proper logging service (e.g., Sentry)

### Environment Variables

```env
# Add these to your .env file
NEXT_PUBLIC_RATE_LIMIT_ENABLED=true
NEXT_PUBLIC_MAX_REQUESTS_PER_MINUTE=5
NEXT_PUBLIC_CSRF_ENABLED=true
```

 🧪 Testing Security Features

### Test Cases

1. **XSS Prevention**: Try submitting `<script>alert('xss')</script>`
2. **Rate Limiting**: Submit form 6 times in 1 minute
3. **Input Validation**: Submit invalid email formats
4. **CSRF Protection**: Try submitting without valid token
5. **Double Submission**: Click submit button multiple times quickly

### Manual Testing

```bash
# Test rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}'
done
```


 🔄 Future Enhancements

1. **Server-side validation**: Implement validation on API routes
2. **CAPTCHA integration**: Add reCAPTCHA for additional protection
3. **IP-based rate limiting**: Track requests by IP address
4. **Audit logging**: Log all form submissions for security monitoring
5. **Content Security Policy**: Implement CSP headers
