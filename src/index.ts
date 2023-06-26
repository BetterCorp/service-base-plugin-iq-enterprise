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

export interface APICustomer {
  idcustomer: number;
  account: string;
  acc_type: string;
  name: string;
  aka: string;
  id_number: string;
  vat_nr: string;
  company_reg: string;
  acc_balance: AccBalance;
  pay_category: string;
  package: string;
  package_speed: string;
  package_value: string;
  current_usage: string;
  contact_main: string;
  phone_main: string;
  cell_numbers: CellNumber[];
  emails: Email[];
  address1: string;
  address2: string;
  atown: string;
  postal1: string;
  postal2: string;
  ptown: string;
  active: boolean;
}

export interface AccBalance {
  days_30: number;
  days_60_plus: number;
  current: number;
  total: number;
  status: boolean;
}

export interface CellNumber {
  contact: string;
  cell_number: string;
}

export interface Email {
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
  ): Promise<Array<APICustomer>>;
  getCustomerById(
    id: number,
    hostname?: string,
    username?: string,
    password?: string
  ): Promise<APICustomer>;
}
