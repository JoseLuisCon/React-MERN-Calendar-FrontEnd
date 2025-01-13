import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDateModelOpen: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModelOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModelOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
