import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  permissions: string[];
  user: any | null;
  token: string | null;
}

const initialLoginState: LoginState = {
  permissions: [],
  user: null,
  token: localStorage.getItem("token") || null,
};

export const loginSlice = createSlice({
  name: "loginSlicer",
  initialState: initialLoginState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;
export default loginSlice.reducer;
