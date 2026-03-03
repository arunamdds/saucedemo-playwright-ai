const BasePage = require('../../pages/BasePage');
const loginLocators = require('../../features/login/login.locators');
const env = require('../../config/env');

class LoginPage extends BasePage{
    constructor(page){
        super(page);
        this.usernameInput=page.locator(loginLocators.usernameInput);
        this.passwordInput=page.locator(loginLocators.passwordInput);
        this.loginButton=page.locator(loginLocators.loginButton);
        this.errorMessage=page.locator(loginLocators.errorMessage);
    }
    async navigate(){
        await super.navigate(env.baseUrl);
    }
    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;