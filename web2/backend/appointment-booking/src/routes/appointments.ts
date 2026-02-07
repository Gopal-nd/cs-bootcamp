import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { bookAppointments, getUserAppointments } from "../controller/appointments";

const router = Router();

router.post("/", authenticate('USER'), bookAppointments);
router.get("/me", authenticate('USER'), getUserAppointments);

export default router;

