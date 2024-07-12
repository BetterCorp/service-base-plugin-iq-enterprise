import {
  BSBError,
  BSBPluginConfig,
  BSBPluginEvents,
  BSBService,
  BSBServiceConstructor,
  ServiceEventsBase,
} from "@bettercorp/service-base";
import {
  APIApplicationResponse,
  APIAuthRequest,
  APIAuthResponse,
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
  UpgradeDowngradeReequestInfo,
  UpgradeDowngradeResponseInfo,
  UpgradeDowngradeStatus,
  UpgradeDowngradeStatusTypes,
} from "../../index";
import {Axios, AxiosResponse} from "axios";
import {Tools} from "@bettercorp/tools/lib/Tools";
import axios from "axios";
import {secSchema} from "./sec-config";

export interface Events<Meta extends object>
    extends BSBPluginEvents {
  onEvents: ServiceEventsBase;
  emitEvents: ServiceEventsBase;
  onReturnableEvents: {
    getCustomersByEmail(
        email: string,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APICustomerAccount>>;
    getCustomerByAccountId(
        id: string,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<APICustomerAccount | null>;
    getSubAccountById(
        id: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<APICustomerSpecific | null>;
    getSubAccountsByAccountId(
        id: string,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APICustomerSpecific>>;
    coverageLookup(
        lat: number,
        lng: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<string>>;
    getServices(
        service?: string,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APIServicesResponse>>;
    getServicesInGroup(
        id: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<APIServicesResponse>;
    getServiceById(
        id: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<APIServicesResponsePackage>;
    newApplication(
        data: PartialNewAPIApplication<Meta>,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<string>;
    getApplications(
        email: string,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APIApplicationResponse<Meta>>>;
    updateApplication(
        applicationId: number,
        data: NewAPIApplication<Meta>,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<boolean>;
    getServiceUsageByAccount(
        id: string,
        month: number,
        year: number,
        day?: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<APIServiceUsageResponse>;
    getUpgradeDowngradeInfo(
        currentPackageId: number,
        requestedPackageId: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<UpgradeDowngradeInfo>;
    doUpgradeDowngrade(
        accountId: string,
        customerId: number,
        requestedPackageId: number,
        action: "Immediate" | "Scheduled",
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<true | string>;
    getRouters(
        packageId?: number,
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APIRoutersResponse>>;
    getBanks(
        hostname?: string,
        username?: string,
        password?: string,
    ): Promise<Array<APIBanksResponse>>;
  };
  emitReturnableEvents: ServiceEventsBase;
  onBroadcast: ServiceEventsBase;
  emitBroadcast: ServiceEventsBase;
}

export interface AxiosInstance {
  hostname: string;
  username: string;
  instance: Axios;
  exp: number;
}

export class Config
    extends BSBPluginConfig<typeof secSchema> {
  validationSchema = secSchema;

  migrate(
      toVersion: string,
      fromVersion: string | null,
      fromConfig: any | null,
  ) {
    return fromConfig;
  }
}

export class Plugin<Meta extends object = any>
    extends BSBService<
        Config,
        Events<Meta>
    > {
  initBeforePlugins?: string[] | undefined;
  initAfterPlugins?: string[] | undefined;
  runBeforePlugins?: string[] | undefined;
  runAfterPlugins?: string[] | undefined;
  methods = {};

  dispose?(): void;

  run?(): void | Promise<void>;

  //private fastify: fastify;
  private _axios: Array<AxiosInstance> = [];

  constructor(config: BSBServiceConstructor) {
    super(config);
  }

  public async init(): Promise<void> {
    await this.events.onReturnableEvent(
        "getCustomersByEmail",
        async (
            email: string,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          return (
              await axios.get<Array<APICustomerAccount>>(
                  `/api/portal/customer?email=${encodeURIComponent(email)}`,
              )
          ).data;
        },
    );
    const getCustomerById = async (
        id: number,
        hostname?: string,
        username?: string,
        password?: string,
    ) => {
      const axios: Axios = await this.getAxios(hostname, username, password);
      const resp = await axios.get<APICustomerSpecific>(
          `/api/portal/customer/${id}`,
      );
      if (resp.status == 404) {
        return null;
      }
      if (resp.status == 200) {
        return resp.data;
      }
      throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
      );
    };
    await this.events.onReturnableEvent(
        "getSubAccountById",
        async (
            id: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => await getCustomerById(id, hostname, username, password),
    );
    await this.events.onReturnableEvent(
        "getCustomerByAccountId",
        async (
            id: string,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<APICustomerAccount>(
              `/api/portal/customer/account/${encodeURIComponent(id)}`,
          );
          if (resp.status == 200 && resp.data.account !== null) {
            return resp.data;
          }
          if (resp.status == 200 && resp.data.account === null) {
            return null;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getSubAccountsByAccountId",
        async (
            id: string,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<APICustomerSpecific>>(
              `/api/portal/customer/account/${id}/detail`,
          );
          if (resp.status == 200 && Tools.isArray(resp.data)) {
            return resp.data;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "coverageLookup",
        async (
            lat: number,
            lng: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<string>>(
              `/api/portal/services/coverage?longitude=${encodeURIComponent(
                  lng,
              )}&latitude=${encodeURIComponent(lat)}`,
          );
          if (resp.status == 200 && Tools.isArray<string>(resp.data)) {
            return resp.data;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getServices",
        async (
            service?: string,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<APIServicesResponse>>(
              `/api/portal/services/${encodeURIComponent(
                  (
                      service ?? ""
                  ).toLowerCase(),
              )}`,
          );
          if (resp.status == 200) {
            return resp.data.map(x => {
              const returnObject: APIServicesResponse = {} as any;
              returnObject.idgroup = Number.parseInt(x.idgroup as unknown as string);
              returnObject.description = x.description;
              returnObject.packages = x.packages;
              returnObject.installcosts = x.installcosts;
              return returnObject;
            });
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getServicesInGroup",
        async (
            id: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<APIServicesResponse>(
              `/api/portal/services/group/${encodeURIComponent(id)}`,
          );
          if (resp.status == 200) {
            const returnObject: APIServicesResponse = {} as any;
            returnObject.idgroup = Number.parseInt(resp.data.idgroup as unknown as string);
            returnObject.description = resp.data.description;
            returnObject.packages = resp.data.packages;
            returnObject.installcosts = resp.data.installcosts;
            return returnObject;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    const getServiceById = async (
        id: number,
        hostname?: string,
        username?: string,
        password?: string,
    ) => {
      const axios: Axios = await this.getAxios(hostname, username, password);
      const resp = await axios.get<APIServicesResponsePackage>(
          `/api/portal/services/${encodeURIComponent(id)}`,
      );
      if (resp.status == 200) {
        return resp.data;
      }
      throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
      );
    };
    await this.events.onReturnableEvent(
        "getServiceById",
        async (
            id: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => getServiceById(id, hostname, username, password),
    );
    await this.events.onReturnableEvent(
        "newApplication",
        async (
            data: PartialNewAPIApplication<any>,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          (
              data as any
          ).portalmeta =
              data.meta !== null ? JSON.stringify(data.meta) : null;
          delete data.meta;
          (
              data as any
          ).debitorder = false;
          const resp = await axios.post<{
            uid?: string;
          }>(`/api/portal/application/create`, data);
          if (resp.status == 200) {
            if (Tools.isString(resp.data.uid)) {
              return resp.data.uid;
            }
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "updateApplication",
        async (
            applicationId: number,
            data: NewAPIApplication<any>,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          (
              data as any
          ).portalmeta =
              data.meta !== null ? JSON.stringify(data.meta) : null;
          delete data.meta;
          const resp = await axios.put<{}>(`/api/portal/application/update`, {
            idapplication: applicationId,
            ...data,
          });
          if (resp.status == 200) {
            return true;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getApplications",
        async (
            email: string,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<APIApplicationResponse<any>>>(
              `/api/portal/application/${encodeURIComponent(email)}`,
          );
          if (resp.status == 200 && resp.data) {
            return resp.data.map((d: any) => {
              d.meta = Tools.isString(d.portalmeta)
                       ? JSON.parse(d.portalmeta)
                       : null;
              delete d.portalmeta;
              return d;
            });
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getServiceUsageByAccount",
        async (
            id: string,
            month: number,
            year: number,
            day?: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const query: Record<string, string> = {
            month: `${year}${month < 10 ? `0${month}` : month}`,
          };
          if (Tools.isNumber(day)) {
            query.day = day.toFixed(0);
          }
          const resp = await axios.get<APIServiceUsageResponse>(
              `/api/portal/usage/${encodeURIComponent(
                  id,
              )}?${Object.keys(query)
                         .map(x => `${x}=${encodeURIComponent(query[x])}`)
                         .join("&")}`,
          );
          if (resp.status == 200) {
            return resp.data;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    const getUpgradeDowngradeInfo = async (
        currentPackageId: number,
        requestedPackageId: number,
        hostname?: string,
        username?: string,
        password?: string,
    ) => {
      const axios: Axios = await this.getAxios(hostname, username, password);
      const resp = await axios.get<UpgradeDowngradeReequestInfo>(
          `/api/portal/services/queryupdate?current=${currentPackageId}&requested=${requestedPackageId}`,
      );
      if (resp.status == 200 && Tools.isString(resp.data.status)) {
        const result = resp.data.status.toLowerCase();
        if (Object.keys(UpgradeDowngradeStatusTypes)
                  .indexOf(result) !== -1) {
          let dateAsEpoc = null;
          if (Tools.isString(resp.data.eta)) {
            const timeStr = "00:00:00";
            const timeZoneOffset = 2 * 60; // GMT+2 offset in minutes
            const dateTimeStr = `${resp.data.eta}T${timeStr}`;
            const asDate = new Date(dateTimeStr);
            asDate.setMinutes(asDate.getMinutes() + timeZoneOffset);
            dateAsEpoc = asDate.getTime();
          }
          if (Number.isNaN(dateAsEpoc)) {
            dateAsEpoc = null;
          }
          return {
            status: result as UpgradeDowngradeStatus,
            eta: dateAsEpoc,
          };
        }
      }
      throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
      );
    };
    await this.events.onReturnableEvent(
        "getUpgradeDowngradeInfo",
        async (
            currentPackageId: number,
            requestedPackageId: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) =>
            await getUpgradeDowngradeInfo(
                currentPackageId,
                requestedPackageId,
                hostname,
                username,
                password,
            ),
    );
    await this.events.onReturnableEvent(
        "doUpgradeDowngrade",
        async (
            accountId: string,
            customerId: number,
            requestedPackageId: number,
            action: "Immediate" | "Scheduled",
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const customer = await getCustomerById(
              customerId,
              hostname,
              username,
              password,
          );
          if (customer === null) {
            throw new BSBError("Customer not found by id ({id})", {
              id: customerId,
            });
          }
          if (customer.account !== accountId) {
            throw new BSBError(
                "Customer account id mismatch [{accountId}|{customerId}]",
                {
                  accountId,
                  customerId,
                },
            );
          }
          const upgradePossibility = await getUpgradeDowngradeInfo(
              customer.package.id,
              requestedPackageId,
              hostname,
              username,
              password,
          );
          if (upgradePossibility.status === "scheduled" && action === "Immediate") {
            throw new BSBError(
                "Scheduled upgrade/downgrade is required for this upgrade/downgrade [{accountId}|{customerId}] {currentPackage}->{requestedPackage}",
                {
                  accountId,
                  customerId,
                  currentPackage: customer.package.id,
                  requestedPackage: requestedPackageId,
                },
            );
          }
          /*if (upgradePossibility.status === "approve") {
           throw new BSBError(
           "Approval is required for this upgrade/downgrade [{accountId}|{customerId}] {currentPackage}->{requestedPackage}",
           {
           accountId,
           customerId,
           currentPackage: customer.package.id,
           requestedPackage: requestedPackageId,
           },
           );
           }*/
          const requestedPackage = await getServiceById(
              requestedPackageId,
              hostname,
              username,
              password,
          );
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.put<UpgradeDowngradeResponseInfo>(
              `/api/portal/services/${accountId}/update?customerid=${customerId}&packageName=${encodeURIComponent(
                  requestedPackage.package,
              )}&packageid=${requestedPackageId}&action=${
                  action
              }`,
          );
          if (resp.status == 200 && resp.data.status === "Success") {
            return true;
          }
          if (Tools.isString(resp.data.message)) {
            return resp.data.message;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getRouters",
        async (
            packageId?: number,
            hostname?: string,
            username?: string,
            password?: string,
        ) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<APIRoutersResponse>>(
              `/api/portal/services/routers${
                  Tools.isNumber(packageId) ? `/${packageId}` : ""
              }`,
          );
          if (resp.status == 200 && resp.data) {
            return resp.data;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
    await this.events.onReturnableEvent(
        "getBanks",
        async (hostname?: string, username?: string, password?: string) => {
          const axios: Axios = await this.getAxios(hostname, username, password);
          const resp = await axios.get<Array<APIBanksResponse>>(
              `/api/portal/banks`,
          );
          if (resp.status == 200 && resp.data) {
            return resp.data;
          }
          throw new Error(
              `Error ${resp.status}: ${resp.statusText} [${resp.data}]`,
          );
        },
    );
  }

  private async getAxios(
      hostname?: string,
      username?: string,
      password?: string,
  ): Promise<Axios> {
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) {
        throw new Error("Invalid username");
      }
      if (!Tools.isString(password)) {
        throw new Error("Invalid password");
      }
      return await this.getAxiosInstance(hostname, username, password);
    }
    if (Tools.isNullOrUndefined(this.config)) {
      throw new BSBError("Invalid config", {});
    }

    return await this.getAxiosInstance(
        this.config.host,
        this.config.username,
        this.config.password,
    );
  }

  private async getToken(instance: Axios, username: string, password: string) {
    const resp = await instance.post<
        APIAuthRequest,
        AxiosResponse<APIAuthResponse>
    >("/api/auth/login", {
      user: username,
      password,
    });
    if (resp.status !== 200) {
      throw new Error("Invalid response");
    }
    return resp.data.tokenstring;
  }

  private async getAxiosInstance(
      hostname: string,
      username: string,
      password: string,
      cleanup: boolean = false,
  ): Promise<Axios> {
    const now = new Date().getTime();
    if (cleanup) {
      for (let i = 0 ; i < this._axios.length ; i++) {
        if (this._axios[i].hostname !== hostname) {
          continue;
        }
        if (this._axios[i].username !== username) {
          continue;
        }
        this._axios.splice(i, 1);
      }
    }
    for (let i = 0 ; i < this._axios.length ; i++) {
      if (this._axios[i].hostname !== hostname) {
        continue;
      }
      if (this._axios[i].username !== username) {
        continue;
      }
      if (this._axios[i].exp < now) {
        this._axios.splice(i, 1);
        break;
      }
      return this._axios[i].instance;
    }
    const instance = axios.create({
      //baseURL: hostname,
      headers: {},
    });
    instance.defaults.baseURL = hostname;
    instance.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${await this.getToken(instance, username, password)}`;
    const self = this;
    instance.interceptors.response.use(
        (response) => response,
        async function (error) {
          const {config} = error;

          if (!config || config.retry === true || !error.response) {
            return Promise.reject(error);
          }

          if (error.response.status !== 401 && error.response.status !== 403) {
            return Promise.reject(error);
          }

          config.retry = true;
          try {
            instance.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${await self.getToken(instance, username, password)}`;
            for (let i = 0 ; i < self._axios.length ; i++) {
              if (self._axios[i].hostname !== hostname) {
                continue;
              }
              if (self._axios[i].username !== username) {
                continue;
              }
              self._axios[i].exp = new Date().getTime() + 4 * 60 * 1000;
              break;
            }

            return instance(config);
          }
          catch (e: any) {
            self.log.error(e.message ?? e, {});
          }
          // Do something with response error
          return Promise.reject(error);
        },
    );
    this._axios.push({
      hostname,
      username,
      instance,
      exp: new Date().getTime() + 4 * 60 * 1000,
    });
    return instance;
  }
}
