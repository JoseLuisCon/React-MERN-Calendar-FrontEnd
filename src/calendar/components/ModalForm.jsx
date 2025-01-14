import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import DatePicker from "react-datepicker";

import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { addHours, differenceInSeconds } from "date-fns";

registerLocale("es", es);

import "./ModalForm.css";
import "react-datepicker/dist/react-datepicker.css";

import { useCalendarStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const ModalForm = () => {
  const { isDateModelOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setForSubmitted] = useState(false);
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValue, setFormValue] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValue({ ...activeEvent });
    }
  }, [activeEvent]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValue.title.length > 0 ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setForSubmitted(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: "Fechas incorrectas",
        text: "Revisar las fechas ingresadas",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    if (formValue.title.length <= 0) return;

    await startSavingEvent(formValue);

    setForSubmitted(false);

    closeDateModal();
  };

  const onInputChanged = ({ target }) => {
    const newState = {
      ...formValue,
      [target.name]: target.value,
    };
    setFormValue(newState);
  };

  return (
    <div>
      <Modal
        isOpen={isDateModelOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeDateModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio </label>
            <DatePicker
              showIcon
              selected={formValue.start}
              onChange={(date) => setFormValue({ ...formValue, start: date })}
              locale="es"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              icon={<i className="fa-solid fa-calendar"></i>}
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              showIcon
              selected={formValue.end}
              onChange={(date) => setFormValue({ ...formValue, end: date })}
              locale="es"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              icon={<i className="fa-solid fa-calendar"></i>}
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>

            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValue.title}
              onChange={onInputChanged}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValue.notes}
              onChange={onInputChanged}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
