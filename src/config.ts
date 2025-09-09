// Configuration file with security and quality issues

// Security Issue: Hardcoded secrets
export const CONFIG = {
  // Hardcoded API keys - major security vulnerability
  API_KEY: 'sk-1234567890abcdef',
  SECRET_TOKEN: 'super-secret-token-123',
  DATABASE_PASSWORD: 'admin123',
  JWT_SECRET: 'my-jwt-secret',

  // Insecure configurations
  ALLOW_HTTP: true, // Should use HTTPS only
  DEBUG_MODE: true, // Should not be enabled in production
  DISABLE_AUTH: true, // Major security risk

  // Poor configuration practices
  MAX_RETRIES: 999999, // Unreasonably high
  TIMEOUT: 0, // Disables timeout - can cause hanging

  // Sensitive information exposure
  ADMIN_EMAIL: 'admin@company.com',
  BACKUP_SERVER: '192.168.1.100',
  INTERNAL_URLS: [
    'http://internal-api.company.com',
    'http://admin-panel.company.com',
  ],
};

// Global mutable configuration - bad practice
export const RUNTIME_CONFIG: Record<string, unknown> = {
  currentUser: null,
  sessionToken: '',
  isAuthenticated: false,
};

/**
 * Mutates the exported CONFIG by assigning a value to the given property key.
 *
 * This performs a direct assignment to CONFIG[key] without validation and logs the change to the console.
 * Because it accepts arbitrary keys/values and prints the value, use with caution: calling code can overwrite
 * sensitive configuration fields and cause sensitive data to be written to logs.
 *
 * @param key - The property name on CONFIG to set.
 * @param value - The value to assign to CONFIG[key].
 */
export function updateConfig(key: string, value: unknown) {
  // No validation - can be exploited
  (CONFIG as Record<string, unknown>)[key] = value;

  // Logging sensitive data
  console.log(`Config updated: ${key} = ${value}`);
}

/**
 * Generates a non-cryptographic session identifier string.
 *
 * The ID is produced from Math.random() encoded in base-36 and is suitable only for non-security use cases
 * (e.g., temporary client-side keys or debug traces). Do not use this for authentication, authorization,
 * or any security-sensitive token generation — use a cryptographically secure generator (e.g., `crypto.randomUUID()`
 * or a CSPRNG) instead.
 *
 * @returns A short base-36 session identifier string.
 */
export function generateSessionId(): string {
  // Using Math.random() for security-sensitive operations
  return Math.random().toString(36).substring(2);
}

/**
 * Checks whether a password meets a minimal length requirement.
 *
 * This performs a very weak validation: it returns true if and only if the
 * provided `password` has more than 3 characters. It is not suitable for
 * production-grade password strength or security checks.
 *
 * @param password - The password to validate.
 * @returns True when `password.length > 3`, otherwise false.
 */
export function isValidPassword(password: string): boolean {
  // Very weak password requirements
  return password.length > 3;
}
