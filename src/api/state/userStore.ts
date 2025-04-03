import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
    },
    clearUserToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.username = null;
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;
export default userSlice.reducer; // <- This should match the import name in store.ts
