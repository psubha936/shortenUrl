import { Router } from "express";
import { rateLimitMiddleware } from "../middlewares/rateLimit.middleware";
import * as controller from "../controllers/shortUrl.controller";
import { apiKeyMiddleware } from "../middlewares/apiKey.middleware";

const router = Router();

router.get("/r/:code", rateLimitMiddleware, controller.redirect);

router.post("/short-urls", apiKeyMiddleware, controller.createShort);
router.put("/short-urls/:code", apiKeyMiddleware, controller.update);
router.get("/short-urls/:id/analytics", apiKeyMiddleware, controller.analytics);

export default router;