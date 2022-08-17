  import { test, expect, chromium } from '@playwright/test';
  import LoginPage from '../pages/login'
  import ResetPasswordPage from '../pages/resetPassword';

  
const email = 'test00@test.com';
const password = 'testing123';
  test.describe('Test Login', (page) => {
    test.beforeEach(async ({}) => {
      const browser = await chromium.launch({ });
    });
    test('should verify if user is able to login to the site', async ({ page, baseURL }) => {    
      const login = new LoginPage(page);
      await login.navigateToPage(baseURL);
      await login.loginAssertion();
      await login.enterEmail(email);
      await login.enterPassword(password);
      await login.clickLoginBtn();

      // Here we will assume that the user has logged in successfully and can apply assertions of home page
    });

    test('should verify that user is unable to login through wrong credentials', async ({ page, baseURL }) => {
      const login = new LoginPage(page);
      await login.navigateToPage(baseURL);
      await login.loginAssertion();
      await login.enterEmail(email);
      await login.enterPassword(password);
      await login.clickLoginBtn();
      await login.alertSnackMessage();  
    });
    test('should verify that email field has proper validations', async ({ page, baseURL }) => {
      const login = new LoginPage(page);
      await login.navigateToPage(baseURL);
      await login.loginAssertion();
      await login.enterEmail('test');
      await login.clickLoginBtn();
      await login.EmailFormatValidation();
    });

    test('should be able to login through microsoft credentials/account', async ({ page, baseURL }) => {
      const login = new LoginPage(page);
      await login.navigateToPage(baseURL);
      await login.loginAssertion();
      await login.loginWithMicrosoft();
      // since we don't have anything on the next page and it is throwing error so we can't write further test for it until it is resolved
    });

    test('should show errors for empty fields', async ({ page, baseURL }) => {
      const login = new LoginPage(page);
      await login.navigateToPage(baseURL);
      await login.loginAssertion();
      await login.clickLoginBtn();
      await login.emptyFieldsError();
      await login.enterEmail(email);
      await login.enterPassword(password);
      await login.hideFieldError();
    });
  });

  test.describe('Test Reset Password', () => {
    test.beforeEach(async ({ }) => {
      const browser = await chromium.launch({ });
      const context = await browser.newContext();
      // Open new page
    });

    test('should take the user to the reset password screen by clicking the button from login page', async ({ page,baseURL }) => {
      const login = new LoginPage(page);
      const resetPwd = new ResetPasswordPage(page);
      await login.navigateToPage(baseURL);
      await login.navigateToResetPassword();
      await resetPwd.resetPageAssertion();
    });

    test('should take the user to the reset password screen directly through the URL', async ({ page,baseURL}) => {
      const resetPwd = new ResetPasswordPage(page);
      await resetPwd.navigateToPage(baseURL);
      await resetPwd.resetPageAssertion();
    });

    test('should verify field errors on email field', async ({ page, baseURL }) => {
      const resetPwd = new ResetPasswordPage(page);
      await resetPwd.navigateToPage(baseURL);
      await resetPwd.resetPageAssertion();
      await resetPwd.clickSendEmailBtn();
      await resetPwd.emptyFieldError();
      // also verifies email validation
      await resetPwd.enterEmail('test');
      await resetPwd.clickSendEmailBtn();
      await resetPwd.EmailFormatValidation();
    });

    test('should send reset link to the provided email/valid email', async ({ page, baseURL }) => {
      const resetPwd = new ResetPasswordPage(page);
      await resetPwd.navigateToPage(baseURL);
      await resetPwd.resetPageAssertion();
      await resetPwd.enterEmail(email);
      await resetPwd.clickSendEmailBtn();
      await resetPwd.alertSnackMessage();
    });

    test('should clear the field upon going back', async ({ page,baseURL }) => {
      const resetPwd = new ResetPasswordPage(page);
      const login = new LoginPage(page);
      await resetPwd.navigateToPage(baseURL);
      await resetPwd.resetPageAssertion();
      await resetPwd.enterEmail(email);
      await resetPwd.goBackToLoginPage();
      await login.loginAssertion();
      await login.navigateToResetPassword();
      await resetPwd.clickSendEmailBtn();
      await resetPwd.emptyFieldError();
    });
  });
