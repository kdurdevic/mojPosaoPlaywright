import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://mojposao.hr/');

    const acceptCookiesButton = page.locator('text=Prihvati');

    await acceptCookiesButton.click();
    await page.waitForLoadState('networkidle');

    const username = process.env.VALID_EMAIL || '';
    const password = process.env.VALID_PASSWORD || '';

    const avatarIcon = page.locator('img[alt="avatar-site"]');
    const usernameField = page.locator('[data-test="email"]');
    const passwordField = page.locator('[data-test="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await avatarIcon.click();
    await usernameField.fill(username);
    await passwordField.fill(password);
    await loginButton.click();

    await page.waitForSelector('img[alt="avatar-site"]');

    const storagePath = path.resolve(__dirname, 'auth');
    try {
        await fs.access(storagePath);
    } catch {
        await fs.mkdir(storagePath, { recursive: true });
    }

    const storageFilePath = path.join(storagePath, 'cookies.json');
    await context.storageState({ path: storageFilePath });

}

export default globalSetup;
