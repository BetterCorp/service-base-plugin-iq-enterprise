export { IQEnterprise } from "./clients/service-iq-enterprise/plugin";

export interface ServiceUsageData {
  timeSlot: number;
  downloadKBytes: number;
  uploadKBytes: number;
}

export interface APIServiceUsageResponse {
  data: ServiceUsageData[];
  tKBDownload: number;
  tKBUpload: number;
  tKBCombined: number;
}

export interface NewAPIApplication {
  description: string;
  tel: string;
  vatnr: string;
  address1: string;
  address2: string;
  atown: string;
  acode: string;
  postal1: string;
  postal2: string;
  ptown: string;
  pcode: string;
  contact: string;
  cell1: string;
  email1: string;
  cell2: string;
  email2: string;
  id: string;
  package: string;
  bank: string;
  bcode: string;
  baccount: string;
  btype: string;
}

export interface APIServicesResponse {
  idgroup: string;
  description: string;
  packages: APIServicesResponsePackage[];
}

export interface APIServicesResponsePackage {
  idpackage: number;
  package: string;
  webdescription: string;
  cost: number;
  download: number;
  upload: number;
  approve: boolean;
}

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
