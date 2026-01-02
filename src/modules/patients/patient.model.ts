import { Schema, model, type InferSchemaType } from "mongoose";

const patientSchema = new Schema(
  {
    nombre: { type: String, required: true },
    seguroMedico: { type: String },
    telefono: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "paciente",
  }
);

type PatientType = InferSchemaType<typeof patientSchema>;

const Patient = model<PatientType>("Patient", patientSchema);

export { Patient, type PatientType };
