import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer, getMessagesES } from '../../helpers'
import {
  CalendarEvent,
  FabAddNew,
  FabDeleteEvent,
  ModalForm,
  NavBar
} from '../'

import { getEventsThunk, onSetActiveEvent } from '../../store'
import { useUiStore } from '../../hooks'

export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const { events } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  )

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: user.uid === event.user.id ? '#347cf7' : '#465660',
      borderRadios: '0px',
      opacity: 0.8,
      color: 'white'
    }

    if (isSelected) {
      style.opacity = 1
    }
    return { style }
  }

  const onDoubleClick = () => {
    openDateModal()
  }
  const onSelect = event => {
    dispatch(onSetActiveEvent(event))
  }

  const onViewChanged = event => {
    setLastView(event)
    localStorage.setItem('lastView', event)
  }

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [])

  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={lastView}
          defaultDate={new Date()}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
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
  )
}
