import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET!;

/**
 * Generates a JWT token for the given payload.
 * @param payload The data to encode in the token
 * @returns The signed JWT token as a string
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 * @param token The JWT token to verify
 * @returns The decoded payload if the token is valid
 * @throws If the token is invalid or expired
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
