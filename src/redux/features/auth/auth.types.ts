export interface TUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface InitialState {
  user: TUser | null;
  loading: boolean;
}

