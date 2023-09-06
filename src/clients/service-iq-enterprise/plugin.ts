import {
  ServiceCallable,
  ServicesBase,
  ServicesClient,
} from "@bettercorp/service-base";
import {
  APICustomerAccount,
  APICustomerSpecific,
  IEmitAndReturn,
} from "../../index";

export class IQEnterpriseClient extends ServicesClient<
  ServiceCallable,
  ServiceCallable,
  IEmitAndReturn,
  ServiceCallable,
  ServiceCallable
> {
  override _pluginName: string = "service-iq-enterprise";
  public constructor(self: ServicesBase) {
    super(self);
  }
  protected override async _register() {
    await super._register();
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
    return await this._plugin.emitEventAndReturn(
      "getCustomersByEmail",
      email,
      hostname,
      username,
      password
    );
  }

  public async getSubAccountById(id: number): Promise<APICustomerSpecific>;
  public async getSubAccountById(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerSpecific>;
  public async getSubAccountById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerSpecific> {
    return await this._plugin.emitEventAndReturn(
      "getSubAccountById",
      id,
      hostname,
      username,
      password
    );
  }

  public async getCustomerByAccountId(id: string): Promise<APICustomerAccount>;
  public async getCustomerByAccountId(
    id: string,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerAccount>;
  public async getCustomerByAccountId(
    id: string,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerAccount> {
    return await this._plugin.emitEventAndReturn(
      "getCustomerByAccountId",
      id,
      hostname,
      username,
      password
    );
  }

  public async getSubAccountsByAccountId(id: string): Promise<Array<APICustomerSpecific>>;
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
    return await this._plugin.emitEventAndReturn(
      "getSubAccountsByAccountId",
      id,
      hostname,
      username,
      password
    );
  }
}
