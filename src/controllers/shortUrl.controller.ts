import { NextFunction, Request, Response } from "express";
import * as service from "../services/shortUrl.service";
import { HttpStatus } from "../enums/httpStatus.enum";
import { LogMessages } from "../enums/logMessages.enum";
import { logger } from "../utils/logger.util";
import { buildShortUrl } from "../utils/url.util";

/**
 * Create short URL
 */
export const createShort = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doc = await service.createShortUrl(
      req.body.originalUrl,
      req.apiKey!
    );

    logger.info("Short URL created", {
      shortCode: doc.shortCode,
    });

    res.status(HttpStatus.CREATED).json({
      originalUrl: doc.originalUrl,
      shortUrl: buildShortUrl(doc.shortCode),
      clicks: doc.clicks,
      createdAt: doc.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get analytics
 */
export const analytics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(LogMessages.ANALYTICS_REQUEST, {
    shortCode: req.params.id
  });

  try {
    const data = await service.getAnalytics(req.params.id);

    logger.info(LogMessages.ANALYTICS_SUCCESS, {
      shortCode: req.params.id
    });

    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    logger.error(LogMessages.ANALYTICS_FAILED, {
      shortCode: req.params.id,
      error
    });
    next(error);
  }
};

/**
 * Update short URL
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(LogMessages.UPDATE_URL_REQUEST, {
    shortCode: req.params.code,
    newUrl: req.body.originalUrl
  });

  try {
    const updated = await service.updateUrl(
      req.params.code,
      req.body.originalUrl
    );

    logger.info(LogMessages.UPDATE_URL_SUCCESS, {
      shortCode: req.params.code
    });

    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        originalUrl: updated.originalUrl,
        shortUrl: buildShortUrl(updated.shortCode),
        clicks: updated.clicks,
        createdAt: updated.createdAt,
      }
    });
  } catch (error) {
    logger.error(LogMessages.UPDATE_URL_FAILED, {
      shortCode: req.params.code,
      error
    });

    next(error);
  }
};

/**
 * Redirect
 */
export const redirect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(LogMessages.REDIRECT_REQUEST, {
    shortCode: req.params.code,
    ip: req.ip
  });

  try {
    const originalUrl = await service.redirectByCode(req.params.code, {
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      referer: req.headers.referer
    });

    logger.info(LogMessages.REDIRECT_SUCCESS, {
      shortCode: req.params.code
    });

    res.redirect(HttpStatus.FOUND, originalUrl);
  } catch (error) {
    logger.error(LogMessages.REDIRECT_FAILED, {
      shortCode: req.params.code,
      error
    });
    next(error);
  }
};