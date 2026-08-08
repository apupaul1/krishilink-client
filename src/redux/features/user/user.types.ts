export type TRole = "user" | "farmer" | "rider" | "admin";

export interface IUser {
  _id: string;

  name: string;
  email: string;
  photoURL: string;

  role: TRole;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  photoURL: string;
}

export interface IUpdateUser {
  name?: string;
  photoURL?: string;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export interface IUserRoleResponse {
  success: boolean;
  message: string;
  data: TRole;
}

export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
}
