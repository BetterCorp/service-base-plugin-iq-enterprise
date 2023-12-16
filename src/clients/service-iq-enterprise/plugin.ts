import { BSBService, BSBServiceClient } from "@bettercorp/service-base";
import { APICustomerAccount, APICustomerSpecific } from "../../index";
import { ServiceTypes } from "../../plugins/service-iq-enterprise/plugin";

export class IQEnterpriseClient extends BSBServiceClient<ServiceTypes> {
  public readonly pluginName = "service-iq-enterprise";
  public readonly initBeforePlugins?: string[] | undefined;
  public readonly initAfterPlugins?: string[] | undefined;
  public readonly runBeforePlugins?: string[] | undefined;
  public readonly runAfterPlugins?: string[] | undefined;
  dispose?(): void;
  init?(): Promise<void>;
  run?(): Promise<void>;
  public constructor(context: BSBService<any, any>) {
    super(context);
  }

  public async getCustomersByEmail(
    email: string
  ): Promise<Array<APICustomerAccount>>;
  public async getCustomersByEmail(
    email: string,
    hostname: string,
    username: string,
    password: string
  ): Promise<Array<APICustomerAccount>>;
  public async getCustomersByEmail(
    email: string,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APICustomerAccount>> {
    return await this.events.emitEventAndReturn(
      "getCustomersByEmail",
      30,
      email,
      hostname,
      username,
      password
    );
  }

  public async getSubAccountById(
    id: number
  ): Promise<APICustomerSpecific | null>;
  public async getSubAccountById(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerSpecific | null>;
  public async getSubAccountById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerSpecific | null> {
    return await this.events.emitEventAndReturn(
      "getSubAccountById",
      30,
      id,
      hostname,
      username,
      password
    );
  }

  public async getCustomerByAccountId(
    id: string
  ): Promise<APICustomerAccount | null>;
  public async getCustomerByAccountId(
    id: string,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerAccount | null>;
  public async getCustomerByAccountId(
    id: string,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerAccount | null> {
    return await this.events.emitEventAndReturn(
      "getCustomerByAccountId",
      30,
      id,
      hostname,
      username,
      password
    );
  }

  public async getSubAccountsByAccountId(
    id: string
  ): Promise<Array<APICustomerSpecific>>;
  public async getSubAccountsByAccountId(
    id: string,
    hostname: string,
    username: string,
    password: string
  ): Promise<Array<APICustomerSpecific>>;
  public async getSubAccountsByAccountId(
    id: string,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APICustomerSpecific>> {
    return await this.events.emitEventAndReturn(
      "getSubAccountsByAccountId",
      30,
      id,
      hostname,
      username,
      password
    );
  }
}
