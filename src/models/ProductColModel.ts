export interface IProductCol {
  ProductName: string;
  BrandID: string;
  CategoryName: string;
  ID?: string;
}

export interface IProductsCol {
  products: IProductCol[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
