import {
  ServicesBase,
  ServiceCallable,
  IPluginLogger,
} from "@bettercorp/service-base";
import {
  APIAuthRequest,
  APIAuthResponse,
  APICustomerAccount,
  APICustomerSpecific,
  IEmitAndReturn,
} from "../../index";
import { Axios, AxiosResponse } from "axios";
import { PluginConfig } from "./sec.config";
import { Tools } from "@bettercorp/tools";
import axios from "axios";

export interface AxiosInstance {
  hostname: string;
  username: string;
  instance: Axios;
  exp: number;
}
export class Service extends ServicesBase<
  ServiceCallable,
  ServiceCallable,
  IEmitAndReturn,
  ServiceCallable,
  ServiceCallable,
  PluginConfig
> {
  //private fastify: fastify;
  private _axios: Array<AxiosInstance> = [];
  constructor(
    pluginName: string,
    cwd: string,
    pluginCwd: string,
    log: IPluginLogger
  ) {
    super(pluginName, cwd, pluginCwd, log);
  }

  public override async init(): Promise<void> {
    const self = this;
    await this.onReturnableEvent(
      "getCustomersByEmail",
      async (a, b, c, d) =>
        await self.getCustomersByEmail(a, b as any, c as any, d as any)
    );
    await this.onReturnableEvent(
      "getSubAccountById",
      async (a, b, c, d) =>
        await self.getSubAccountById(a, b as any, c as any, d as any)
    );
    await this.onReturnableEvent(
      "getCustomerByAccountId",
      async (a, b, c, d) =>
        await self.getCustomerByAccountId(a, b as any, c as any, d as any)
    );
    await this.onReturnableEvent(
      "getSubAccountsByAccountId",
      async (a, b, c, d) =>
        await self.getSubAccountsByAccountId(a, b as any, c as any, d as any)
    );
  }

  private async getAxios(
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
    const config = await this.getPluginConfig();
    let axios: Axios;
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error("Invalid username");
      if (!Tools.isString(password)) throw new Error("Invalid password");
      axios = await this.getAxios(hostname, username, password);
    } else {
      axios = await this.getAxios(
        config.host,
        config.username,
        config.password
      );
    }
    return (
      await axios.get<Array<APICustomerAccount>>(
        `/api/portal/customer?email=${encodeURIComponent(email)}`
      )
    ).data;
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
    const config = await this.getPluginConfig();
    let axios: Axios;
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error("Invalid username");
      if (!Tools.isString(password)) throw new Error("Invalid password");
      axios = await this.getAxios(hostname, username, password);
    } else {
      axios = await this.getAxios(
        config.host,
        config.username,
        config.password
      );
    }
    const resp = await axios.get<APICustomerSpecific>(
      `/api/portal/customer/${id}`
    );
    if (resp.status == 404) return null;
    if (resp.status == 200) return resp.data;
    throw new Error(`Error ${resp.status}: ${resp.statusText} [${resp.data}]`);
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
    const config = await this.getPluginConfig();
    let axios: Axios;
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error("Invalid username");
      if (!Tools.isString(password)) throw new Error("Invalid password");
      axios = await this.getAxios(hostname, username, password);
    } else {
      axios = await this.getAxios(
        config.host,
        config.username,
        config.password
      );
    }
    const resp = await axios.get<APICustomerAccount>(
      `/api/portal/customer/account/${id}`
    );
    if (resp.status == 200 && resp.data.account !== null) return resp.data;
    if (resp.status == 200 && resp.data.account === null) return null;
    throw new Error(`Error ${resp.status}: ${resp.statusText} [${resp.data}]`);
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
    const config = await this.getPluginConfig();
    let axios: Axios;
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error("Invalid username");
      if (!Tools.isString(password)) throw new Error("Invalid password");
      axios = await this.getAxios(hostname, username, password);
    } else {
      axios = await this.getAxios(
        config.host,
        config.username,
        config.password
      );
    }
    return (
      await axios.get<Array<APICustomerSpecific>>(
        `/api/portal/customer/account/${id}/detail`
      )
    ).data;
  }
}
