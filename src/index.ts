export { IQEnterprise } from "./plugins/service-iq-enterprise/client";

export type ServiceStatus = 'Active' | 'Suspended' | 'Inactive';

export interface ServiceUsageData {
  timeSlot: number;
  downloadKBytes: number;
  uploadKBytes: number;
}

export const UpgradeDowngradeInfoStatusTypes = {
  Scheduled: "Scheduled",
  Immediate: "Immediate",
  Approve: "Approve",
};
export type UpgradeDowngradeInfoStatus =
  (typeof UpgradeDowngradeInfoStatusTypes)[keyof typeof UpgradeDowngradeInfoStatusTypes];

export const UpgradeDowngradeStatusTypes = {
  scheduled: "scheduled",
  immediate: "immediate",
  approve: "approve",
};
export type UpgradeDowngradeStatus =
  (typeof UpgradeDowngradeStatusTypes)[keyof typeof UpgradeDowngradeStatusTypes];

export interface UpgradeDowngradeReequestInfo {
  status: UpgradeDowngradeInfoStatus;
  eta: string;
}

export interface UpgradeDowngradeInfo {
  status: UpgradeDowngradeStatus;
  eta: number | null;
}
export interface UpgradeDowngradeResponseInfo {
  status: "Success" | "Failed";
  message: string;
}

export interface APIServiceUsageResponse {
  data: ServiceUsageData[];
  tKBDownload: number;
  tKBUpload: number;
  tKBCombined: number;
}

export type NewAPIApplicationBase<Meta extends object> = {
  meta: Meta | null;
  description: string;
  email1: string;
  type: "Business" | "Residential";
};
export type NewAPIApplicationBaseApplication = {
  idapplication: number;
  uid: string;
  debitorder: boolean;
};
export type NewAPIApplicationBaseBank = {
  bank: string;
  bcode: string;
  baccount: string;
  btype: "Savings" | "Cheque" | "Transmission" | "Credit" | "Checking";
};
export type NewAPIApplicationBaseGPS = {
  latitude: number;
  longitude: number;
};
export type NewAPIApplicationBaseBilling = {
  address1: string;
  address2: string;
  atown: string;
  acode: string;
  cell1: string;
  contact: string;
};
export type NewAPIApplicationBasePostal = {
  postal1: string;
  postal2: string;
  ptown: string;
  pcode: string;
  cell2: string;
  email2: string;
};
export type NewAPIApplicationBaseDetails = {
  tel: string;
  vatnr: string;
  id: string;
  package: string;
} & NewAPIApplicationBaseBank &
  NewAPIApplicationBaseGPS &
  NewAPIApplicationBaseBilling &
  NewAPIApplicationBasePostal;
export type NewAPIApplication<Meta extends object> =
  NewAPIApplicationBaseDetails & NewAPIApplicationBase<Meta>;

export type PartialNewAPIApplication<Meta extends object> =
  Partial<NewAPIApplicationBaseDetails> & NewAPIApplicationBase<Meta>;

export type UpdateNewAPIApplication<Meta extends object> =
  NewAPIApplicationBaseDetails &
    NewAPIApplicationBase<Meta> &
    NewAPIApplicationBaseApplication;

export type APIApplicationResponse<Meta extends object> =
  Partial<NewAPIApplicationBaseDetails> &
    NewAPIApplicationBase<Meta> &
    NewAPIApplicationBaseApplication;

export interface APIServicesResponse {
  idgroup: number;
  description: string;
  packages: APIServicesResponsePackage[];
  installcosts: Array<APIServicesResponseInstallCost>;
}

export interface APIServicesResponseInstallCost {
  description: string;
  new: boolean;
  upgrade: boolean;
  cost: number;
}

export interface APIServicesResponsePackage {
  idpackage: number;
  package: string;
  webdescription: string;
  cost: number;
  download: number;
  upload: number;
  approve: boolean;
  discountrouter: boolean;
  discountinstall: boolean;
  installcost: number;
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
  status: ServiceStatus;
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
  status: ServiceStatus;
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

export interface APIRoutersResponse {
  idrouter: number;
  make: string;
  model: string;
  sku: string;
  cost: number;
  calcprice: number;
  ports: string;
  wrange: string;
  wspeed: string;
}
export interface APIBanksResponse {
  bank: string;
  code: string;
}
