import { expect, FrameLocator, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page
    readonly acceptCookiesButton: Locator;
    readonly avatarIcon: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly nastaviButton: Locator;
    readonly usernameDisplayed: Locator;
    readonly errorMessage: Locator;
    readonly emptyEmailError: Locator;
    readonly emptyPasswordError: Locator;

    readonly iframe: FrameLocator;
    readonly closeButtonInIframe: Locator;

constructor(page: Page){
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', { name: 'Prihvati' });
    this.avatarIcon = page.locator('img[alt="avatar-site"]');
    this.emailField = page.locator('[data-test="email"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.nastaviButton = page.getByRole('button', { name: 'Nastavi' });
    this.usernameDisplayed = page.getByText('Katarina Đurđević');
    this.errorMessage = page.getByText('Neispravni podaci');
    this.emptyEmailError = page.getByText('Obavezan unos');
    this.emptyPasswordError = page.getByText('Lozinka mora sadržavati minimalno 6 znakova');

    this.iframe = page.frameLocator('iframe[title="Dijaloški okvir za prijavu putem Googlea"]');
    this.closeButtonInIframe = this.iframe.locator('[aria-label="Zatvori"]');

}

async goto(url: string) {
    await this.page.goto(url);
}

async closeGoogleModalIfVisible(){
    
    try {
        await this.closeButtonInIframe.waitFor({ state: 'visible', timeout: 5000 });
        console.log('Close button is visible, attempting to click.');

        await this.closeButtonInIframe.click({ force: true });
        console.log('Modal closed');
    } catch (error) {
        console.log('Close button is not visible or modal didn’t appear');
    }

}

async acceptCookies(){
    await this.acceptCookiesButton.click();
}

async successfulLogin(validEmail: string, validPassword: string) {
    await this.avatarIcon.click();
    await this.emailField.fill(validEmail);
    await this.passwordField.fill(validPassword);
    await this.nastaviButton.click();
}

async assertLoginIsSuccessful() {
    await this.avatarIcon.click();
    await expect(this.usernameDisplayed).toBeVisible();
}

async wrongCredentialsEntered(invalidEmail: string, invalidPassword: string){
    await this.avatarIcon.click();
    await this.emailField.fill(invalidEmail);
    await this.passwordField.fill(invalidPassword);
    await this.nastaviButton.click();
}

async assertWrongCredentialsErrorIsDisplayed(){
    await expect(this.errorMessage).toBeVisible();
}

async tryToLoginWithoutCredentials(){
    await this.avatarIcon.click();
    await this.nastaviButton.click();
}

async emptyFieldErrorsShown(){
    await expect(this.emptyEmailError).toBeVisible();
    await expect(this.emptyPasswordError).toBeVisible();
}

}
