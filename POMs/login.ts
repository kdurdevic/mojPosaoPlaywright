import { expect, Locator, Page } from "@playwright/test";
import { navigateTo } from "../utils/navigation";

export class LoginPage {
    readonly page: Page
    readonly avatarIcon: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly usernameDisplayed: Locator; 
    readonly errorMessage: Locator;
    readonly emptyEmailError: Locator;
    readonly emptyPasswordError: Locator;

constructor(page: Page){
    this.page = page;
    this.avatarIcon = page.locator('img[alt="avatar-site"]');
    this.emailField = page.locator('[data-test="email"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.continueButton = page.getByRole('button', { name: 'Nastavi' });
    this.usernameDisplayed = page.getByText('Katarina');
    this.errorMessage = page.getByText('Neispravni podaci');
    this.emptyEmailError = page.getByText('Obavezan unos');
    this.emptyPasswordError = page.getByText('Lozinka mora sadržavati minimalno 6 znakova');
}

async goto(url: string) {
    await navigateTo(this.page, url);
}

async loginWithValidCredentials(validEmail: string, validPassword: string) {
    await this.avatarIcon.waitFor({ state: 'visible' });
    await this.avatarIcon.click();
    await this.emailField.fill(validEmail);
    await this.passwordField.fill(validPassword);
    await this.continueButton.click();
}

async assertLoginIsSuccessful() {
    await expect(this.usernameDisplayed).toBeVisible();
}

async enterWrongCredentials(invalidEmail: string, invalidPassword: string){ 
    await this.avatarIcon.click();
    await this.emailField.fill(invalidEmail);
    await this.passwordField.fill(invalidPassword);
    await this.continueButton.click();
}

async assertWrongCredentialsErrorIsDisplayed(){
    await expect(this.errorMessage).toBeVisible();
}

async loginWithoutCredentials(){  
    await this.avatarIcon.click();
    await this.continueButton.click();
}

async assertEmptyFieldErrorsShown(){ 
    await expect(this.emptyEmailError).toBeVisible();
    await expect(this.emptyPasswordError).toBeVisible();
}

}
