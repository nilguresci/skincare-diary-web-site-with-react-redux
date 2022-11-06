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

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = diarySlice.actions;
export default diarySlice.reducer;
