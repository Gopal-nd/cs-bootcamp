import { Router } from "express";
import { register, login } from "../controller/authController";
import { authenticate } from "../middleware/auth";
import { providerShedule } from "../controller/provider";

const router = Router();

router.get('/me/schedule', authenticate('SERVICE_PROVIDER'), providerShedule)

export default router;


