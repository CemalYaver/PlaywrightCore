import dotenv from "dotenv";

// Get ENV variable, default to "test" if not set
const env = process.env.ENV || "test";

// Load the corresponding .env file based on ENV
dotenv.config({ path: `.env.${env}` });

// Type definition for allowed environments
export type Env = "test" | "preprod" | "prod";

// Export the current environment with type safety
export const ENV: Env = env as Env;