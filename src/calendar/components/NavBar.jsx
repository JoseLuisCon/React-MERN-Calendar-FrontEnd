import { useDispatch, useSelector } from "react-redux";
import { onLogout, onLogoutCalendar } from "../../store";

export const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOutApp = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span style={{ color: "#fff" }}>
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user.name}
      </span>
      <button className="btn btn-outline-danger" onClick={handleOutApp}>
        <i className="fas fa-sign-out-alt"></i>
        <span>&nbsp; Salir</span>
      </button>
    </div>
  );
};
