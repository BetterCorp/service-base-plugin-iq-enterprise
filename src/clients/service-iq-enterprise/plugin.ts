import { BSBService, BSBServiceClient } from "@bettercorp/service-base";
import {
  APICustomerAccount,
  APICustomerSpecific,
  APIServiceUsageResponse,
  APIServicesResponse,
  APIServicesResponsePackage,
  NewAPIApplication,
} from "../../index";
import {
  CoverageService,
  ServiceTypes,
} from "../../plugins/service-iq-enterprise/plugin";

export class IQEnterprise extends BSBServiceClient<ServiceTypes> {
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
  public async coverageLookup(
    lat: number,
    lng: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<CoverageService> {
    return await this.events.emitEventAndReturn(
      "coverageLookup",
      30,
      lat,
      lng,
      hostname,
      username,
      password
    );
  }
  public async getServices(
    service?: CoverageService,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APIServicesResponse>> {
    return await this.events.emitEventAndReturn(
      "getServices",
      30,
      service,
      hostname,
      username,
      password
    );
  }
  public async getServicesInGroup(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APIServicesResponse> {
    return await this.events.emitEventAndReturn(
      "getServicesInGroup",
      30,
      id,
      hostname,
      username,
      password
    );
  }
  public async getServiceById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APIServicesResponsePackage> {
    return await this.events.emitEventAndReturn(
      "getServiceById",
      30,
      id,
      hostname,
      username,
      password
    );
  }
  public async createNewApplication(
    data: NewAPIApplication,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<number> {
    return await this.events.emitEventAndReturn(
      "createNewApplication",
      30,
      data,
      hostname,
      username,
      password
    );
  }
  public async getServiceUsageByAccount(
    id: string,
    month: number,
    year: number,
    day?: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APIServiceUsageResponse> {
    return await this.events.emitEventAndReturn(
      "getServiceUsageByAccount",
      30,
      id,
      month,
      year,
      day,
      hostname,
      username,
      password
    );
  }
}
