import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import diaryService from "./diaryService";
import { IDiary, IRoutinInfo, IProduct } from "../../models/DiaryModels";

const localStorageData = localStorage.getItem("user");
const initialState: IDiary = {
  diary: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userId: localStorageData ? JSON.parse(localStorageData) : null,
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
        debugger;
        console.log(action.payload);
        state.diary = action.payload;
      })
      .addCase(getMyDiaries.rejected, (state: IDiary, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = diarySlice.actions;
export default diarySlice.reducer;
