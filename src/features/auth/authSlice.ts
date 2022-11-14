import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

type User = {
  username: string;
  email: string;
  password: string;
};

type userInitialInfo = {
  user: User | any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
//localStorage.setItem("user", "");

//get user from localstorage
const localStorageData = localStorage.getItem("user");
const user = localStorageData ? JSON.parse(localStorageData) : null;

const initialState: userInitialInfo = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "abc",
};

//register user
export const register = createAsyncThunk(
  "/auth/register",
  async (user: userInitialInfo, thunkAPI) => {
    try {
      return await authService.register(user);
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

//login user
export const login = createAsyncThunk(
  "/auth/login",
  async (user: userInitialInfo, thunkAPI) => {
    debugger;
    try {
      return await authService.login(user);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// type actionType = { type: "register"; payload: User };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: userInitialInfo) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: userInitialInfo) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: userInitialInfo, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.meta.arg.user;
      })
      .addCase(register.rejected, (state: userInitialInfo, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Something goes wrong!"; //action.payload
        state.user = null;
      })
      .addCase(login.pending, (state: userInitialInfo) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: userInitialInfo, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.meta.arg.user;
      })
      .addCase(login.rejected, (state: userInitialInfo, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Something goes wrong!"; //action.payload
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;

export default authSlice.reducer;
