import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import diaryService from "./diaryService";
import productService from "../products/productService";
import categoryService from "../categories/categoryService";
import { ICategories, ICategory } from "../../models/CategoriesModel";
import { IDiary, IRoutinInfo, IProduct } from "../../models/DiaryModels";

const localStorageData = localStorage.getItem("user");
const initialState: IDiary = {
  diary: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userId: localStorageData ? JSON.parse(localStorageData) : null,
  categories: [],
  products: [],
};

//keep diary
export const keepDiary = createAsyncThunk(
  "diarys/keep",
  async (diaryData: IDiary, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await diaryService.keepDiary(diaryData);
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

//update diary - when user added a new product to diary for today
export const updateDiary = createAsyncThunk(
  "diarys/update",
  async (diaryData: IDiary, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await diaryService.updateDiary(diaryData);
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

//get user diaries
export const getMyDiaries: any = createAsyncThunk(
  "diarys/getAll",
  async (_, thunkAPI) => {
    try {
      return await diaryService.getDiaries();
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

//get categories
export const getCategories: any = createAsyncThunk(
  "diarys/getCategories",
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

//get products by category id
export const getProductsWithId: any = createAsyncThunk(
  "diarys/getProducts",
  async (id: string, thunkAPI) => {
    try {
      return await categoryService.getProductsWithId(id);
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

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    reset: (state: IDiary) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // keep diary işlemi için
      .addCase(keepDiary.pending, (state: IDiary) => {
        state.isLoading = true;
      })
      .addCase(keepDiary.fulfilled, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diary = action.payload.diary; // state.diary dizisine e buradaki değer eklenmeli, düzeltilecek
      })
      .addCase(keepDiary.rejected, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      // get diaries işlemi için
      .addCase(getMyDiaries.pending, (state: IDiary) => {
        state.isLoading = true;
      })
      .addCase(getMyDiaries.fulfilled, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diary = action.payload;
      })
      .addCase(getMyDiaries.rejected, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      // update diary işlemi için
      .addCase(updateDiary.pending, (state: IDiary) => {
        state.isLoading = true;
      })
      .addCase(updateDiary.fulfilled, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        //console.log(action.payload);
        state.diary = action.payload;
      })
      .addCase(updateDiary.rejected, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      //get categories işlemi için
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
      })
      //get products by id işlemi için
      .addCase(getProductsWithId.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getProductsWithId.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("state products", action);
        state.products = action.payload;
      })
      .addCase(getProductsWithId.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = diarySlice.actions;
export default diarySlice.reducer;
