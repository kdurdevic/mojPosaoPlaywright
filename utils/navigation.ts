export async function navigateTo(page: any, url: string) {
    await page.goto(url);
}