import { expect } from "@playwright/test";

export default class ResetPasswordPage{

    constructor(page){
        this.page = page;
    }
    async navigateToPage(baseURL){
        await this.page.goto(`${baseURL}reset`);
    }
    async resetPageAssertion(){
        await expect(this.page).toHaveTitle('Reset password');
        await expect(this.page.locator('text=Reset password')).toHaveText('Reset password');
        await expect(this.page.locator('button:has-text("Send Email")')).toHaveText('Send Email');

    }
    async enterEmail(email){
        await this.page.locator('[name="email"]').fill(email);
    }
    async clickSendEmailBtn(){
        await this.page.locator('button:has-text("Send Email")').click();
    }
    async alertSnackMessage(){
        await expect(this.page.locator('div[role="alert"]')).toHaveText('We\'ve just sent you an email to reset your password.');
    }
    async EmailFormatValidation(){
        await expect(this.page.locator('h5')).toHaveText('Email is incorrect. Please enter a valid email address.');
    }
    async goBackToLoginPage(){
        await this.page.locator('button:has-text("Back to Login")').click();
    }
    async emptyFieldError(){
        await expect(this.page.locator('text=This field is required.')).toHaveText('This field is required.');
    }
}