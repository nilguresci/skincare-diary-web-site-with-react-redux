import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { ICategories, ICategory } from "../../models/CategoriesModel";

const initialState: any = {
  categories: [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//get categories
export const getCategories: any = createAsyncThunk(
  "categorys/getAll",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
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
  name: "category",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //get diaries işlemi için
      .addCase(getCategories.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
