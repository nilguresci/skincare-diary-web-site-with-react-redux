export interface IProduct {
  productName: string;
  brandName: string;
  category: string;
}

export interface IRoutinInfo {
  product: IProduct;
  comment: string;
  takenAgain?: boolean;
  target: string;
  routinTime: boolean; //true:morning false:night
  frequency: string;
}

export interface IDiary {
  diary: IRoutinInfo[] | null; //birden fazla routin info tutulacak
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  userId: string; //diary i kayıt giren kullanıcının id'si // kullanıcı giriş yaptığında alınacak
}
