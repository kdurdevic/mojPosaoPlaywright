import { expect, test } from '@playwright/test';
import { LoginPage } from '../POMs/login';
import { LoginEnvironments } from '../environments/loginEnvironments';

test.beforeEach(async({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.acceptCookies();
});

test('Successful login', async({ page }) => {
    const loginPage = new LoginPage(page);
    const loginEnvironments = new LoginEnvironments(page);
    
    await loginPage.successfulLogin(loginEnvironments.validEmail, loginEnvironments.validPassword);
    await loginPage.assertLoginIsSuccessful();
});

test('Wrong credentials entered', async({ page }) => {
    const loginPage = new LoginPage(page);
    const loginEnvironments = new LoginEnvironments(page);
    
    await loginPage.wrongCredentialsEntered(loginEnvironments.invalidEmail, loginEnvironments.invalidPassword);
    await loginPage.assertWrongCredentialsErrorIsDisplayed();
});

test('Empty fields error', async({ page }) => {
    const loginPage = new LoginPage(page);
        
    await loginPage.tryToLoginWithoutCredentials();
    await loginPage.emptyFieldErrorsShown();
});
