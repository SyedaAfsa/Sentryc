const { expect } = require ("@playwright/test");
const playwright = require('playwright');

class LoginPage{
    async navigateToPage(){
        const browser = await playwright.chromium.launch({
            headless: false,
        });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto('https://d1g5e94sevp1ds.cloudfront.net/login');
    }
    async loginAssertion(){
        await expect(this.page).toHaveTitle('Login')
        await expect(this.page.locator('text=Login')).toHaveText('Login');
    }
    async enterEmail(email){
        await this.page.locator('[name="email"]').fill(email);
    }
    async enterPassword(password){
        await this.page.locator('[name="password"]').fill(password);
    }
    async clickLoginBtn(){
        await this.page.locator('button:has-text("Log in")').click();
    }
    async alertSnackMessage(){
        await expect(this.page.locator('div[role="alert"]')).toHaveText('Wrong email or password.');
    }
    async EmailFormatValidation(){
        await expect(this.page.locator('//*[@id="root"]/main/div/div/div[1]/div[2]/form/div[1]/h5')).toHaveText('Email is incorrect. Please enter a valid email address.');
    }
    async loginWithMicrosoft(){
      await this.page.locator('button:has-text("Microsoft Account")').click();
      await expect(this.page.locator('text=Sentryc')).toHaveText('Sentryc');
    }
    async emptyFieldsError(){
      await expect(this.page.locator('//*[@id="root"]/main/div/div/div[1]/div[2]/form/div[1]/h5')).toHaveText('This field is required.');
      await expect(this.page.locator('//*[@id="root"]/main/div/div/div[1]/div[2]/form/div[2]/h5')).toHaveText('This field is required.');
    }
    async hideFieldError(){
      await expect(this.page.locator('//*[@id="root"]/main/div/div/div[1]/div[1]/form/div[2]/h5')).toBeHidden();
      await expect(this.page.locator('//*[@id="root"]/main/div/div/div[1]/div[2]/form/div[2]/h5')).toBeHidden();
    }
    async navigateToResetPassword(){
        await this.page.locator('button:has-text("Forgot your Password?")').click();
    }
    async assertMicrosoftLoginPage(){
        await expect(this.page).toHaveTitle('Sentryc');
    }
    async resetPageAssertion(){
        await expect(this.page).toHaveTitle('Reset password');
        await expect(this.page.locator('text=Reset password')).toHaveText('Reset password');
        await expect(this.page.locator('button:has-text("Send Email")')).toHaveText('Send Email');

    }
}
module.exports = { LoginPage };
