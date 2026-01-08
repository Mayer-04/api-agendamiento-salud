import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";

const doctorRoutes = Router();

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

doctorRoutes.post("/", doctorController.save);
// doctorRoutes.get("/:id/performance");

export { doctorRoutes };
