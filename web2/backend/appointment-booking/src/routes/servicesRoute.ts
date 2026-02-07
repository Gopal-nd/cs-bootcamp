import { Router } from "express";
import { createServices, getAllServices, getServiceSlot, setAvailability } from "../controller/service.ts";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate('SERVICE_PROVIDER'), createServices);
router.post("/:serviceId/availability", authenticate('SERVICE_PROVIDER'), setAvailability);
router.get("/", getAllServices)
router.get('/:serviceId/slots', authenticate('USER'), getServiceSlot)
export default router;

