import { IProductCol, IProductsCol } from "./../../models/ProductColModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { ICategories, ICategory } from "../../models/CategoriesModel";

const initialState: IProductsCol = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProducts: any = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts2();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductsByBrand: any = createAsyncThunk(
  "product/getByBrand",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductsByBrand(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state: IProductsCol) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: IProductsCol) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: IProductsCol, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state: IProductsCol, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getProductsByBrand.pending, (state: IProductsCol) => {
        state.isLoading = true;
      })
      .addCase(
        getProductsByBrand.fulfilled,
        (state: IProductsCol, action: any) => {
          debugger;
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
        }
      )
      .addCase(
        getProductsByBrand.rejected,
        (state: IProductsCol, action: any) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
