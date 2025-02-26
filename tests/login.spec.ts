import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login';
import { LoginEnvironments } from '../environments/loginEnvironments';

test.beforeEach(async({ page }) => {
    await page.goto('/');
});


test('Successful login', async({ page }) => {
    const loginPage = new LoginPage(page);
    const loginEnvironments = new LoginEnvironments(page);
    
    await loginPage.loginWithValidCredentials(loginEnvironments.validEmail, loginEnvironments.validPassword);
    await loginPage.assertLoginIsSuccessful(); 
});

test('Wrong credentials entered', async({ page }) => {
    const loginPage = new LoginPage(page);
    const loginEnvironments = new LoginEnvironments(page);
    
    await loginPage.enterWrongCredentials(loginEnvironments.invalidEmail, loginEnvironments.invalidPassword);
    await loginPage.assertWrongCredentialsErrorIsDisplayed();
});

test('Empty fields error', async({ page }) => {
    const loginPage = new LoginPage(page);
        
    await loginPage.loginWithoutCredentials();
    await loginPage.assertEmptyFieldErrorsShown();
});
