import { createAsyncThunk } from "@reduxjs/toolkit";
import calendarApi from "../../api/calendarApi";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await calendarApi.post("/auth", { ...payload });
      return response.data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await calendarApi.post("/auth/new", { ...payload });
      console.log("🚀 ~ registerUserThunk-response.data:", response.data);
      return response.data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const renewTokenThunk = createAsyncThunk(
  "auth/renew",
  async (_, { rejectWithValue }) => {
    try {
      const response = await calendarApi.get("/auth/renew");
      return response.data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
