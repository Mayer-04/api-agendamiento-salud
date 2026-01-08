import { env, exit } from "node:process";
import z from "zod";

const EnvSchema = z
  .object({
    PORT: z.coerce.number().default(8080),
    MONGO_INITDB_ROOT_USERNAME: z
      .string()
      .min(1, "El usuario de Mongo no puede estar vacío"),
    MONGO_INITDB_ROOT_PASSWORD: z.string().min(4, {
      error: "La contraseña de Mongo debe tener al menos 4 caracteres",
    }),
    MONGO_DB_PORT: z.coerce.number().default(27017),
  })
  .transform((env) => {
    return {
      port: env.PORT,
      database: {
        user: env.MONGO_INITDB_ROOT_USERNAME,
        password: env.MONGO_INITDB_ROOT_PASSWORD,
        port: env.MONGO_DB_PORT,
      },
    };
  });

export type EnvSchemaType = z.infer<typeof EnvSchema>;

const { success, data, error } = EnvSchema.safeParse(env);

if (!success) {
  const formattedErrors = z.treeifyError(error);

  const properties = Object.entries(formattedErrors?.properties ?? {});

  properties.forEach(([key, value]) => {
    const propertyValue = value?.errors[0];

    if (propertyValue) {
      console.log(`Error en variable de entorno [${key}]: ${propertyValue}`);
    } else {
      console.log(`Error [${key}]: ${value}`);
    }
  });

  exit(1);
}

export const { port, database } = data;
