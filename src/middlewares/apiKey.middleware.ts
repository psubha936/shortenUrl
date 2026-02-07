import { Request, Response, NextFunction } from "express";
import { ApiKeyModel } from "../models/ApiKey.model";
import { HttpStatus } from "../enums/httpStatus.enum";

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const key = req.headers["x-api-key"];

  if (typeof key !== "string") {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "API key missing" });
    return;
  }

  const apiKey = await ApiKeyModel.findOne({ key, isActive: true });
  if (!apiKey) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid API key" });
    return;
  }

  req.apiKey = apiKey;
  next();
};