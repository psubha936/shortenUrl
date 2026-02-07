
import { Router } from "express";
import { createKeyController } from "../controllers/apiKey.controller";

const router = Router();
router.post("/api-keys", createKeyController);
export default router;
