export type TFarmerApplicationStatus = "pending" | "approved" | "rejected";

export interface IGetFarmerApplicationQuery {
  email?: string;
  status?: string;
}

export interface IFarmerApplication {
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

  status: TFarmerApplicationStatus;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateFarmerApplication {
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

export interface IUpdateFarmerApplication {
  phone?: string;
  nid?: string;

  district?: string;
  area?: string;
  address?: string;

  experience?: string;

  status?: TFarmerApplicationStatus;
}

export interface IFarmerApplicationResponse {
  success: boolean;
  message: string;
  data: IFarmerApplication;
}

export interface IFarmerApplicationsResponse {
  success: boolean;
  message: string;
  data: IFarmerApplication[];
}
