import { ENV } from '../../config';
import { users as testUsers } from './test';
import { users as preprodUsers } from './preprod';
import { users as prodUsers } from "./prod";

/**
 * User type: represents a user with email and password
 */
export type User = {
  email: string;
  password: string;
};

/**
 * Users type: a record of users by key
 */
type Users = Record<string, User>;

/**
 * Map of users per environment
 */
const usersByEnv: Record<'test' | 'preprod' | 'prod', Users> = {
  test: testUsers,
  preprod: preprodUsers,
  prod: prodUsers,
};

/**
 * Export users according to current ENV
 * Example usage: users.ADMIN, users.USER1
 */
export const users = usersByEnv[ENV];