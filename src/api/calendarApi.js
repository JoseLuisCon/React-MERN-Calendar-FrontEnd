import axios from "axios";
import { logger } from "react-native-logs";

const log = logger.createLogger();

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//Todo: configurar interceptores para manejar errores y mostrar mensajes de error
calendarApi.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Agregar el token como cookie en el encabezado de la solicitud
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    log.error("Error en la solicitud", error);
    // Manejar errores antes de enviar la solicitud
    return Promise.reject(error);
  }
);

export default calendarApi;
