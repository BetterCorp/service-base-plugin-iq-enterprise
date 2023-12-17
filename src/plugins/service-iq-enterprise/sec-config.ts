import { BSBServiceConfig } from "@bettercorp/service-base";
import { z } from "zod";

export const secSchema = z.object({
  username: z.string(),
  password: z.string(),
  host: z.string().default("https://api.example.com"),
}).optional();

export class Config extends BSBServiceConfig<typeof secSchema> {
  validationSchema = secSchema;

  migrate(
    toVersion: string,
    fromVersion: string | null,
    fromConfig: any | null
  ) {
    return fromConfig;
  }
}
