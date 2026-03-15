import { ENV } from "./env";

/**
 * Base URLs per environment
 * Only test, preprod, and prod are defined here
 */
const urls = {
  test: "https://test.example.com",
  preprod: "https://preprod.example.com",
  prod: "https://www.example.com",
};

/**
 * BASE_URL is selected based on current ENV
 * Example usage in Playwright config or page objects
 */
export const BASE_URL = urls[ENV];