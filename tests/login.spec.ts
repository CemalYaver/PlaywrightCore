import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';
import { users } from '../test-data/users';

// Grouping all login-related tests
test.describe('Login Tests', () => {

    let loginPage: LoginPage;

    // Runs before each test in this describe block
    // Opens the homepage, changes language, and navigates to the login page
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.open();
        await homePage.changeLanguage();
        await homePage.clickLoginButton();
    });

    // Test case: Login with valid credentials
    // Verifies that an admin user can successfully log in
    test('Login with valid credentials', async () => {
        await loginPage.login(users.ADMIN);
        await loginPage.verifyLoginSuccess();
    });

    // Test case: Login with invalid credentials
    // Verifies that an error message is displayed when login fails
    test('Login with invalid credentials', async () => {
        await loginPage.login(users.USER1_INVALID_PASSWORD);
        await loginPage.verifyLoginError();
    });
});