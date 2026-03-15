import { Page, Locator } from '@playwright/test';
import BasePage from './base.page';
import { messages } from "../test-data/messages";
import { LANG } from '../config';

/**
 * HomePage class: represents the main page of the app
 * - Extends BasePage
 * - Handles homepage interactions like language change and profile menu actions
 */
export default class HomePage extends BasePage {
  private languageButton: Locator;
  private profileButton: Locator;

  constructor(page: Page) {
    super(page);
    // Language selector button
    this.languageButton = this.page.locator('(//span[@class="Jsgzgo"])[3]');
    // Profile / user menu button
    this.profileButton = this.page.locator('(//span[@class="l-R6Lg"])[1]');
  }

  /** Hover over language button and select desired language */
  async changeLanguage() {
    await this.hover(this.languageButton);
    await this.selectLanguage(messages.home.languages[LANG]);
  }

  /** Click on a specific language button */
  async selectLanguage(lang: string) {
    const language = this.page.getByRole('button', { name: lang });
    await this.click(language);
  }

  /** Hover over profile button and click "Sign In" */
  async clickLoginButton() {
    this.hover(this.profileButton);
    await this.clickProfileMenu(messages.profile.buttons.signIn);
  }

  /** Click on a specific item in the profile menu */
  async clickProfileMenu(menu: string) {
    const profileMenu = this.page.getByRole('link', { name: menu });
    await this.click(profileMenu);
  }
}