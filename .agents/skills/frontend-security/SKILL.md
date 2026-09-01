---
name: frontend-security
description: >-
  Use this skill to implement security best practices, guardrails, authentication protection,
  input sanitization, and vulnerability hardening for the Tasya Portfolio frontend.
---

# Frontend Security & Hardening Skill

This skill provides the security requirements and hardening standards that must be implemented across the Tasya Portfolio frontend application.

---

## 1. Authentication & Token Security

### A. JWT Token Management
- **Token Storage**: Store JWT tokens in secure browser storage (`sessionStorage` or secure cookies) rather than insecure permanent globals.
- **Auto-Expiry Handling**: Intercept `401 Unauthorized` responses globally. When detected, immediately purge the stored token, clear cached admin state, and redirect to `/admin/login` with an alert.
- **Never Leak Tokens**: Do not log tokens in console output, do not pass tokens in URL query strings, and ensure tokens are omitted from external analytics or third-party tracking.

### B. Admin Route Protection
Implement Next.js Middleware (`middleware.ts`) to intercept all incoming requests to `/admin/*` (except `/admin/login`):

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 2. Input Validation & XSS Prevention

### A. Strict Schema Validation with Zod
Ensure all form inputs (especially `/api/inquiries` and `/api/projects`) are validated on the client side prior to API dispatch:

```typescript
import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address'),
  whatsapp: z.string().trim().regex(/^(\+62|62|0)[0-9]{8,15}$/, 'Invalid phone number format').optional().or(z.literal('')),
  company: z.string().trim().max(100).optional().or(z.literal('')),
  projectType: z.string().min(1, 'Please select a project type'),
  budgetRange: z.string().min(1, 'Please select an estimated budget'),
  description: z.string().trim().min(10, 'Please describe your project in at least 10 characters').max(2000),
});
```

### B. XSS Prevention
- Avoid `dangerouslySetInnerHTML`. Always render user/CMS content using native React text interpolation.
- If rendering formatted HTML is strictly required in the future, sanitize using `dompurify` / `isomorphic-dompurify`.
- Ensure all external links (Live Demo, GitHub, Socials) include:
  ```html
  <a href={url} target="_blank" rel="noopener noreferrer">
  ```

---

## 3. Media Upload Hardening

Before submitting files to `POST /api/media/upload`, enforce strict client-side checks:

1. **File Type Whitelist**:
   Only accept standard image formats: `image/jpeg`, `image/png`, `image/webp`. Reject executable files, SVG (potential XSS vector), or unknown binaries.
2. **File Size Limit**:
   Reject files exceeding 5MB:
   ```typescript
   export function validateUploadFile(file: File): { valid: boolean; error?: string } {
     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
     const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

     if (!allowedTypes.includes(file.type)) {
       return { valid: false, error: 'Only JPG, PNG, and WebP images are allowed.' };
     }
     if (file.size > maxSizeInBytes) {
       return { valid: false, error: 'File size must not exceed 5MB.' };
     }
     return { valid: true };
   }
   ```

---

## 4. Contact Form Abuse & Spam Mitigation

To protect `/api/inquiries` from automated bots and spam:
- **Honeypot Field**: Add an invisible input field (`website_url` or `honeypot`) hidden with CSS (`display: none`). If filled upon submission, silently reject or abort the submission.
- **Client Debounce**: Disable the submit button immediately upon click and display a loading spinner to prevent rapid duplicate clicks.
- **Submission Throttling**: Store submission timestamp in `localStorage` to prevent flooding (> 3 submissions in 1 minute).

---

## 5. HTTP Security Headers in `next.config.js`

Configure security headers to prevent clickjacking, MIME-sniffing, and code injection:

```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

---

## 6. Security Audit Verification Checklist

- [ ] Route middleware redirects unauthenticated users away from `/admin/*`.
- [ ] Stored tokens are cleared on logout and on 401 response.
- [ ] No tokens are printed in browser console or included in URLs.
- [ ] External links have `rel="noopener noreferrer"`.
- [ ] Media uploader rejects files > 5MB and non-whitelisted formats.
- [ ] Contact form includes honeypot and button state throttling.
- [ ] Security headers are active in production build.
