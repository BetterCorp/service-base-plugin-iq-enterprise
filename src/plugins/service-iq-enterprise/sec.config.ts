import { SecConfig } from "@bettercorp/service-base";

export interface PluginConfig {
  username: string;
  password: string;
  host: string;
}

export class Config extends SecConfig<PluginConfig> {
  migrate(
    mappedPluginName: string,
    existingConfig: PluginConfig
  ): PluginConfig {
    return {
      username: existingConfig.username ?? '',
      password: existingConfig.password ?? '',
      host: existingConfig.host ?? 'https://crm.example.com',
    }
  }
}