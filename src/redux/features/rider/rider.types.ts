export type TRiderStatus = "pending" | "approved" | "rejected";

export interface IGetRiderQuery {
  email?: string;
  status?: string;
  workStatus?: string;
  district?: string;
  area?: string;
}

export interface ICreateRider {
  name: string;
  email: string;
  photoURL: string;
  district: string;
  area: string;
  address: string;
  drivingLicense: string;
  nid: string;
  bike: string;
}

export interface IRider extends ICreateRider {
  _id: string;
  status: TRiderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateRider {
  phone?: string;
  nid?: string;

  district?: string;
  area?: string;
  address?: string;

  experience?: string;

  status?: TRiderStatus;
}

export interface IRiderResponse {
  success: boolean;
  message: string;
  data: IRider;
}

export interface IRidersResponse {
  success: boolean;
  message: string;
  data: IRider[];
}
