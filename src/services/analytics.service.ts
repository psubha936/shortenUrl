import { AnalyticsModel } from "../models/Analytics.model";
import { Request } from "express";
import { logger } from "../utils/logger.util";

export const recordAnalytics = async (
  req: Request,
  shortCode: string
): Promise<void> => {
  logger.info("Recording analytics", {
    shortCode,
    ip: req.ip,
  });

  try {
    await AnalyticsModel.create({
      shortCode,
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      referer: req.headers["referer"] || "unknown",
    });

    logger.info("Analytics recorded successfully", {
      shortCode,
    });
  } catch (error) {
    logger.error("Failed to record analytics", {
      shortCode,
      error,
    });
  }
};