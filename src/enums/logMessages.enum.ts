export enum LogMessages {
  CREATE_API_KEY_REQUEST = "Create API key request received",
  CREATE_API_KEY_SUCCESS = "API key created successfully",
  CREATE_API_KEY_FAILED = "Failed to create API key",

  CREATE_SHORT_REQUEST = "Create short URL request received",
  CREATE_SHORT_SUCCESS = "Short URL created successfully",
  CREATE_SHORT_FAILED = "Failed to create short URL",

  ANALYTICS_REQUEST = "Analytics request received",
  ANALYTICS_SUCCESS = "Analytics fetched successfully",
  ANALYTICS_FAILED = "Failed to fetch analytics",

  UPDATE_URL_REQUEST = "Update short URL request received",
  UPDATE_URL_SUCCESS = "Short URL updated successfully",
  UPDATE_URL_FAILED = "Update URL failed",

  REDIRECT_REQUEST = "Redirect request received",
  REDIRECT_SUCCESS = "Redirect successful",
  REDIRECT_FAILED = "Redirect failed",

  API_KEY_CREATE_FAILED = "Failed to create API key",
  SHORT_URL_NOT_FOUND = "Short URL not found",
  SHORT_URL_CREATED = "Short URL created successfully",
  SHORT_URL_UPDATED = "Short URL updated successfully",
  ANALYTICS_FETCHED = "Analytics fetched successfully",

  UPDATE_REQUEST = "Update URL requested",
  UPDATE_FAILED = "Update failed – short URL not found",
}