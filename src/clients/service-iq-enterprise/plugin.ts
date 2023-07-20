import {
  ServiceCallable,
  ServicesBase,
  ServicesClient,
} from "@bettercorp/service-base";
import {
  APICustomerAccount,
  IEmitAndReturn,
} from "../../index";

export class IQEnterpriseClient extends ServicesClient<
  ServiceCallable,
  ServiceCallable,
  IEmitAndReturn,
  ServiceCallable,
  ServiceCallable
> {
  public static readonly pluginName = "service-iq-enterprise";
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

  /*public async getCustomerById(id: number): Promise<APICustomer>
  public async getCustomerById(id: number, hostname: string, username: string, password: string): Promise<APICustomer>
  public async getCustomerById(id: number, hostname?: string, username?: string, password?: string): Promise<APICustomer> {
    return await this._plugin.emitEventAndReturn('getCustomerById', id, hostname, username, password);
  }*/

  public async getCustomerAccountById(
    id: number
  ): Promise<APICustomerSpecific>;
  public async getCustomerAccountById(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerSpecific>;
  public async getCustomerAccountById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerSpecific> {
    return await this._plugin.emitEventAndReturn(
      "getCustomerAccountById",
      id,
      hostname,
      username,
      password
    );
  }
}
