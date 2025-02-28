import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://mojposao.hr/');

    const acceptCookiesButton = page.getByRole('button', { name: 'Prihvati' });
    if (await acceptCookiesButton.isVisible()) {
        await acceptCookiesButton.click();
    }

    const storagePath = path.resolve(__dirname, 'auth');
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true });
    }

    const storageFilePath = path.join(storagePath, 'cookies.json');
    await context.storageState({ path: storageFilePath });

    await browser.close();
}

export default globalSetup;