import { configureStore } from "@reduxjs/toolkit";
import { formsApi } from "./services/forms";
import { organizationsApi } from "./services/organization";
import { requestsApi } from "./services/requestsApi";
import { usersApi } from "./services/userApi";
export const store = configureStore({
  reducer: {
    [formsApi.reducerPath]: formsApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formsApi.middleware,organizationsApi.middleware,requestsApi.middleware,requestsApi.middleware,usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
