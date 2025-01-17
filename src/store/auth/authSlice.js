import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  renewTokenThunk,
} from "./AsyncThunkAuth";

const initialState = {
  status: "not-authenticated", // 'checking' | 'authenticated' | 'not-authenticated'
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.status = "checking";
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
    });
    builder.addCase(loginUserThunk.rejected, (state, { payload }) => {
      state.status = "not-authenticated";
      state.errorMessage = payload;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.status = "checking";
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
    });
    builder.addCase(registerUserThunk.rejected, (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    });

    builder.addCase(renewTokenThunk.pending, (state) => {
      state.status = "checking";
    });
    builder.addCase(renewTokenThunk.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
    });
    builder.addCase(renewTokenThunk.rejected, (state) => {
      state.status = "not-authenticated";
      state.user = {};
    });
  },
});

export const { onLogout } = authSlice.actions;
