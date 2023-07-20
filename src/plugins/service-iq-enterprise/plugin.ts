import {
  ServicesBase,
  ServiceCallable,
  IPluginLogger,
} from "@bettercorp/service-base";
import {
  APIAuthRequest,
  APIAuthResponse,
  APICustomerAccount,
  APICustomerSubAccount,
  IEmitAndReturn,
} from "../../index";
import { Axios, AxiosResponse } from "axios";
import { PluginConfig } from "./sec.config";
import { Tools } from "@bettercorp/tools";

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
  private axios: Array<AxiosInstance> = [];
  constructor(
    pluginName: string,
    cwd: string,
    pluginCwd: string,
    log: IPluginLogger
  ) {
    super(pluginName, cwd, pluginCwd, log);
  }

  private async getAxios(
    hostname: string,
    username: string,
    password: string
  ): Promise<Axios> {
    const now = new Date().getTime() - 5 * 1000;
    for (let i = 0; i < this.axios.length; i++) {
      if (this.axios[i].hostname !== hostname) continue;
      if (this.axios[i].username !== username) continue;
      if (this.axios[i].exp < now) {
        this.axios.splice(i, 1);
        break;
      }
      return this.axios[i].instance;
    }
    const instance = new Axios({
      baseURL: hostname,
    });
    const resp = await new Axios().post<
      APIAuthRequest,
      AxiosResponse<APIAuthResponse>
    >(`${hostname}/api/auth/login`, {
      username,
      password,
    });
    if (resp.status !== 200) throw new Error("Invalid response");
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resp.data.tokenstring}`;
    this.axios.push({
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
        `/api/portal/customer?email${encodeURIComponent(email)}`
      )
    ).data;
  }

  public async getCustomerAccountById(
    id: number
  ): Promise<APICustomerSubAccount>;
  public async getCustomerAccountById(
    id: number,
    hostname: string,
    username: string,
    password: string
  ): Promise<APICustomerSubAccount>;
  public async getCustomerAccountById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerSubAccount> {
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
      await axios.get<APICustomerSubAccount>(`/api/portal/customer/${id}`)
    ).data;
  }

  /*public async getCustomerById(id: number): Promise<APICustomer>
  public async getCustomerById(id: number, hostname: string, username: string, password: string): Promise<APICustomer>
  public async getCustomerById(id: number, hostname?: string, username?: string, password?: string): Promise<APICustomer> {
    throw new Error('Not implemented');
    / *const config = await this.getPluginConfig();
    let axios: Axios;
    if (Tools.isString(hostname)) {
      if (!Tools.isString(username)) throw new Error('Invalid username');
      if (!Tools.isString(password)) throw new Error('Invalid password');
      axios = await this.getAxios(hostname, username, password);
    } else {
      axios = await this.getAxios(config.host, config.username, config.password);
    }
    return (await axios.get<Array<APICustomer>>(`/api/portal/customer?email${encodeURIComponent(email)}`)).data;* /
  }*/
}
