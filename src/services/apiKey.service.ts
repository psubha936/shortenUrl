import { ApiKeyModel, ApiKeyDocument } from "../models/ApiKey.model";
import { generateApiKey } from "../utils/generate.util";
import { logger } from "../utils/logger.util";
import { AppError } from "../utils/appErrors";
import { HttpStatus } from "../enums/httpStatus.enum";
import { LogMessages } from "../enums/logMessages.enum";

export const createApiKey = async (
  name: string,
  createdBy: string
): Promise<ApiKeyDocument> => {
  logger.info("Creating API key", {
    name,
    createdBy,
  });

  try {
    const apiKey = await ApiKeyModel.create({
      name,
      createdBy,
      key: generateApiKey(),
    });

    logger.info("API key created successfully", {
      apiKeyId: apiKey._id,
      name,
    });

    return apiKey;
  } catch (error) {
    logger.error("Failed to create API key", {
      name,
      createdBy,
      error,
    });

    throw new AppError(
      LogMessages.API_KEY_CREATE_FAILED,
      HttpStatus.INTERNAL_ERROR
    );
  }
};