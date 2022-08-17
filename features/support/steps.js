const { Given, When, Then } = require("@cucumber/cucumber");
const {LoginPage} = require ("../pages/login");
const {ResetPasswordPage} = require ("../pages/resetPassword");

const loginpage = new LoginPage();
const resetPwd = new ResetPasswordPage();

Given("user goes to the login screen", { timeout: 60 * 1000 }, async function () {
    await loginpage.navigateToPage();
    await loginpage.loginAssertion();
});

When("user enter valid credentials", async function () {
    await loginpage.enterEmail('test@test.com');
    await loginpage.enterPassword('testing123');
    await loginpage.clickLoginBtn();
});

Then("user logs in to the website", async function () {
    await loginpage.loginAssertion();
});

When("user enter invalid credentials", async function () {
    await loginpage.enterEmail('test12@test12.com');
    await loginpage.enterPassword('testing123');
    await loginpage.clickLoginBtn();
});

Then("user sees error message", async function () {
    await loginpage.alertSnackMessage();
});

When("user enter invalid email format", async function () {
    await loginpage.enterEmail('tes');
    await loginpage.clickLoginBtn();
});

Then("user sees field error message", async function () {
    await loginpage.EmailFormatValidation();
});

When("clicks on the login with microsoft button", async function () {
    await loginpage.loginWithMicrosoft();
});

Then("user is navigated to the microsoft login page", async function () {
    await loginpage.assertMicrosoftLoginPage();
});

When("clicks on the login without adding anything in the fields", async function () {
    await loginpage.clickLoginBtn();
});

Then("user is shown empty field error", async function () {
    await loginpage.emptyFieldsError();
});

When("clicks on the reset password button", async function () {
    await loginpage.navigateToResetPassword();
});

Then("user is navigated to the reset password page", async function () {
    await loginpage.resetPageAssertion();
});

Given("user goes to the reset screen", { timeout: 60 * 1000 }, async function () {
    await resetPwd.navigateToPage();
    await resetPwd.resetPageAssertion();
});

When("user enters wrong email format", async function () {
    await resetPwd.enterEmail('test');
    await resetPwd.clickSendEmailBtn();
});

Then("user is shown field error for email validation", async function () {
    await resetPwd.EmailFormatValidation();
});

When("user clicks on the send email button", async function () {
    await resetPwd.clickSendEmailBtn();
});

Then("user is shown empty field error on email field", async function () {
    await resetPwd.emptyFieldError();
});

When("user enters email and click on send email", async function () {
    await resetPwd.enterEmail('test1@test.com');
    await resetPwd.clickSendEmailBtn();
});

Then("user is shown snack message that email is sent successfully", async function () {
    await resetPwd.alertSnackMessage();
});
