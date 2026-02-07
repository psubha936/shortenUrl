import { ShortUrlModel, ShortUrlDocument } from "../models/ShortUrl.model";
import { generateShortCode } from "../utils/generate.util";
import { ApiKeyDocument } from "../models/ApiKey.model";
import { AppError } from "../utils/appErrors";
import { AnalyticsModel } from "../models/Analytics.model";
import { logger } from "../utils/logger.util";
import { HttpStatus } from "../enums/httpStatus.enum";
import { LogMessages } from "../enums/logMessages.enum";

interface AnalyticsInput {
  ip: string;
  userAgent: string;
  referer?: string;
  os?: string;
  browser?: string;
}

/**
 * Create Short URL
 */
export const createShortUrl = async (
  originalUrl: string,
  apiKey: ApiKeyDocument
): Promise<ShortUrlDocument> => {
  logger.info(LogMessages.SHORT_URL_CREATED, {
    originalUrl,
    createdByKey: apiKey._id.toString(),
  });

  return ShortUrlModel.create({
    originalUrl,
    shortCode: generateShortCode(),
    createdByKey: apiKey._id,
    clicks: 0,
  });
};

/**
 * Redirect using short code + record analytics
 */
export const redirectByCode = async (
  code: string,
  analytics: AnalyticsInput
): Promise<string> => {
  logger.info("Redirect requested", { shortCode: code });

  const url = await ShortUrlModel.findOne({ shortCode: code });

  if (!url) {
    logger.warn(LogMessages.SHORT_URL_NOT_FOUND, { shortCode: code });
    throw new AppError(LogMessages.SHORT_URL_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  url.clicks += 1;
  await url.save();

  await AnalyticsModel.create({
    shortCode: code,
    ip: analytics.ip,
    userAgent: analytics.userAgent,
    referer: analytics.referer,
    os: analytics.os,
    browser: analytics.browser,
  });

  logger.info(LogMessages.REDIRECT_SUCCESS, {
    shortCode: code,
    totalClicks: url.clicks,
  });

  return url.originalUrl;
};

/**
 * Fetch analytics
 */
export const getAnalytics = async (shortCode: string) => {
  logger.info("Analytics requested", { shortCode });

  const url = await ShortUrlModel.findOne({ shortCode });

  if (!url) {
    logger.warn(LogMessages.SHORT_URL_NOT_FOUND, { shortCode });
    throw new AppError(LogMessages.SHORT_URL_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  const analytics = await AnalyticsModel.find({ shortCode });

  logger.info(LogMessages.ANALYTICS_FETCHED, {
    shortCode,
    totalClicks: url.clicks,
  });

  return {
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    totalClicks: url.clicks,
    analytics,
  };
};

/**
 * Update original URL
 */
export const updateUrl = async (
  shortCode: string,
  newUrl: string
): Promise<ShortUrlDocument> => {
  logger.info(LogMessages.UPDATE_REQUEST, {
    shortCode,
    newUrl,
  });

  const updated = await ShortUrlModel.findOneAndUpdate(
    { shortCode },
    { originalUrl: newUrl },
    { new: true }
  );

  if (!updated) {
    logger.warn(LogMessages.UPDATE_FAILED, { shortCode });
    throw new AppError(LogMessages.SHORT_URL_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  logger.info(LogMessages.SHORT_URL_UPDATED, {
    shortCode,
    id: updated._id.toString(),
  });

  return updated;
};