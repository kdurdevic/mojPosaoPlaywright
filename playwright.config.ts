import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();


const storageStatePath = './auth/cookies.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: require.resolve('./globalSetup.ts'),
  use: {
    baseURL: 'https://mojposao.hr/',
    storageState: fs.existsSync(storageStatePath) ? storageStatePath : undefined,
    headless: true,
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1920, height: 1080,
        },
      },
    }

  ],

});

