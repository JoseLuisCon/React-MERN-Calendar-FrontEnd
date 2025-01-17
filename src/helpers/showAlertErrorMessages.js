import Swal from 'sweetalert2'

export const showAlertErrorMessages = ({ error, title, icon }) => {
  if (!error) {
    return
  }

  // Verificar si hay un mensaje general (error.msg)
  if (error.msg) {
    Swal.fire({
      title,
      text: error.msg,
      icon,
      timer: 2000,
      showConfirmButton: false
    })
  } else if (error.errors && typeof error.errors === 'object') {
    // Iterar sobre los errores específicos
    const errorMessages = Object.keys(error.errors).map(
      key => error.errors[key].msg
    )

    // Mostrar un popup único con todos los mensajes concatenados
    Swal.fire({
      title,
      text: errorMessages.join('\n'), // Unir los mensajes en una sola cadena
      icon,
      timer: 2000,
      showConfirmButton: false
    })
  }
}
