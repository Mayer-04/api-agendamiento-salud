import { type Model } from "mongoose";
import { Doctor, type DoctorType } from "./doctor.model";
import { type CreateDoctorDTO } from "./doctor.dto";

export class DoctorAlreadyExistsError extends Error {
  constructor(matricula: string) {
    super(`El doctor con matrícula ${matricula} ya existe.`);
  }
}

export class DoctorService {
  constructor(private readonly doctorModel: Model<DoctorType> = Doctor) {}

  async save(data: CreateDoctorDTO): Promise<DoctorType> {
    try {
      const doctor = await this.doctorModel.create(data);
      return doctor.toObject();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DoctorAlreadyExistsError(data.matricula);
      }
      throw error;
    }
  }
}
