import { BSBService, BSBServiceClient } from "@bettercorp/service-base";
import {
  APICustomerAccount,
  APICustomerSpecific,
  APIRoutersResponse,
  APIServiceUsageResponse,
  APIServicesResponse,
  APIServicesResponsePackage,
  CoverageService,
  NewAPIApplication,
  UpgradeDowngradeInfo,
} from "../../index";
import { Plugin } from "./plugin";

export class IQEnterprise extends BSBServiceClient<Plugin> {
  public readonly pluginName = "service-iq-enterprise";
  public readonly initBeforePlugins?: string[] | undefined;
  public readonly initAfterPlugins?: string[] | undefined;
  public readonly runBeforePlugins?: string[] | undefined;
  public readonly runAfterPlugins?: string[] | undefined;
  dispose?(): void;
  init?(): Promise<void>;
  run?(): Promise<void>;
  private customConfig: {
    hostname?: string;
    username?: string;
    password?: string;
  } = {};
  public constructor(
    context: BSBService,
    hostname?: string,
    username?: string,
    password?: string
  ) {
    super(context);
    this.customConfig.hostname = hostname;
    this.customConfig.username = username;
    this.customConfig.password = password;
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async coverageLookup(
    lat: number,
    lng: number
  ): Promise<Array<CoverageService>>;
  public async coverageLookup(
    lat: number,
    lng: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<Array<CoverageService>>;
  public async coverageLookup(
    lat: number,
    lng: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<CoverageService>> {
    return await this.events.emitEventAndReturn(
      "coverageLookup",
      30,
      lat,
      lng,
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getServices(
    service: CoverageService
  ): Promise<Array<APIServicesResponse>>;
  public async getServices(
    service?: CoverageService,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APIServicesResponse>>;
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getServicesInGroup(id: number): Promise<APIServicesResponse>;
  public async getServicesInGroup(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APIServicesResponse>;
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getServiceById(id: number): Promise<APIServicesResponsePackage>;
  public async getServiceById(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APIServicesResponsePackage>;
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async createNewApplication(data: NewAPIApplication): Promise<number>;
  public async createNewApplication(
    data: NewAPIApplication,
    hostname: string,
    username: string,
    password: string
  ): Promise<number>;
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
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getServiceUsageBySubAccount(
    subAccountId: string,
    month: number,
    year: number,
    day?: number
  ): Promise<APIServiceUsageResponse>;
  public async getServiceUsageBySubAccount(
    subAccountId: string,
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
      subAccountId,
      month,
      year,
      day,
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getUpgradeDowngradeInfo(
    currentPackageId: number,
    requestedPackageId: number
  ): Promise<UpgradeDowngradeInfo>;
  public async getUpgradeDowngradeInfo(
    currentPackageId: number,
    requestedPackageId: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<UpgradeDowngradeInfo>;
  public async getUpgradeDowngradeInfo(
    currentPackageId: number,
    requestedPackageId: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<UpgradeDowngradeInfo> {
    return await this.events.emitEventAndReturn(
      "getUpgradeDowngradeInfo",
      30,
      currentPackageId,
      requestedPackageId,
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async doUpgradeDowngrade(
    accountId: string,
    customerId: number,
    requestedPackageId: number,
    action: "Immediate" | "Scheduled"
  ): Promise<true | string>;
  public async doUpgradeDowngrade(
    accountId: string,
    customerId: number,
    requestedPackageId: number,
    action: "Immediate" | "Scheduled",
    hostname: string,
    username: string,
    password: string
  ): Promise<true | string>;
  public async doUpgradeDowngrade(
    accountId: string,
    customerId: number,
    requestedPackageId: number,
    action: "Immediate" | "Scheduled",
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<true | string> {
    return await this.events.emitEventAndReturn(
      "doUpgradeDowngrade",
      30,
      accountId,
      customerId,
      requestedPackageId,
      action,
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
  public async getRouters(): Promise<Array<APIRoutersResponse>>;
  public async getRouters(
    packageId: number
  ): Promise<Array<APIRoutersResponse>>;
  public async getRouters(
    packageId: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<Array<APIRoutersResponse>>;
  public async getRouters(
    packageId?: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APIRoutersResponse>> {
    return await this.events.emitEventAndReturn(
      "getRouters",
      30,
      packageId,
      hostname ?? this.customConfig.hostname,
      username ?? this.customConfig.username,
      password ?? this.customConfig.password
    );
  }
}
