import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { ICategories, ICategory } from "../../models/CategoriesModel";

type Category = {
  id: string;
  categoryName: string;
  //categoryId: string;
  // displayName: string;
  // hasChildCategories?: boolean;
  // hasDropdownMenu?: boolean;
  // selectedThumbImage?: string;
  // showInAppJaBsDropdown?: boolean;
  // targetUrl?: string;
  // thumbImage?: string;
  // megaNavMarketingBanner?: object;
};

type Categories = {
  categories: [] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
const initialState: ICategories = {
  categories: [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};
//get categories
export const getCategories: any = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      debugger;
      return await productService.getProductCategories2();
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
  name: "product",
  initialState,
  reducers: {
    reset: (state: ICategories) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state: ICategories) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state: ICategories, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state: ICategories, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
