import { testUserCredentials } from "./testUser";

export const initialState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};
export const onCheckingState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const onLoginState = {
  status: "authenticated",
  user: testUserCredentials,
  errorMessage: undefined,
};

export const onLogoutState = {
  status: "not-authenticated",
  user: {},
  errorMessage: "Error en la autenticación",
};

export const clearErrorMessageState = {
  errorMessage: undefined,
};
