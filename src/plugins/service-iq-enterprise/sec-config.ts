import { BSBServiceConfig } from "@bettercorp/service-base";
import { z } from "zod";

export const secSchema = z.object({
  username: z.string(),
  password: z.string(),
  host: z.string(),
});

export class Config extends BSBServiceConfig<typeof secSchema> {
  validationSchema = secSchema;

  migrate(
    toVersion: string,
    fromVersion: string | null,
    fromConfig: any | null
  ) {
    if (fromConfig === null) {
      // defaults
      return {
        username: "",
        password: "",
        host: "https://crm.example.com",
      };
    } else {
      // migrate
      return {
        username: fromConfig.username ?? "",
        password: fromConfig.password ?? "",
        host: fromConfig.host ?? "https://crm.example.com",
      };
    }
  }
}
