import {BSBService, BSBServiceClient} from "@bettercorp/service-base";
import {
  APIApplicationResponse,
  APIBanksResponse,
  APICustomerAccount,
  APICustomerSpecific,
  APIRoutersResponse,
  APIServiceUsageResponse,
  APIServicesResponse,
  APIServicesResponsePackage,
  NewAPIApplication,
  PartialNewAPIApplication,
  UpgradeDowngradeInfo,
} from "../../index";
import {Plugin} from "./plugin";

export class IQEnterprise<
    Meta extends object
>
    extends BSBServiceClient<Plugin> {
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
      password?: string,
  ) {
    super(context);
    this.customConfig.hostname = hostname;
    this.customConfig.username = username;
    this.customConfig.password = password;
  }

  public async getCustomersByEmail(
      email: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APICustomerAccount>> {
    return await this.events.emitEventAndReturn(
        "getCustomersByEmail",
        30,
        email,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getCustomersByPhone(
      phone: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APICustomerAccount>> {
    return await this.events.emitEventAndReturn(
        "getCustomersByPhone",
        30,
        phone,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getSubAccountById(
      id: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<APICustomerSpecific | null> {
    return await this.events.emitEventAndReturn(
        "getSubAccountById",
        30,
        id,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getCustomerByAccountId(
      id: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<APICustomerAccount | null> {
    return await this.events.emitEventAndReturn(
        "getCustomerByAccountId",
        30,
        id,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getSubAccountsByAccountId(
      id: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APICustomerSpecific>> {
    return await this.events.emitEventAndReturn(
        "getSubAccountsByAccountId",
        30,
        id,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async coverageLookup(
      lat: number,
      lng: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<string>> {
    return await this.events.emitEventAndReturn(
        "coverageLookup",
        30,
        lat,
        lng,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getServices(
      service?: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APIServicesResponse>> {
    return await this.events.emitEventAndReturn(
        "getServices",
        30,
        service,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getServicesInGroup(
      id: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<APIServicesResponse> {
    return await this.events.emitEventAndReturn(
        "getServicesInGroup",
        30,
        id,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getServiceById(
      id: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<APIServicesResponsePackage> {
    return await this.events.emitEventAndReturn(
        "getServiceById",
        30,
        id,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async newApplication(
      data: PartialNewAPIApplication<Meta>,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<string> {
    return await this.events.emitEventAndReturn(
        "newApplication",
        30,
        data,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async updateApplication(
      applicationId: number,
      data: NewAPIApplication<Meta>,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<boolean> {
    return await this.events.emitEventAndReturn(
        "updateApplication",
        30,
        applicationId,
        data,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getApplications(
      email: string,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APIApplicationResponse<Meta>>> {
    return await this.events.emitEventAndReturn(
        "getApplications",
        30,
        email,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getServiceUsageBySubAccount(
      subAccountId: string,
      month: number,
      year: number,
      day?: number,
      hostname?: string,
      username?: string,
      password?: string,
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
        password ?? this.customConfig.password,
    );
  }

  public async getUpgradeDowngradeInfo(
      currentPackageId: number,
      requestedPackageId: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<UpgradeDowngradeInfo> {
    return await this.events.emitEventAndReturn(
        "getUpgradeDowngradeInfo",
        30,
        currentPackageId,
        requestedPackageId,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async doUpgradeDowngrade(
      accountId: string,
      customerId: number,
      requestedPackageId: number,
      action: "Immediate" | "Scheduled",
      hostname?: string,
      username?: string,
      password?: string,
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
        password ?? this.customConfig.password,
    );
  }

  public async getRouters(
      packageId?: number,
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APIRoutersResponse>> {
    return await this.events.emitEventAndReturn(
        "getRouters",
        30,
        packageId,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }

  public async getBanks(
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Array<APIBanksResponse>> {
    return await this.events.emitEventAndReturn(
        "getBanks",
        30,
        hostname ?? this.customConfig.hostname,
        username ?? this.customConfig.username,
        password ?? this.customConfig.password,
    );
  }
}
