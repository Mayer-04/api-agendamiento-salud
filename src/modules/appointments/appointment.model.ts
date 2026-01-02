import { Schema, model, type InferSchemaType } from "mongoose";

const APPOINTMENT_STATUS = ["PROGRAMADA", "COMPLETADA", "CANCELADA"] as const;

const appointmentSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    fechaHora: { type: Date, required: true },
    estado: {
      type: String,
      enum: APPOINTMENT_STATUS,
      default: "PROGRAMADA",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "cita",
  }
);

type AppointmentType = InferSchemaType<typeof appointmentSchema>;

const Appointment = model<AppointmentType>("Appointment", appointmentSchema);

export { Appointment, type AppointmentType };
