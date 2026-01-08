import type { Request, Response } from "express";
import { DoctorService } from "./doctor.service";

export class DoctorController {
  private readonly doctorService: DoctorService;

  // equivalente TS: constructor(private readonly doctorService: DoctorService) {}
  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }
  save = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const doctor = await this.doctorService.save(data);
    res.status(201).json({
      success: true,
      data: doctor,
    });
  };
}
