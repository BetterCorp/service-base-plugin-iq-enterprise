import {
  BSBError,
  BSBService,
  BSBServiceConstructor,
  BSBServiceTypes,
  ServiceEventsBase,
} from "@bettercorp/service-base";
import {
  APIAuthRequest,
  APIAuthResponse,
  APICustomerAccount,
  APICustomerSpecific,
  APIServiceUsageResponse,
  APIServicesResponse,
  APIServicesResponsePackage,
  NewAPIApplication,
} from "../../index";
import { Axios, AxiosResponse } from "axios";
import { Config } from "./sec-config";
import { Tools } from "@bettercorp/tools";
import axios from "axios";

export const CoverageServiceTypes = {
  trufibre: "trufibre",
  skyfibre: "skyfibre",
  wireless: "wireless",
  none: "none",
};
export type CoverageService =
  (typeof CoverageServiceTypes)[keyof typeof CoverageServiceTypes];

export interface ServiceTypes extends BSBServiceTypes {
  onEvents: ServiceEventsBase;
  emitEvents: ServiceEventsBase;
  onReturnableEvents: ServiceEventsBase;
  emitReturnableEvents: {
    getCustomersByEmail(
      email: string,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<Array<APICustomerAccount>>;
    getCustomerByAccountId(
      id: string,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<APICustomerAccount | null>;
    getSubAccountById(
      id: number,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<APICustomerSpecific | null>;
    getSubAccountsByAccountId(
      id: string,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<Array<APICustomerSpecific>>;
    coverageLookup(
      lat: number,
      lng: number,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<CoverageService>;
    getServices(
      service?: CoverageService,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<Array<APIServicesResponse>>;
    getServicesInGroup(
      id: number,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<APIServicesResponse>;
    getServiceById(
      id: number,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<APIServicesResponsePackage>;
    createNewApplication(
      data: NewAPIApplication,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<number>;
    getServiceUsageByAccount(
      id: string,
      month: number,
      year: number,
      day?: number,
      hostname?: string,
      username?: string,
      password?: string
    ): Promise<APIServiceUsageResponse>;
  };
  onBroadcast: ServiceEventsBase;
  emitBroadcast: ServiceEventsBase;
  methods: ServiceEventsBase;
}

export interface AxiosInstance {
  hostname: string;
  username: string;
  instance: Axios;
  exp: number;
}
export class Plugin extends BSBService<Config, ServiceTypes> {
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
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        return (
          await axios.get<Array<APICustomerAccount>>(
            `/api/portal/customer?email=${encodeURIComponent(email)}`
          )
        ).data;
      }
    );
    await this.events.onReturnableEvent(
      "getSubAccountById",
      async (
        id: number,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<APICustomerSpecific>(
          `/api/portal/customer/${id}`
        );
        if (resp.status == 404) return null;
        if (resp.status == 200) return resp.data;
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "getCustomerByAccountId",
      async (
        id: string,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<APICustomerAccount>(
          `/api/portal/customer/account/${encodeURIComponent(id)}`
        );
        if (resp.status == 200 && resp.data.account !== null) return resp.data;
        if (resp.status == 200 && resp.data.account === null) return null;
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "getSubAccountsByAccountId",
      async (
        id: string,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<APICustomerAccount>(
          `/api/portal/customer/account/${id}/detail`
        );
        if (resp.status == 200 && resp.data.account !== null) return resp.data;
        if (resp.status == 200 && resp.data.account === null) return null;
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "coverageLookup",
      async (
        lat: number,
        lng: number,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<{
          result: string;
        }>(
          `/api/portal/coverage/coords?longitude=${encodeURIComponent(
            lng
          )}&latitude=${encodeURIComponent(lat)}`
        );
        if (resp.status == 200 && Tools.isString(resp.data.result)) {
          const result = resp.data.result.toLowerCase();
          if (Object.keys(CoverageServiceTypes).indexOf(result) !== -1) {
            return result as CoverageService;
          }
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "getServices",
      async (
        service?: CoverageService,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<Array<APIServicesResponse>>(
          `/api/portal/services${encodeURIComponent(service ?? "")}`
        );
        if (resp.status == 200) {
          return resp.data;
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "getServicesInGroup",
      async (
        id: number,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<APIServicesResponse>(
          `/api/portal/services/group/${encodeURIComponent(id)}`
        );
        if (resp.status == 200) {
          return resp.data;
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "getServiceById",
      async (
        id: number,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.get<APIServicesResponsePackage>(
          `/api/portal/services/package/${encodeURIComponent(id)}`
        );
        if (resp.status == 200) {
          return resp.data;
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
    await this.events.onReturnableEvent(
      "createNewApplication",
      async (
        data: NewAPIApplication,
        hostname?: string,
        username?: string,
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        const resp = await axios.post<{
          message: string; // "Applcation Created: id=26026"
        }>(`/api/application`, data);
        if (resp.status == 200) {
          const match = resp.data.message.match(/id=(\d+)/);
          if (match !== null) {
            return parseInt(match[1]);
          }
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
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
        password?: string
      ) => {
        const axios: Axios = await this.getAxios(hostname, username, password);
        let resp: AxiosResponse<APIServiceUsageResponse>;
        if (Tools.isNumber(day)) {
          resp = await axios.get<APIServiceUsageResponse>(
            `/api/portal/usage/${encodeURIComponent(
              id
            )}?month=${encodeURIComponent(year)}${encodeURIComponent(
              month
            )}&day=${encodeURIComponent(day)}`
          );
        } else {
          resp = await axios.get<APIServiceUsageResponse>(
            `/api/portal/usage/${encodeURIComponent(
              id
            )}?month=${encodeURIComponent(year)}${encodeURIComponent(month)}`
          );
        }
        if (resp.status == 200) {
          return resp.data;
        }
        throw new Error(
          `Error ${resp.status}: ${resp.statusText} [${resp.data}]`
        );
      }
    );
  }

  private async getAxios(
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Axios> {
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error("Invalid username");
      if (!Tools.isString(password)) throw new Error("Invalid password");
      return await this.getAxiosInstance(hostname, username, password);
    }
    if (Tools.isNullOrUndefined(this.config))
      throw new BSBError("Invalid config", {});

    return await this.getAxiosInstance(
      this.config.host,
      this.config.username,
      this.config.password
    );
  }

  private async getAxiosInstance(
    hostname: string,
    username: string,
    password: string
  ): Promise<Axios> {
    const now = new Date().getTime() - 5 * 1000;
    for (let i = 0; i < this._axios.length; i++) {
      if (this._axios[i].hostname !== hostname) continue;
      if (this._axios[i].username !== username) continue;
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
    const resp = await instance.post<
      APIAuthRequest,
      AxiosResponse<APIAuthResponse>
    >("/api/auth/login", {
      user: username,
      password,
    });
    if (resp.status !== 200) throw new Error("Invalid response");
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resp.data.tokenstring}`;
    this._axios.push({
      hostname,
      username,
      instance,
      exp: new Date().getTime() + 5 * 60 * 1000,
    });
    return instance;
  }
}
