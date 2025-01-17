import { useDispatch, useSelector } from 'react-redux'

import { deleteEventThunk } from '../../store/calendar/calendarThunks'
import { showAlertErrorMessages } from '../../helpers'
import { useUiStore } from '../../hooks'

export const FabDeleteEvent = () => {
  const dispatch = useDispatch()
  const { activeEvent } = useSelector(state => state.calendar)
  const { closeDateModal, isDateModelOpen } = useUiStore()

  const handelDelete = () => {
    dispatch(deleteEventThunk(activeEvent))
      .unwrap()
      .then(resp => {
        if (resp.id === activeEvent.id) {
          showAlertErrorMessages({
            error: { msg: `Evento ${resp.title} eliminado` },
            title: 'Borrado de la base de datos',
            icon: 'success'
          })
        }
      })
      .catch(error => {
        showAlertErrorMessages({
          error,
          title: 'Error al eliminar el evento',
          icon: 'error'
        })
      })

    closeDateModal()
  }
  return (
    <button
      className='btn btn-danger fab-delete'
      onClick={handelDelete}
      style={{
        display: activeEvent && isDateModelOpen == false ? '' : 'none'
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
