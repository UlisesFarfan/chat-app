type UserOutput = {
  _id: string;
  name: string;
  organizations: any[];
  organization: string;
  phone: string;
};

export interface UserSignup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  authUser: UserOutput | null;
  loading: boolean;
  accessToken: string | null;
  logged: boolean;
  error: boolean | string;
}
