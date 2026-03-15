 # 🚀 Scalable Playwright Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Test%20Automation-green) ![TypeScript](https://img.shields.io/badge/TypeScript-Framework-blue) ![CI](https://img.shields.io/badge/CI-Azure%20Pipelines-blue) ![License](https://img.shields.io/badge/License-MIT-green)

**Multi Environment | Multi Language UI Validation**

A clean, maintainable, and scalable test automation framework built with **Playwright** and **TypeScript**, designed to support:

- **Multiple test environments**  (test / preprod / prod)
- **Multi-language UI validation** (TR / EN)
- **Centralized configuration and test data management**
- **Page Object Model** (**POM**) **for reusable UI interactions**
- **CI/CD integration support**

## ✨1. Features

- **End-to-End Testing**: Playwright powers reliable E2E tests
- **Type-Safe Tests**: Written in TypeScript for maintainability
- **Multi-Environment Support**: Easily switch between test, preprod, and prod
- **Multi-Language Validation**: Validate UI in multiple languages (TR / EN etc)
- **Clean Architecture**: Separate layers for tests, page objects, data, and configuration
- **Reusable Page Objects**: Encapsulate UI interactions for cleaner test code
- **Environment-Based Test Users**: Different credentials per environment
- **CI/CD Friendly**: Easily integrates with pipelines
- **Debugging Tools**: Screenshots, videos, and trace viewer support

## 🧰2. Tech Stack

- Playwright – End-to-end testing framework
- TypeScript – Type-safe language for maintainable tests
- Azure Pipelines – CI/CD integration
- Node.js & npm/yarn – dependency management

## ⚡3. Getting Started

### 3.1. Repository’yi klonlayın

```bash
git clone https://github.com/CemalYaver/PlaywrightCore.git
cd PlaywrightCore
```

### 3.1. Node.js bağımlılıklarını yükleyin

```bash
npm install
```

### 3.2 Install the dotenv package (dev only)

```bash
npm install dotenv --save-dev
```
This package is required to load .env files within your code.

It is only needed for local development and testing.

It is not required when deploying to production.


### 3.3 Playwright browser’larını yükleyin

```bash
npx playwright install --with-deps
```

# 🧪4. Running Tests

## 4.1 Test,Preprod etc. 

The environment is selected using the ENV parameter, and the language is set using the LANG parameter.

Example: Test environment in English

```bash
ENV=test LANG=en npx playwright test
```

Example: Preprod environment in Turkish

```bash
ENV=preprod LANG=tr npx playwright test
```

Note: Adjust the ENV and LANG values according to your testing needs.

##  4.2 Local Production Tests

## 4.2.1. Create .env.prod from the example file

This will create a new .env.prod file using .env.prod.example as a template.

## 4.2.2 Fill in your production credentials
```
PROD_ADMIN_EMAIL=
PROD_ADMIN_PASSWORD=
PROD_USER1_EMAIL=
PROD_USER1_PASSWORD=
PROD_USER2_EMAIL=
PROD_USER2_PASSWORD=
```

## 4.2.3. Run tests using the production environment

```bash
ENV=prod LANG=en npx playwright test
```

Note on Environment Users

Production:

- Local .env.prod file must be created and filled with credentials.
- For running production tests in CI/CD (e.g., Azure Pipelines), make sure production environment variables are securely configured in your pipeline.

Test / Preprod:

- Users for these environments are stored directly in users.test.ts and users.preprod.ts files.
- No additional local .env files are needed.

# 🏗5. Architecture Overview

```
Tests
  ↓
Page Objects
  ↓
Base Page (Reusable UI actions for all pages)
  ↓
Test Data (Users, Messages – centralized test data)
  ↓
Environment Configuration (ENV, BASE_URL, LANG – environment-specific settings)
  ```

  Explanation:

- Tests – Business logic and test scenarios are defined here.

- Page Objects – Encapsulate UI interactions for each page, improving reusability.

- Base Page – Contains common UI actions (click, fill, wait, etc.) shared across all pages.

- Test Data – Centralized place for users, messages, and other test inputs.

- Environment Configuration – Handles environment-specific settings like ENV, BASE_URL, and LANG.

# 📁6. Project Structure

```
PLAYWRIGHT-TS-DEMO/
│
├─ config/
│  ├─ baseUrls.ts
│  ├─ env.ts
│  ├─ index.ts
│  └─ languages.ts
│
├─ pages/
│  ├─ base.page.ts
│  ├─ home.page.ts
│  └─ login.page.ts
│
├─ test-data/
│  ├─ messages/
│  │  ├─ en/
│  │  │  ├─ home.ts
│  │  │  ├─ index.ts
│  │  │  ├─ login.ts
│  │  │  └─ profile.ts
│  │  └─ tr/
│  │     ├─ home.ts
│  │     ├─ index.ts
│  │     ├─ login.ts
│  │     └─ profile.ts
│  └─ users/
│     ├─ index.ts
│     ├─ preprod.ts
│     ├─ prod.ts
│     └─ test.ts
│
├─ test-results/
│  └─ .last-run.json
│
├─ tests/
│  └─ login.spec.ts
│
├─ .env.prod
├─ .env.prod.example
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ readme.md
└─ tsconfig.json

```

# 👥7. Environment-Based Users

Test users are separated by environment. The correct dataset is automatically selected according to the ENV variable.

```
test-data/users/
├─ index.ts          # Central export, selects users by ENV
├─ users.test.ts     # Test environment users
├─ users.preprod.ts  # Preprod environment users
└─ users.prod.ts     # Production environment users
   ```

Note: Each file contains user credentials for its respective environment.
index.ts automatically exports the correct users based on ENV.

# 📄8. Page Object Model (POM)

In this framework, **User Interface (UI) interactions are separated from test logic** to keep the code clean, readable, and maintainable.

### Folder Structure

```text
pages/
├── base.page.ts   # Common reusable actions for all pages
├── login.page.ts  # Login page-specific actions
└── home.page.ts   # Home page-specific actions
```

Benefits of POM:

- Reusable page actions – Avoid duplicating UI code across tests.

- Cleaner test files – Test scripts focus on business logic.

- Easier maintenance – Changes in UI affect only page objects, not test files.

# 🧑‍💻9. Writing Tests

Focus on business logic; Page Objects handle UI actions.

# Login Tests Example

This is an example of Login tests implemented with Playwright and Page Object Model (POM).

```ts
import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';
import { users } from '../test-data/users';

test.describe('Login Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.open();
        await homePage.changeLanguage();
        await homePage.clickLoginButton();
    });

    test('Login with valid credentials', async () => {
        await loginPage.login(users.ADMIN);
        await loginPage.verifyLoginSuccess();
    });

    test('Login with invalid credentials', async () => {
        await loginPage.login(users.USER1_INVALID_PASSWORD);
        await loginPage.verifyLoginError();
    });
});
  ```

# 🔄10. CI/CD Integration (Azure DevOps Example)

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  ENV: test
  LANG: en
  BASE_URL: https://test.site.com

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
  displayName: 'Install Node.js'

- script: npm install
  displayName: 'Install dependencies'

- script: npx playwright install --with-deps
  displayName: 'Install Playwright browsers'

- script: npx playwright test
  displayName: 'Run Playwright tests'
 ```

# 🐞11. Debugging & Test Reports

Playwright provides built-in tools to help debug failing tests and analyze test runs:

- **Trace Viewer** – inspect test execution step by step  
- **Screenshots on failure** – automatically capture screenshots when a test fails  
- **Video recordings** – record test runs for visual debugging  
- **HTML test reports** – view structured results in a browser  

### Example Playwright config

```ts
use: {
  trace: 'on-first-retry',       // records trace only on first retry
  screenshot: 'only-on-failure'  // captures screenshot only if the test fails
}
```