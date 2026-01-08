import { z } from "zod";
import { WORKING_DAYS } from "./doctor.model";

const HorarioLaboralSchema = z.object({
  dia: z.enum(WORKING_DAYS),
  start: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:MM)"),
  end: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:MM)"),
});

const Doctor = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  especialidad: z.string().min(3),
  matricula: z.string().min(4),
  horarioLaboral: z
    .array(HorarioLaboralSchema)
    .nonempty("Debe tener al menos un horario"),
});

export type CreateDoctorDTO = z.infer<typeof Doctor>;
