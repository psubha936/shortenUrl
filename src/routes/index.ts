
import { Router } from "express";
import health from "./health.routes";
import apiKey from "./apikey.routes";
import shortUrl from "./shorturl.routes";

const router = Router();
router.use(health);
router.use(apiKey);
router.use(shortUrl);

export default router;
