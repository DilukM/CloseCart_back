import { Router } from "express";
import { createParticipant } from "../controllers/participantController.js";
import { validateParticipantData } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateParticipantData, createParticipant);
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Research API" });
});

export default router;
