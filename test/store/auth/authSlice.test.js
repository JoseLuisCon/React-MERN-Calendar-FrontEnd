import { describe, it, expect } from "vitest";
import { authSlice } from "../../../src/store/auth/authSlice";
import {
  initialState,
  onCheckingState,
  onLoginState,
  onLogoutState,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("authSlice", () => {
  it("Debe de regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  it("onChecking debe de cambiar el estado a 'checking'", () => {
    const state = authSlice.reducer(
      initialState,
      authSlice.actions.onChecking()
    );
    expect(state).toEqual(onCheckingState);
  });
  it("onLogin debe de cambiar el estado a 'authenticated'", () => {
    const state = authSlice.reducer(
      initialState,
      authSlice.actions.onLogin(testUserCredentials)
    );
    expect(state).toEqual(onLoginState);
  });
  it("onLogout debe de cambiar el estado a 'not-authenticated'", () => {
    const errorMessage = "Error en la autenticación";
    const state = authSlice.reducer(
      initialState,
      authSlice.actions.onLogout(errorMessage)
    );
    expect(state).toEqual(onLogoutState);
  });
});
