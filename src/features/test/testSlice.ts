import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testService from "./testService";
type Brand = {
  BrandName: string;
  id: string;
  crueltyFree: string;
};
type Brands = {
  brands: Brand[];
  //   isError: boolean;
  //   isSuccess: boolean;
  //   isLoading: boolean;
  //   message: string;
};
//   BrandName: "brand 1",
//   id: "1",
//   crueltyFree: "Yes",
const initialState: any = {
  brands: [{ BrandName: "brand 1", id: "1", crueltyFree: "Yes" }],
  //   isError: false,
  //   isSuccess: false,
  //   isLoading: false,
  //   message: "",
};

export const getBrands: any = createAsyncThunk(
  "brand/getAll",
  async (_, thunkAPI) => {
    try {
      return await testService.getData();
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

export const brandsSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers: (builder) => {
    debugger;
    builder
      .addCase(getBrands.pending, (state: Brands) => {
        debugger;
        console.log("ok");
        return state;
      })
      .addCase(getBrands.fulfilled, (state: Brands, action: any) => {
        debugger;
        console.log("heyyyyyy");

        return (state.brands = action.payload);
      })
      .addCase(getBrands.rejected, (state: Brands, action: any) => {
        return console.log(action.payload);
      });
  },
});

export const { reset } = brandsSlice.actions;
export default brandsSlice.reducer;
