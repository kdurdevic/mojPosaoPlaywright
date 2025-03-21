import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.assertLoginIsSuccessful();
});

test('Wrong credentials entered', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // given I am not logged in
    await loginPage.logoutUser();

    //when I enter wrong credentials
    await loginPage.enterWrongCredentials();

    // then error message is shown 
    await loginPage.assertWrongCredentialsErrorIsDisplayed();
});

test('Empty fields error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // given I am not logged in 
    await loginPage.logoutUser();

    //when I try to login without credentials
    await loginPage.loginWithoutCredentials();

    // them empty field errors are shown
    await loginPage.assertEmptyFieldErrorsShown();
});
