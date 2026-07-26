import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialState, TUser } from "./auth.types";

const initialState: InitialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
