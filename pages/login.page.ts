import { Page, Locator } from '@playwright/test';
import BasePage from './base.page';
import { messages } from "../test-data/messages";
import type { User } from '../test-data/users';

/**
 * LoginPage class: handles login page interactions
 * - Extends BasePage
 * - Provides methods for login flow and error verification
 */
export default class LoginPage extends BasePage {

  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private loginErrorText: Locator;
  private dashboardHeader: Locator;

  constructor(page: Page) {
    super(page);
    // Email input field
    this.emailInput = this.page.locator('#ap_email');
    // Password input field
    this.passwordInput = this.page.locator('//input[@type="password"]');
    // Submit button
    this.submitButton = this.page.locator('//input[@type="submit"]');
    // Error message for wrong credentials
    this.loginErrorText = this.page.locator('div[id="auth-error-message-box"] div[class="a-alert-content"]');
    // Dashboard header
    this.dashboardHeader = page.locator('h1:has-text("Dashboard")');
  }

  /** Fill email and password, then submit login */
  async login(user: User) {
    // Email step
    await this.fill(this.emailInput, user.email);
    await this.click(this.submitButton);
    // Password step
    await this.fill(this.passwordInput, user.password);
    await this.click(this.submitButton);
  }

  /** Verify error message appears for wrong credentials */
  async verifyLoginError() {
    await this.expectText(this.loginErrorText, messages.login.auth.wrongPassword);
  }

  /** Verify login was successful */
  async verifyLoginSuccess() {
    await this.expectVisible(this.dashboardHeader);
  }
}