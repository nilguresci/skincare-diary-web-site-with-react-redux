import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";
type Brand = {
  BrandName: string;
  id: string;
  CrueltyFree: string;
};
type Brands = {
  brands: Brand[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
//    { BrandName: "brand 1", id: "1", CrueltyFree: "Yes" }
const initialState: Brands = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getBrands: any = createAsyncThunk(
  "brand/getAll",
  async (_, thunkAPI) => {
    try {
      return await brandService.getData();
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

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    reset: (state: Brands) => initialState,
  },
  extraReducers: (builder) => {
    debugger;
    builder
      .addCase(getBrands.pending, (state: Brands) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state: Brands, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state: Brands, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = brandSlice.actions;
export default brandSlice.reducer;
