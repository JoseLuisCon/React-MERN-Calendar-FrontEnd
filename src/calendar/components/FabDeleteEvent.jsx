import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDeleteEvent = () => {
  const { startDeleteEvent, activeEvent, hasEventSelected } =
    useCalendarStore();
  const { closeDateModal, isDateModelOpen } = useUiStore();

  const handelDelete = () => {
    startDeleteEvent(activeEvent);
    closeDateModal();
  };
  return (
    <button
      className="btn btn-danger fab-delete"
      onClick={handelDelete}
      style={{
        display: hasEventSelected && isDateModelOpen == false ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
