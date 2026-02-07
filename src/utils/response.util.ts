
import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
): void => {
  res.status(status).json({ message, data });
};
