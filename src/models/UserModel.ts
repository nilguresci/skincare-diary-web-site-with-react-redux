export interface IUser {
  name: string;
  email: string;
  password: string;
  password2?: string;
}

export interface IUserInitialInfo {
  user: IUser | any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  userId?: string;
}
