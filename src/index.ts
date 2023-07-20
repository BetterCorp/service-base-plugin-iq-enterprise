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
  package: string;
  value: string;
  speed: string;
  status: string;
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

export interface IEmitAndReturn {
  getCustomersByEmail(
    email: string,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<Array<APICustomerAccount>>;
  /*getCustomerById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerAccount>; */ 
  getCustomerAccountById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomerSpecific>;
}
