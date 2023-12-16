export { IQEnterpriseClient } from "./clients/service-iq-enterprise/plugin";

/*
// tslint:disable-next-line: max-line-length
export function webRequest(server: IServerConfig, basePath: string, path: string, method: string, params: Object | undefined = undefined, data: Object | undefined = undefined, additionalProps: Object | undefined = undefined) {
  return new Promise(async (resolve, reject) => {
    let newParams: Object = {};
    if (params !== undefined && params !== null) {
      newParams = params;
    }

    const url = `${ server.hostname }${ basePath }${ path }`;
    AXIOS({
      //timeout: 5000,
      url,
      params: newParams,
      method,
      data,
      headers: {
        'X-Auth-App-Key': server.key,
      },
      ...(additionalProps || {})
    }).then((x: any) => additionalProps !== undefined ? resolve(x) : resolve(x.data)).catch((e: any) => {
      console.error(e);
      reject(e);
    });
  });
}*/

export interface APICustomerAccount {
  account: string;
  name: string;
  trading_as: string;
  contact: string;
  sub_accounts: APICustomerSubAccount[];
}

export interface APICustomerSubAccount {
  idcustomer: number;
  account: string;
  description: string;
  address: string;
}

export interface APICustomerSpecific {
  idcustomer: number;
  account: string;
  description: string;
  aka: string;
  package: {
    id: number;
    groupid: number;
  };
  value: string;
  speed: string;
  status: string;
  branch: string;
  contact: string;
  telephone: string;
  cell_numbers: APICustomerSpecificCellNumber[];
  emails: APICustomerSpecificEmail[];
  address1: string;
  address2: string;
  atown: string;
  postal1: string;
  postal2: string;
  ptown: string;
}

export interface APICustomerSpecificCellNumber {
  contact: string;
  cell_number: string;
}

export interface APICustomerSpecificEmail {
  email: string;
}

export interface APIAuthResponse {
  idtechnician: number;
  tokenstring: string;
}
export interface APIAuthRequest {
  username: string;
  password: string;
}
