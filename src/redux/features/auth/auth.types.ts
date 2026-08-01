export interface TUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface InitialState {
  user: TUser | null;
  loading: boolean;
}

