export {IQEnterprise} from "./plugins/service-iq-enterprise/client";

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
  debitorder: boolean;
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
  package: APICustomerSpecificPackage;
}

export interface APICustomerSpecificPackage {
  id: number;
  groupid: number;
  action: {
    id: number,
    groupid: number,
    actiondate: number,
    cancellation: boolean
  } | null
}

export interface APICustomerSpecific {
  idcustomer: number;
  account: string;
  description: string;
  aka: string;
  package: APICustomerSpecificPackage;
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
  latitude: number;
  longitude: number;
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

export type MergeTypes<TypesArray extends any[], Res = {}> =
    TypesArray extends [infer Head, ...infer Rem]
        ? MergeTypes<Rem, Res & Head>
        : Res;

export type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

export type OneOf<
    TypesArray extends any[],
    Res = never,
    AllProperties = MergeTypes<TypesArray>> =
    TypesArray extends [infer Head, ...infer Rem]
        ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
        : Res;

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Address = {
  address1: string;
  address2: string;
  atown: string;
  acode: string;
  coordinates: Coordinates;
};

export type Postal = {
  postal1: string;
  postal2: string;
  ptown: string;
  pcode: string;
};

export type Payment = {
  debitorder: boolean;
  bank: string;
  bcode: string;
  baccount: string;
  btype: string;
};

export type Cancel = {
  reason: string;
  cdate: string;
};

export type BaseApplicationCreated = {
  idapplication: Readonly<number>;
  uid: Readonly<string>;
}

export enum ApplicationType {
  New = 0,
  Addon = 1,
  Upgrade = 2,
  Downgrade = 3,
  Cancel = 4,
  Relocate = 5,
  DebitOrder = 6,
}

export type BaseApplicationDefault<PortalMeta = string> = {
  description: string;
  type: string;
  tel: string;
  vatnr: string;
  contact: string;
  cell1: string;
  email1: string;
  cell2: string;
  email2: string;
  id: string;
  portalmeta: PortalMeta | null;
  //apptype: ApplicationType;
};
export type BaseApplication<New extends boolean = false, PortalMeta = string> = New extends true
    ? BaseApplicationDefault
    : BaseApplicationCreated & BaseApplicationDefault<PortalMeta>;

export type NewApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.New : Readonly<ApplicationType.New>;
  address: Address;
  postal: Postal;
  package: string;
  //packageto: string;
  payment: Payment;
  account: string;
  // relocate: undefined;
  // cancel: undefined;
  // newbank: undefined;
};

export type AddonApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.Addon : Readonly<ApplicationType.Addon>;
  address: Address;
  postal: Postal;
  package: string;
  //packageto: string;
  account: string;
  // relocate: undefined;
  // cancel: undefined;
  // payment: undefined;
  // newbank: undefined;
};

export type UpgradeApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.Upgrade : Readonly<ApplicationType.Upgrade>;
  package: string;
  packageto: string;
  account: string;
  // address: undefined;
  // postal: undefined;
  // relocate: undefined;
  // cancel: undefined;
  // payment: undefined;
  // newbank: undefined;
};

export type DowngradeApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.Downgrade : Readonly<ApplicationType.Downgrade>;
  package: string;
  packageto: string;
  account: string;
  // address: undefined;
  // postal: undefined;
  // relocate: undefined;
  // cancel: undefined;
  // payment: undefined;
  // newbank: undefined;
};

export type CancelApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.Cancel : Readonly<ApplicationType.Cancel>;
  cancel: Cancel;
  account: string;
  package: string;
  //packageto: string;
  // address: undefined;
  // postal: undefined;
  // relocate: undefined;
  // payment: undefined;
  // newbank: undefined;
};

export type RelocateApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.Relocate : Readonly<ApplicationType.Relocate>;
  address: Address;
  relocate: Address;
  postal: Postal;
  account: string;
  package: string;
  //packageto: string;
  // cancel: undefined;
  // payment: undefined;
  // newbank: undefined;
};

export type DebitOrderApplication<New extends boolean = false, PortalMeta = string> =
    BaseApplication<New, PortalMeta>
    & {
  apptype: New extends false ? ApplicationType.DebitOrder : Readonly<ApplicationType.DebitOrder>;
  payment: Payment;
  newbank: Payment;
  account: string;
  package: string;
  //packageto: string;
  // address: undefined;
  // postal: undefined;
  // relocate: undefined;
  // cancel: undefined;
};

export type Application<New extends boolean = true, PortalMeta = string> =
    | NewApplication<New, PortalMeta>
    | AddonApplication<New, PortalMeta>
    | UpgradeApplication<New, PortalMeta>
    | DowngradeApplication<New, PortalMeta>
    | CancelApplication<New, PortalMeta>
    | RelocateApplication<New, PortalMeta>
    | DebitOrderApplication<New, PortalMeta>;
export type APIApplication<New extends boolean = true, PortalMeta = string> = OneOf<[
  NewApplication<New, PortalMeta>,
  AddonApplication<New, PortalMeta>,
  UpgradeApplication<New, PortalMeta>,
  DowngradeApplication<New, PortalMeta>,
  CancelApplication<New, PortalMeta>,
  RelocateApplication<New, PortalMeta>,
  DebitOrderApplication<New, PortalMeta>
]>;
