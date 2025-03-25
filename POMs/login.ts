
import { expect, Locator, Page } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly avatarIcon: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly usernameDisplayed: Locator;
    readonly userAvatarIcon: Locator;
    readonly logoutButton: Locator;
    readonly errorMessage: Locator;
    readonly emptyEmailError: Locator;
    readonly emptyPasswordError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.avatarIcon = page.locator('[data-test="right-user-indicator"]');
        this.emailField = page.locator('[data-test="email"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.continueButton = page.getByRole('button', { name: 'Nastavi' });
        this.userAvatarIcon = page.getByRole('img', { name: 'avatar-site' });
        this.logoutButton = page.locator('[data-test="right-sidebar-logout"]');
        this.usernameDisplayed = page.getByText('Katarina');
        this.errorMessage = page.getByText('Neispravni podaci');
        this.emptyEmailError = page.getByText('Obavezan unos');
        this.emptyPasswordError = page.getByText('Lozinka mora sadržavati minimalno 6 znakova');
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

    async enterWrongCredentials() {
        await this.avatarIcon.click();
        await this.emailField.fill(process.env.INVALID_EMAIL || '');
        await this.passwordField.fill(process.env.INVALID_EMAIL || '');
        await this.continueButton.click();
    }

    async assertWrongCredentialsErrorIsDisplayed() {
        await expect(this.errorMessage).toBeVisible();
    }

    async loginWithoutCredentials() {
        await this.avatarIcon.click();
        await this.continueButton.click();
    }

    async assertEmptyFieldErrorsShown() {
        await expect(this.emptyEmailError).toBeVisible();
        await expect(this.emptyPasswordError).toBeVisible();
    }

    async logoutUser() {
        await this.userAvatarIcon.click();
        await this.logoutButton.click();
    }

}

export default LoginPage;