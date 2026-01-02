import { Schema, model, type InferSchemaType } from "mongoose";

const WORKING_DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const;

const doctorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    matricula: { type: String, required: true, unique: true },

    horarioLaboral: [
      {
        dia: {
          type: String,
          required: true,
          enum: WORKING_DAYS,
        },
        start: { type: String, required: true },
        end: { type: String, required: true },
        // _id: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "doctor",
  }
);

type DoctorType = InferSchemaType<typeof doctorSchema>;
const Doctor = model<DoctorType>("Doctor", doctorSchema);

export { Doctor, type DoctorType };
