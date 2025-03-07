import { test } from '@playwright/test';
import { SalaryCalculatorPage } from '../POMs/salaryCalculator';
import { SalaryDataEnvironments } from '../environments/salaryDataEnvironments';

test.use({ storageState: 'auth/cookies.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Calculating Net to Gross Salary', async ({ page }) => {
    const salaryCalculator = new SalaryCalculatorPage(page);
    const salaryDataEnvironments = new SalaryDataEnvironments(page);
    
    await salaryCalculator.goToSalaryCalculator();
    await salaryCalculator.assertSalaryCalculatorPageHasOpened();
    await salaryCalculator.inputNetSalaryAmount(salaryDataEnvironments.netSalary);
    await salaryCalculator.selectLocationInDropDownMenu(salaryDataEnvironments.osijekOption);
    await salaryCalculator.assertCorrectLocationIsShown();
    await salaryCalculator.inputNumberOfKids(salaryDataEnvironments.numberOfKids);
    await salaryCalculator.inputNumberOfDependents(salaryDataEnvironments.numberOfDependents);
    await salaryCalculator.selectLevelOfInvalidity();
    await salaryCalculator.calculateNetToGrossSalary();
    await salaryCalculator.assertCorrectGrossSalaryIsShown();
});

test('Calculating Gross to Net Salary', async ({ page }) => {
    const salaryCalculator = new SalaryCalculatorPage(page);
    const salaryDataEnvironments = new SalaryDataEnvironments(page);

    await salaryCalculator.goToSalaryCalculator();
    await salaryCalculator.assertSalaryCalculatorPageHasOpened();
    await salaryCalculator.inputGrossSalaryAmount(salaryDataEnvironments.grossSalary);
    await salaryCalculator.selectLocationInDropDownMenu(salaryDataEnvironments.osijekOption);
    await salaryCalculator.assertCorrectLocationIsShown();
    await salaryCalculator.inputNumberOfKids(salaryDataEnvironments.numberOfKids);
    await salaryCalculator.inputNumberOfDependents(salaryDataEnvironments.numberOfDependents);
    await salaryCalculator.selectLevelOfInvalidity();
    await salaryCalculator.calculateGrossToNetSalary();
    await salaryCalculator.assertCorrectNetSalaryIsShown();
});
