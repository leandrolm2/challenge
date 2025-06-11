import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password using bcrypt.
 * @param password Plain text password
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password Plain text password
 * @param hash Hashed password
 * @returns true if the password matches, false otherwise
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}