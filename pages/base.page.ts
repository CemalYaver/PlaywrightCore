import { expect, Locator, Page } from '@playwright/test';

/**
 * BasePage class: common page actions for all pages
 * - Encapsulates Playwright Page object
 * - Provides reusable methods for clicks, fills, hovers, assertions
 */
export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Open a URL path, default to '/' */
  async open(path = '/') {
    await this.page.goto(path);
  }

  /** Click on a locator */
  async click(locator: Locator) {
    await locator.click();
  }

  /** Fill input with a value */
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  /** Hover over an element */
  async hover(locator: Locator) {
    await locator.hover();
  }

  /** Assert element is visible */
  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /** Assert element text equals expected */
  async expectText(locator: Locator, expected: string) {
    await expect(locator).toHaveText(expected);
  }
}