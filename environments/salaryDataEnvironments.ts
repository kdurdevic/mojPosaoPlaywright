import { Page } from "@playwright/test";

export class SalaryDataEnvironments {
    page: Page;
    netSalary: string;
    grossSalary: string;
    osijekOption: string;
    numberOfKids: string;
    numberOfDependents: string;

    constructor(page: Page) {
        this.page = page;
        this.osijekOption = 'Osijek';
        this.netSalary = '1500';
        this.grossSalary = '1875';
        this.numberOfKids = '3';
        this.numberOfDependents = '1';
    }
}