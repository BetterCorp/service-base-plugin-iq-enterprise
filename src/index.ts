export { IQEnterprise } from "./plugins/service-iq-enterprise/client";

export interface ServiceUsageData {
  timeSlot: number;
  downloadKBytes: number;
  uploadKBytes: number;
}

export const CoverageServiceTypes = {
  trufibre: "trufibre",
  skyfibre: "skyfibre",
  wireless: "wireless",
  none: "none",
};
export type CoverageService =
  (typeof CoverageServiceTypes)[keyof typeof CoverageServiceTypes];

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
