import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import diaryService from "./diaryService";

type Product = {
  productName: string;
  brandName: string;
  category: string;
};

type routinInfo = {
  product: Product;
  comment: string;
  takenAgain?: boolean;
  target: string;
  routinTime: boolean; //true:morning false:night
  frequency: string;
};

type diary = {
  diary: routinInfo | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: diary = {
  diary: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//keep diary
export const keepDiary = createAsyncThunk(
  "diarys/keep",
  async (diaryData: diary, thunkAPI) => {
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

//get user diaries
export const getMyDiaries = createAsyncThunk(
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

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    reset: (state: diary) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // keep diary işlemi için
      .addCase(keepDiary.pending, (state: diary) => {
        state.isLoading = true;
      })
      .addCase(keepDiary.fulfilled, (state: diary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diary = action.payload.diary;
      })
      .addCase(keepDiary.rejected, (state: diary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      // get diaries işlemi için
      .addCase(getMyDiaries.pending, (state: diary) => {
        state.isLoading = true;
      })
      .addCase(getMyDiaries.fulfilled, (state: diary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        debugger;
        state.diary = action.payload;
      })
      .addCase(getMyDiaries.rejected, (state: diary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = diarySlice.actions;
export default diarySlice.reducer;
