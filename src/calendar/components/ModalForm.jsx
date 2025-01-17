import { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import DatePicker from 'react-datepicker'

import { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { addHours, differenceInSeconds } from 'date-fns'

registerLocale('es', es)

import './ModalForm.css'
import 'react-datepicker/dist/react-datepicker.css'

import { useDispatch, useSelector } from 'react-redux'

import {
  addNewEventThunk,
  onCloseDateModal,
  onUnSetActiveEvent
} from '../../store'
import { showAlertErrorMessages } from '../../helpers'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export const ModalForm = () => {
  const dispatch = useDispatch()

  const { isDateModelOpen } = useSelector(state => state.ui)
  const { activeEvent } = useSelector(state => state.calendar)

  const modoEdicion = useMemo(() => {
    return activeEvent ? true : false
  }, [activeEvent])

  const [formSubmitted, setForSubmitted] = useState(false)

  const [formValue, setFormValue] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  useEffect(() => {
    if (activeEvent) {
      setFormValue({ ...activeEvent })
    } else {
      setFormValue({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
      })
    }
  }, [activeEvent, isDateModelOpen])

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return formValue.title.length > 0 ? '' : 'is-invalid'
  }, [formValue.title, formSubmitted])

  const onSubmit = async event => {
    event.preventDefault()
    setForSubmitted(true)

    const difference = differenceInSeconds(formValue.end, formValue.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: 'Fechas incorrectas',
        text: 'Revisar las fechas ingresadas',
        icon: 'error',
        timer: 2000
      })
      return
    }

    if (formValue.title.length <= 0) return

    // await startSavingEvent(formValue);
    if (modoEdicion) {
      dispatch(updateEvenThunk(formValue))
        .unwrap()

        .then(() => {
          Swal.fire({
            title: 'Evento actualizado',
            text: 'Se actualizó correctamente',
            icon: 'success',
            timer: 2000
          })
        })
        .catch(error => {
          showAlertErrorMessages({
            error,
            title: 'Error al actualizar evento',
            icon: 'error'
          })
        })
    } else {
      dispatch(addNewEventThunk(formValue))
    }

    setForSubmitted(false)

    dispatch(onCloseDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
    dispatch(onUnSetActiveEvent())
  }

  const onInputChanged = ({ target }) => {
    const newState = {
      ...formValue,
      [target.name]: target.value
    }
    setFormValue(newState)
  }

  return (
    <div>
      <Modal
        isOpen={isDateModelOpen}
        onAfterClose={closeDateModal}
        onRequestClose={closeDateModal}
        style={customStyles}
        contentLabel='Example Modal'
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className='container' onSubmit={onSubmit}>
          <div className='form-group mb-2'>
            <label>Fecha y hora inicio </label>
            <DatePicker
              showIcon
              selected={formValue.start}
              onChange={date => setFormValue({ ...formValue, start: date })}
              locale='es'
              dateFormat='dd/MM/yyyy HH:mm'
              showTimeSelect
              icon={<i className='fa-solid fa-calendar'></i>}
              timeCaption='Hora'
            />
          </div>

          <div className='form-group mb-2'>
            <label>Fecha y hora fin</label>
            <DatePicker
              showIcon
              selected={formValue.end}
              onChange={date => setFormValue({ ...formValue, end: date })}
              locale='es'
              dateFormat='dd/MM/yyyy HH:mm'
              showTimeSelect
              icon={<i className='fa-solid fa-calendar'></i>}
              timeCaption='Hora'
            />
          </div>

          <hr />
          <div className='form-group mb-2'>
            <label>Titulo y notas</label>

            <input
              type='text'
              className={`form-control ${titleClass}`}
              placeholder='Título del evento'
              name='title'
              autoComplete='off'
              value={formValue.title}
              onChange={onInputChanged}
            />
            <small id='emailHelp' className='form-text text-muted'>
              Una descripción corta
            </small>
          </div>

          <div className='form-group mb-2'>
            <textarea
              type='text'
              className='form-control'
              placeholder='Notas'
              rows='5'
              name='notes'
              value={formValue.notes}
              onChange={onInputChanged}
            ></textarea>
            <small id='emailHelp' className='form-text text-muted'>
              Información adicional
            </small>
          </div>

          <button type='submit' className='btn btn-outline-primary btn-block'>
            <i className='far fa-save'></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  )
}
