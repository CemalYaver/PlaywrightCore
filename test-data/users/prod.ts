export const users = {
  ADMIN: { email: process.env['PROD_ADMIN_EMAIL']!, password: process.env['PROD_ADMIN_PASSWORD']! },
  USER1: { email: process.env['PROD_USER1_EMAIL']!, password: process.env['PROD_USER1_PASSWORD']! },
  USER1_INVALID_PASSWORD: { email: process.env['PROD_USER1_EMAIL']!, password: process.env['PROD_USER1_INVALID_PASSWORD']! }
}; 