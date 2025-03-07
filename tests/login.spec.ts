import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login';

 test.use({ storageState: 'auth/cookies.json' });

test.beforeEach(async({ page }) => {
    await page.goto('/');
});

test('Successful login', async({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.assertLoginIsSuccessful(); 
});

test('Wrong credentials entered', async({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logoutUser();
    await loginPage.enterWrongCredentials();
    await loginPage.assertWrongCredentialsErrorIsDisplayed();
});

test('Empty fields error', async({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logoutUser();
    await loginPage.loginWithoutCredentials();
    await loginPage.assertEmptyFieldErrorsShown();
});
