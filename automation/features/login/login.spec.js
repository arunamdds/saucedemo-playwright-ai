const {test, expect} = require('@playwright/test');
const LoginPage = require('./login.page');
const env = require('../../config/env');
//const users = require('../../testdata/users');

test.describe('Login Feature', () => {

    test('Valid login should navigate to inventory page', async ({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.navigate(env.baseUrl);
        await loginPage.login(env.credentials.standardUser.username, env.credentials.standardUser.password);

        await expect(page).toHaveURL(/inventory/);
    });

    test('Invalid login should show error message', async({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate(env.baseUrl);
        await loginPage.login(env.credentials.invalidUser.username, env.credentials.invalidUser.password);

        await expect(loginPage.errorMessage).toBeVisible();
    });
});