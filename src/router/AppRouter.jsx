import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renewTokenThunk } from "../store/auth/AsyncThunkAuth";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renewTokenThunk())
      .unwrap()
      .then(({ token }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
      })
      .catch((error) => {
        localStorage.clear();
      });
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status !== "authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
