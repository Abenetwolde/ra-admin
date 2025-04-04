import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
}

// Load initial state from localStorage if it exists
const loadStateFromLocalStorage = (): UserState => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return {
        token: null,
        refreshToken: null,
        username: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return {
      token: null,
      refreshToken: null,
      username: null,
    };
  }
};

const initialState: UserState = loadStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<UserState>) => {
      console.log("Setting user token.....................:", action.payload);
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      // Save to localStorage whenever state changes
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
      } catch (err) {
        console.error("Could not save state to localStorage:", err);
      }
    },
    clearUserToken: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.username = null;
      // Clear from localStorage
      try {
        localStorage.removeItem('userState');
      } catch (err) {
        console.error("Could not remove state from localStorage:", err);
      }
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;
export default userSlice.reducer;

// Optional: Helper function to get current token
export const getUserToken = (state: { user: UserState }) => state.user;