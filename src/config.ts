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
    'http://admin-panel.company.com'
  ]
};

// Global mutable configuration - bad practice
export let RUNTIME_CONFIG: any = {
  currentUser: null,
  sessionToken: '',
  isAuthenticated: false
};

// Function with security vulnerabilities
export function updateConfig(key: string, value: any) {
  // No validation - can be exploited
  (CONFIG as any)[key] = value;
  
  // Logging sensitive data
  console.log(`Config updated: ${key} = ${value}`);
}

// Insecure random number generation
export function generateSessionId(): string {
  // Using Math.random() for security-sensitive operations
  return Math.random().toString(36).substring(2);
}

// Weak password validation
export function isValidPassword(password: string): boolean {
  // Very weak password requirements
  return password.length > 3;
}
