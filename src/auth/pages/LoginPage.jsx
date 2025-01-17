import { useEffect } from 'react'
import { useForm } from '../../hooks'

import './login.css'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginUserThunk,
  registerUserThunk
} from '../../store/auth/AsyncThunkAuth'
import { showAlertErrorMessages } from '../../helpers'

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
}

export const LoginPage = () => {
  const dispatch = useDispatch()

  const {
    status,
    user: { errorMessage }
  } = useSelector(state => state.auth)
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    onResetForm
  } = useForm(loginFormFields)
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onResetForm: onRegisterResetForm,
    onInputChange: onRegisterInputChange
  } = useForm(registerFormFields)

  const handelLoginSubmit = event => {
    event.preventDefault()

    dispatch(loginUserThunk({ email: loginEmail, password: loginPassword }))
      .unwrap()
      .then(({ token }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime())
      })
      .catch(error => {
        showAlertErrorMessages({
          error,
          title: 'Error en la autenticación',
          icon: 'error'
        })
      })
  }

  const handelRegisterSubmit = async event => {
    event.preventDefault()
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error')
      return
    }
    dispatch(
      registerUserThunk({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    )
      .unwrap()
      .then(({ payload }) => {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('token-init-date', new Date().getTime())
      })
      .catch(error => {
        showAlertErrorMessages({
          error,
          title: 'Error en el registro',
          icon: 'error'
        })
      })

    if (status === 'not-authenticated') onRegisterResetForm()
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={handelLoginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='d-grid d-2'>
              <input
                type='submit'
                className='btnSubmit'
                value='Login'
                disabled={status === 'checking'}
              />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={handelRegisterSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='d-grid d-2'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
