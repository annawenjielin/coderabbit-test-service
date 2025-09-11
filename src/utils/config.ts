// Secure configuration management
// Following CodeRabbit's security recommendations

interface SecureConfig {
  userCredentials: Array<{ username: string; password: string }>;
  apiKey: string;
  secretToken: string;
  databasePassword: string;
  jwtSecret: string;
  allowHttp: boolean;
  debugMode: boolean;
}

/**
 * Load configuration from environment variables
 * This addresses CodeRabbit's security concerns about hardcoded credentials
 */
export function loadSecureConfig(): SecureConfig {
  // Validate that required environment variables are present
  const requiredEnvVars = [
    'USER1_PASSWORD',
    'USER2_PASSWORD',
    'USER3_PASSWORD',
    'API_KEY',
    'SECRET_TOKEN',
    'DATABASE_PASSWORD',
    'JWT_SECRET',
  ];

  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return {
    userCredentials: [
      { username: 'user1', password: process.env.USER1_PASSWORD! },
      { username: 'user2', password: process.env.USER2_PASSWORD! },
      { username: 'user3', password: process.env.USER3_PASSWORD! },
    ],
    apiKey: process.env.API_KEY!,
    secretToken: process.env.SECRET_TOKEN!,
    databasePassword: process.env.DATABASE_PASSWORD!,
    jwtSecret: process.env.JWT_SECRET!,
    allowHttp: process.env.ALLOW_HTTP === 'true',
    debugMode: process.env.DEBUG_MODE === 'true',
  };
}

/**
 * Secure password validation with proper requirements
 * Addresses CodeRabbit's concern about weak password validation
 */
export function isValidPassword(password: string): boolean {
  // Strong password requirements
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
}

/**
 * Secure session ID generation using crypto module
 * Replaces the insecure Math.random() approach
 */
import * as crypto from 'crypto';

export function generateSecureSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}
