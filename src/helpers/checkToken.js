import { useDispatch } from "react-redux";

const checkToken = async () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  if (!token) {
    return dispatch(onLogout());
  }
  dispatch(onChecking());
  try {
    const { data } = await calendarApi.get("/auth/renew");
    localStorage.setItem("token", data.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(onLogin({ name: data.name, uid: data.uid }));
  } catch (error) {
    localStorage.clear();
    dispatch(onLogout());
  }
};

export const useCheckToken = () => checkToken;
