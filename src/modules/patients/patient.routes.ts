import { Router } from "express";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";

const patientRoutes = Router();

const patientService = new PatientService();
const patientController = new PatientController(patientService);

patientRoutes.post("/", patientController.save);

export { patientRoutes };
