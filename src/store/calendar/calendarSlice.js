import { createSlice } from "@reduxjs/toolkit";
import { onLogout } from "../auth/authSlice";
// import { addHours } from "date-fns";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños",
//   notes: "Hay que comprar el pastel",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Carlos",
//   },
// };

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onUnSetActiveEvent: (state, { payload }) => {
      state.activeEvent = null;
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },

    onLogoutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUnSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
