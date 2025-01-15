import { describe, expect, it } from "vitest";
import calendarApi from "../../src/api/calendarApi";

describe("Calendar API", () => {
  it("debe de tener la configuración por defecto", () => {
    // Verificar que la URL base sea la misma que la configurada en el archivo .env
    expect(calendarApi.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    // Verificar que la propiedad withCredentials sea verdadera
    expect(calendarApi.defaults.withCredentials).toBeTruthy();
  });

  it("debe de tener un interceptor para agregar el token en la solicitud", async () => {
    const token = "ABC123";

    // Verificar que el token existe en el localStorage
    localStorage.setItem("token", token);
    // Hacer una solicitud de prueba para que se ejecute el interceptor
    const resp = await calendarApi.get("/auth");

    // Verificar que el token se agregó en el encabezado de la solicitud
    expect(resp.config.headers.Authorization).toBe(`Bearer ${token}`);
  });
});
