# Security Policy

## Reporting a Vulnerability

If you discover a security issue, please report it responsibly.

**Please do NOT create a public GitHub issue for security vulnerabilities.**

To report a vulnerability, please [privately report it via the Security tab](https://github.com/bnidev/js-utils/security/advisories/new) on GitHub (see [their documentation](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) for guidance).

If that is impossible, feel free to contact the maintainer directly.

All security vulnerabilities will be verified and addressed as soon as possible.

## Security-Related Utilities

This library includes utilities for sanitizing user input:

- `sanitizeHtml` - Sanitizes HTML to prevent XSS attacks
- `sanitizeJson` - Safely parses JSON with error handling
- `sanitizeUrl` - Validates URLs against an allowlist

When using these utilities, always review the options and ensure they meet your security requirements.

## Dependencies

We keep dependencies up-to-date and monitor for vulnerabilities:

- Dependabot alerts are enabled
