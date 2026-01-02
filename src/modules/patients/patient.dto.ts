import z from "zod";

const Patient = z.object({
  nombre: z.string(),
  seguroMedico: z.string().optional(),
  telefono: z.string().optional(),
});

export type CreatePatientDTO = z.infer<typeof Patient>;
