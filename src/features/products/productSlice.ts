import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

type Category = {
  categoryId: string;
  displayName: string;
  hasChildCategories?: boolean;
  hasDropdownMenu?: boolean;
  selectedThumbImage?: string;
  showInAppJaBsDropdown?: boolean;
  targetUrl?: string;
  thumbImage?: string;
  megaNavMarketingBanner?: object;
};

type Categories = {
  categories: Category[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
const initialState: Categories = {
  categories: null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};
//get categories
// export const getCategories: any = createAsyncThunk(
//   "products/getCategories",
//   async (_, thunkAPI) => {
//     try {
//       return productService.getProductCategories();
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

//get categories
export const getCategories: any = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    debugger;
    try {
      return await productService.getProductCategories();
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

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCat: (state: any) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get diaries işlemi için
      .addCase(getCategories.pending, (state: any) => {
        console.log("cat pending");
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state: any, action: any) => {
        debugger;
        console.log("cat fulfilled");
        state.isLoading = false;
        state.isSuccess = true;
        console.log("22222", action.payload);
        state.cats = action.payload;
      })
      .addCase(getCategories.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { resetCat } = categorySlice.actions;
export default categorySlice.reducer;
