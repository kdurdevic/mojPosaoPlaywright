import { Page } from "@playwright/test";

export class LoginEnvironments {
    page: Page;
    baseUrl: string;
    validEmail: string;
    validPassword: string;
    invalidEmail: string;
    invalidPassword: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://mojposao.hr/';
        this.validEmail = 'djuxdelux58@gmail.com';
        this.validPassword = 'Test12345!';
        this.invalidEmail = "test@test.hr";
        this.invalidPassword = "Test123";
    }
}