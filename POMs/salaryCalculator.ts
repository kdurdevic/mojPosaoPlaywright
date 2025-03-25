import { expect, Locator, Page } from "@playwright/test";
//import { navigateTo } from "../utils/navigation";

export class SalaryCalculatorPage {
    readonly page: Page;
    readonly salaryCalculatorLink: Locator;
    readonly amountField: Locator;
    readonly locationDropDown: Locator;
    readonly wantedLocation: Locator;
    readonly locationShown: Locator;
    readonly numberOfKidsField: Locator;
    readonly numberOfDependents: Locator;
    readonly levelOfInvalidityRadioButton: Locator;
    readonly netToGrossButton: Locator;
    readonly grossToNetButton: Locator;
    readonly calculatedNetSalary: Locator;
    readonly calculatedGrossSalary: Locator;

    constructor(page: Page) {
        this.page = page;
        this.salaryCalculatorLink = page.locator('[data-test="HEADER_WIDGETS.MONEY_TOOLS"]');
        this.amountField = page.locator('.mp-combobox input[type="number"]').nth(0);
        this.locationDropDown = page.locator('input.selectable__input').nth(2);
        this.wantedLocation = page.locator('li.options__item--pointed[data-test="Osijek (20.00% / 30.00%)"]');
        this.locationShown = page.locator('.mp-combobox .selectable__text', { hasText: 'Osijek (20.00% / 30.00%)' });
        this.numberOfKidsField = page.locator('.mp-combobox input[type="number"]').nth(1);
        this.numberOfDependents = page.locator('.mp-combobox input[type="number"]').nth(2);
        this.levelOfInvalidityRadioButton = page.getByText('Djelomična invalidnost');
        this.netToGrossButton = page.getByRole('button', { name: 'Netto > Brutto' });
        this.grossToNetButton = page.getByRole('button', { name: 'Brutto > Netto' });
        this.calculatedNetSalary = page.getByRole('heading', { name: '1.500,00 €' });
        this.calculatedGrossSalary = page.getByRole('heading', { name: '1.875,00 €' });
    }

    async goToSalaryCalculator() {
        await this.salaryCalculatorLink.click();
    }

    async assertSalaryCalculatorPageHasOpened() {
        await expect(this.page).toHaveURL('kalkulator/izracun-place');
    }

    async inputNetSalaryAmount(netSalary: string) {
        await this.amountField.fill(netSalary);
    }

    async inputGrossSalaryAmount(grossSalary: string) {
        await this.amountField.fill(grossSalary);
    }

    async selectLocationInDropDownMenu(specificLocation: string) { 
        await this.locationDropDown.fill(specificLocation);
        await this.wantedLocation.click();
    }

    async assertCorrectLocationIsShown() {
        await expect(this.locationShown).toBeVisible();
    }

    async inputNumberOfKids(numberOfKids: string) {
        await this.numberOfKidsField.fill(numberOfKids);
    }

    async inputNumberOfDependents(numberOfDependents: string) {
        await this.numberOfDependents.fill(numberOfDependents);
    }

    async selectLevelOfInvalidity() {
        await this.levelOfInvalidityRadioButton.click();
    }

    async calculateNetToGrossSalary() {
        await this.netToGrossButton.click();
    }

    async calculateGrossToNetSalary() {
        await this.grossToNetButton.click();
    }

    async assertCorrectGrossSalaryIsShown() {
        await expect(this.calculatedGrossSalary).toContainText('1.875,00 €');
    }

    async assertCorrectNetSalaryIsShown() {
        await expect(this.calculatedNetSalary).toContainText('1.500,00 €');
    }

}