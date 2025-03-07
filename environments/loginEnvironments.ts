import { Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class LoginEnvironments {
    page: Page;
    validEmail: string;
    validPassword: string;
    invalidEmail: string;
    invalidPassword: string;

    constructor(page: Page) {
        this.page = page;
        this.validEmail = process.env.VALID_EMAIL || '';
        this.validPassword = process.env.VALID_PASSWORD || '';
        this.invalidEmail = process.env.INVALID_EMAIL || '';
        this.invalidPassword = process.env.INVALID_PASSWORD || '';
    }
}