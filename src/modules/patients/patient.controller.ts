import type { Request, Response } from "express";
import type { PatientService } from "./patient.service";

export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  save = async (req: Request, res: Response) => {
    const data = req.body;
    const patient = await this.patientService.save(data);
    res.status(201).json({
      success: true,
      data: patient,
    });
  };
}
