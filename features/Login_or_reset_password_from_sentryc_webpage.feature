Feature: Login or reset password from sentryc webpage

    Scenario: user is able to login
        Given user goes to the login screen
        When user enter valid credentials
        Then user logs in to the website

    Scenario: user is able to not login using wrong credentials
        Given user goes to the login screen
        When user enter invalid credentials
        Then user sees error message

    Scenario: user is able to get field error for proper email validation
        Given user goes to the login screen
        When user enter invalid email format
        Then user sees field error message

    Scenario: user is able to login through microsoft account
        Given user goes to the login screen
        When clicks on the login with microsoft button
        Then user is navigated to the microsoft login page

    Scenario: user is able view empty field error
        Given user goes to the login screen
        When clicks on the login without adding anything in the fields
        Then user is shown empty field error

    Scenario: user is able to navigate to reset password from login screen
        Given user goes to the login screen
        When clicks on the reset password button
        Then user is navigated to the reset password page
    
    Scenario: user is able to view field error on email field upon entering wrong email format
        Given user goes to the reset screen
        When user enters wrong email format
        Then user is shown field error for email validation

    Scenario: user is able to view empty field error on clicking without entering anything in the field
        Given user goes to the reset screen
        When user clicks on the send email button
        Then user is shown empty field error on email field

    Scenario: user is able to send the reset link to the given email address
        Given user goes to the reset screen
        When user enters email and click on send email
        Then user is shown snack message that email is sent successfully