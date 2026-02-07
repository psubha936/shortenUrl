import { Request, Response } from "express";
import { createApiKey } from "../services/apiKey.service";
import { HttpStatus } from "../enums/httpStatus.enum";
import { logger } from "../utils/logger.util";
import { LogMessages } from "../enums/logMessages.enum";

export const createKeyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, createdBy } = req.body;

  logger.info(LogMessages.CREATE_API_KEY_REQUEST, {
    name,
    createdBy
  });

  try {
    const key = await createApiKey(name, createdBy);

    logger.info(LogMessages.CREATE_API_KEY_SUCCESS, {
      keyId: key._id,
      name,
      createdBy
    });

    res.status(HttpStatus.CREATED).json(key);
  } catch (error) {
    logger.error(LogMessages.CREATE_API_KEY_FAILED, {
      name,
      createdBy,
      error
    });

    throw error;
  }
};