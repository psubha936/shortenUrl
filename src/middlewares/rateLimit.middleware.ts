import { Request, Response, NextFunction } from "express";
import { AnalyticsModel } from "../models/Analytics.model";
import { HttpStatus } from "../enums/httpStatus.enum";

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ip = req.ip;
  const shortCode = req.params.code;

  const now = new Date();

  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const ipHits = await AnalyticsModel.countDocuments({
    ip,
    createdAt: { $gte: twoHoursAgo }
  });

  if (ipHits >= 50) {
    res
      .status(HttpStatus.TOO_MANY_REQUESTS)
      .json({ message: "Rate limit exceeded (IP)" });
    return;
  }

  if (shortCode) {
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const sameUrlHits = await AnalyticsModel.countDocuments({
      ip,
      shortCode,
      createdAt: { $gte: fiveMinutesAgo }
    });

    if (sameUrlHits >= 4) {
      res
        .status(HttpStatus.TOO_MANY_REQUESTS)
        .json({ message: "Too many hits for same URL" });
      return;
    }
  }

  next();
};