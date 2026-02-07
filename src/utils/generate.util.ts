
import crypto from "crypto";

export const generateApiKey = (): string =>
  crypto.randomBytes(32).toString("hex");

export const generateShortCode = (): string =>
  crypto.randomBytes(4).toString("hex");
