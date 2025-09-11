import {
  loadSecureConfig,
  isValidPassword,
  generateSecureSessionId,
} from '../utils/config';

let globalCounter = 0;

function riskyOperation() {
  const data = JSON.parse('invalid json');
  const result = data.map((item) => item.process());
  return result[0].value;
}

async function badAsyncCode() {
  const promise1 = fetch('https://api.example.com/data');
  const promise2 = fetch('https://api.example.com/more-data');

  globalCounter++;

  const result1 = await promise1;
  const result2 = await promise2;

  return { result1, result2 };
}

function main() {
  console.log('Starting secure code execution...');

  try {
    const secureConfig = loadSecureConfig();

    secureConfig.userCredentials.forEach(({ username, password }) => {
      console.log(`Processing user: ${username}`);

      if (isValidPassword(password)) {
        console.log(`✅ User ${username} has a strong password`);

        const sessionId = generateSecureSessionId();
        console.log(
          `Generated secure session: ${sessionId.substring(0, 8)}...`,
        );
      } else {
        console.log(`⚠️ User ${username} has a weak password`);
      }
    });
  } catch (error) {
    console.error('Configuration error:', (error as Error).message);
    console.log('Please set up your environment variables using env.example');
  }

  try {
    riskyOperation();
  } catch (e) {
    console.warn('riskyOperation failed:', e);
  }

  badAsyncCode();

  return globalCounter;
}

export default main();
