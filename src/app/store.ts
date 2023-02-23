import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import diaryReducer from "../features/diarys/diarySlice";
import brandReducer from "../features/brands/brandSlice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diarys: diaryReducer,
    brands: brandReducer,
    products: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
