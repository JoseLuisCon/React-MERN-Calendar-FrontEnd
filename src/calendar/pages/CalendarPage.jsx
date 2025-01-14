import { useEffect, useState } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer, getMessagesES } from "../../helpers";
import {
  CalendarEvent,
  FabAddNew,
  FabDeleteEvent,
  ModalForm,
  NavBar,
} from "../";
import { useAuthStore, useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      borderRadios: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = () => {
    // console.log("🚀 ~ onDoubleClick ~ event:", event);
    openDateModal();
  };
  const onSelect = (event) => {
    // console.log("🚀 ~ onSelect ~ event:", event);
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // setLastView(event);
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container">
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
      </div>
      <ModalForm />
      <FabAddNew />
      <FabDeleteEvent />
    </div>
  );
};
