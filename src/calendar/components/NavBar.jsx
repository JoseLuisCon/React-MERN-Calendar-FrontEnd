import { useAuthStore } from "../../hooks";

export const NavBar = () => {
  const { startLogout } = useAuthStore();
  const handleOutApp = () => {
    startLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span>
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Conde
      </span>
      <button className="btn btn-outline-danger" onClick={handleOutApp}>
        <i className="fas fa-sign-out-alt"></i>
        <span>&nbsp; Salir</span>
      </button>
    </div>
  );
};
