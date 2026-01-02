import type { Model } from "mongoose";
import { Patient, type PatientType } from "./patient.model";
import type { CreatePatientDTO } from "./patient.dto";

export class PatientService {
  constructor(private readonly patientModel: Model<PatientType> = Patient) {}

  async save(data: CreatePatientDTO): Promise<PatientType> {
    const patient = await this.patientModel.create(data);
    return patient.toObject();
  }
}
