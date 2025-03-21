import { test } from '@playwright/test';
import { SalaryCalculatorPage } from '../POMs/salaryCalculator';
import { SalaryDataEnvironments } from '../environments/salaryDataEnvironments';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Calculating Net to Gross Salary', async ({ page }) => {
    const salaryCalculator = new SalaryCalculatorPage(page);
    const salaryDataEnvironments = new SalaryDataEnvironments(page);
    
    // given I am on the salary calculator page
    await salaryCalculator.goToSalaryCalculator();
    await salaryCalculator.assertSalaryCalculatorPageHasOpened();

    //when I enter all data necessary
    await salaryCalculator.inputNetSalaryAmount(salaryDataEnvironments.netSalary);
    await salaryCalculator.selectLocationInDropDownMenu(salaryDataEnvironments.specificLocation);
    await salaryCalculator.assertCorrectLocationIsShown();
    await salaryCalculator.inputNumberOfKids(salaryDataEnvironments.numberOfKids);
    await salaryCalculator.inputNumberOfDependents(salaryDataEnvironments.numberOfDependents);
    await salaryCalculator.selectLevelOfInvalidity();

    //then net to gross salary is calculated 
    await salaryCalculator.calculateNetToGrossSalary();
    await salaryCalculator.assertCorrectGrossSalaryIsShown();
});

test('Calculating Gross to Net Salary', async ({ page }) => {
    const salaryCalculator = new SalaryCalculatorPage(page);
    const salaryDataEnvironments = new SalaryDataEnvironments(page);

    // given I am on the salary calculator page
    await salaryCalculator.goToSalaryCalculator();
    await salaryCalculator.assertSalaryCalculatorPageHasOpened();

    //when I enter all neccessary data
    await salaryCalculator.inputGrossSalaryAmount(salaryDataEnvironments.grossSalary);
    await salaryCalculator.selectLocationInDropDownMenu(salaryDataEnvironments.specificLocation);
    await salaryCalculator.assertCorrectLocationIsShown();
    await salaryCalculator.inputNumberOfKids(salaryDataEnvironments.numberOfKids);
    await salaryCalculator.inputNumberOfDependents(salaryDataEnvironments.numberOfDependents);
    await salaryCalculator.selectLevelOfInvalidity();

    //then gross to net salary is calculated
    await salaryCalculator.calculateGrossToNetSalary();
    await salaryCalculator.assertCorrectNetSalaryIsShown();
});
