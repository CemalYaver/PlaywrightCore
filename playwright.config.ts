import { defineConfig } from '@playwright/test';
import { BASE_URL } from './config';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',
  timeout: 60_000, // max duration for a full test

  reporter: [
    ['list'],
    ['html', { open: isCI ? 'never' : 'on-failure' }],  // Playwright report
    ['allure-playwright']   // Allure report
  ],

  // max number of parallel workers; limit in CI for stability
  workers: isCI ? 2 : undefined,  

  // retry failed tests; more retries in CI to handle flakiness
  retries: isCI ? 2 : 1,          

  use: {
    baseURL: BASE_URL,             // base URL from config/env
    actionTimeout: 10_000,         // max time for single actions like click/fill/goto
    navigationTimeout: 15_000,     // max wait for page navigation
    headless: isCI,                // run visible locally, headless in CI
    viewport: null,                // use default browser window size
    ignoreHTTPSErrors: true,       // ignore SSL issues
    screenshot: 'only-on-failure', // capture screenshots only on failure
    trace: 'on-first-retry',       // capture trace for first retry
    video: 'retain-on-failure',    // save video if test fails

    launchOptions: {
      args: ['--start-maximized'], // start browser maximized
    },
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } }
  ],
});