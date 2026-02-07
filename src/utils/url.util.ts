import { ENV } from "../config/env.config";


export const buildShortUrl = (shortCode: string): string => {
  return `${ENV.BASE_URL}/r/${shortCode}`;
};