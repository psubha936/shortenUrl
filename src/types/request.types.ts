import { ApiKeyDocument } from "../models/ApiKey.model";

declare global {
  namespace Express {
    interface Request {
      apiKey?: ApiKeyDocument;
    }
  }
}

export { };