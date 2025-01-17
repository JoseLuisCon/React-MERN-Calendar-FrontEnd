import { createAsyncThunk } from '@reduxjs/toolkit'
import calendarApi from '../../api/calendarApi'
import { convertEventsToDateEvents } from '../../helpers'

export const getEventsThunk = createAsyncThunk(
  'calendar/getEventsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.eventos)
      return events
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addNewEventThunk = createAsyncThunk(
  'calendar/addNewEventThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await calendarApi.post('/events', payload)

      const newData = convertEventsToDateEvents([data.evento])
      return newData[0]
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateEvenThunk = createAsyncThunk(
  'calendar/updateEvenThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await calendarApi.put(`/events/${payload.id}`, payload)
      const newData = convertEventsToDateEvents([data.evento])
      return newData[0]
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteEventThunk = createAsyncThunk(
  'calendar/deleteEventThunk',
  async (payload, { rejectWithValue }) => {
    try {
      await calendarApi.delete(`/events/${payload.id}`)

      return payload
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
