import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const { isDateModelOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //* Properties
    isDateModelOpen,

    //* Methods
    openDateModal,
    closeDateModal,
  };
};
