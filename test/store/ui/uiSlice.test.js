import { describe, expect, it } from "vitest";
import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("uiSlice", () => {
  it("should return the initial state", () => {
    expect(uiSlice.getInitialState()).toStrictEqual({ isDateModelOpen: false });
  });

  it("debe de cambiar el isDateModelOpen a true", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModelOpen).toBeTruthy();
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModelOpen).toBeFalsy();
  });
});
