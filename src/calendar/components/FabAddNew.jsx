import { useDispatch } from 'react-redux'
import { onOpenDateModal } from '../../store'

export const FabAddNew = () => {
  const dispatch = useDispatch()

  return (
    <button
      className='btn btn-primary fab'
      onClick={() => dispatch(onOpenDateModal())}
    >
      <i className='fas fa-plus'></i>
    </button>
  )
}
