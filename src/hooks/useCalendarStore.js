import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onLoadEvents,
  onUpdateEvent,
  onUnSetActiveEvent,
  onLogoutCalendar,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      // TODO BIEN
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        // Creando
        const { data } = await calendarApi.post("/events", calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.response.data.msg, "error");
      dispatch(onUnSetActiveEvent());
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
      dispatch(onUnSetActiveEvent());
    }
  };

  const startUnSetActiveEvent = () => {
    dispatch(onSetActiveEvent(null));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error al cargar los eventos");
      console.log(error);
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Methods
    setActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
    startUnSetActiveEvent,
  };
};
