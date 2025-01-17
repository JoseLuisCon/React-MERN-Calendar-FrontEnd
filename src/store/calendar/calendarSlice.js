import { createSlice } from '@reduxjs/toolkit'
import {
  addNewEventThunk,
  deleteEventThunk,
  getEventsThunk,
  updateEvenThunk
} from './calendarThunks'

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  errorMessage: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onUnSetActiveEvent: (state, { payload }) => {
      state.activeEvent = null
    },
    onLogoutCalendar: state => {
      state.events = []
      state.activeEvent = null
    }
  },
  extraReducers: builder => {
    builder.addCase(getEventsThunk.pending, state => {
      state.isLoadingEvents = true
      state.activeEvent = null
      state.errorMessage = null
    })
    builder.addCase(getEventsThunk.fulfilled, (state, { payload = [] }) => {
      state.isLoadingEvents = false
      state.events = payload
      state.activeEvent = null
      state.errorMessage = null
    })
    builder.addCase(getEventsThunk.rejected, (state, { payload }) => {
      state.isLoadingEvents = false
      state.errorMessage = payload
      state.activeEvent = null
      state.events = []
    })
    builder.addCase(addNewEventThunk.pending, state => {
      state.isLoadingEvents = true
      state.activeEvent = null
      state.errorMessage = null
    })
    builder.addCase(addNewEventThunk.fulfilled, (state, { payload }) => {
      state.isLoadingEvents = false
      state.events.push(payload)
      state.activeEvent = null
      state.errorMessage = null
    })
    builder.addCase(addNewEventThunk.rejected, (state, { payload }) => {
      state.isLoadingEvents = false
      state.errorMessage = payload
    })

    builder.addCase(updateEvenThunk.pending, state => {
      state.isLoadingEvents = true
      state.activeEvent = null
      state.errorMessage = null
    })

    builder.addCase(updateEvenThunk.fulfilled, (state, { payload }) => {
      state.isLoadingEvents = false
      state.events = state.events.map(event =>
        event.id === payload.id ? payload : event
      )
      state.activeEvent = null
      state.errorMessage = null
    })
    builder.addCase(updateEvenThunk.rejected, (state, { payload }) => {
      state.isLoadingEvents = false
      state.errorMessage = payload
    })
    builder.addCase(deleteEventThunk.pending, state => {
      state.isLoadingEvents = true
      state.errorMessage = null
    })
    builder.addCase(deleteEventThunk.fulfilled, (state, { payload }) => {
      state.isLoadingEvents = false
      state.events = state.events.filter(event => event.id !== payload.id)
      state.activeEvent = null
    })
    builder.addCase(deleteEventThunk.rejected, (state, { payload }) => {
      state.isLoadingEvents = false
      state.activeEvent = null
      state.errorMessage = payload
    })
  }
})

export const { onLogoutCalendar, onSetActiveEvent, onUnSetActiveEvent } =
  calendarSlice.actions
