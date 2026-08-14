export type TFarmerStatus = "pending" | "approved" | "rejected";

export interface IGetFarmerQuery {
  email?: string;
  status?: string;
}

export interface IFarmer {
  _id: string;

  name: string;
  email: string;
  photoURL: string;

  phone: string;
  nid: string;

  district: string;
  area: string;
  address: string;

  farmTypes: string[];

  experience: number;

  about?: string;

  status: TFarmerStatus;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateFarmer {
  name: string;
  email: string;
  photoURL: string;

  phone: string;
  nid: string;

  district: string;
  area: string;
  address: string;

  farmTypes: string[];

  experience: number;

  about?: string;
}

export interface IUpdateFarmer {
  phone?: string;
  nid?: string;

  district?: string;
  area?: string;
  address?: string;

  experience?: string;

  status?: TFarmerStatus;
}

export interface IFarmerResponse {
  success: boolean;
  message: string;
  data: IFarmer;
}

export interface IFarmersResponse {
  success: boolean;
  message: string;
  data: IFarmer[];
}
