import { configureStore } from "@reduxjs/toolkit";
import { formsApi } from "./services/forms";
import { organizationsApi } from "./services/organization";
import { requestsApi } from "./services/requestsApi";
import { usersApi } from "./services/userApi";
import { authApi } from "./services/authApi";
import userreducer from "./state/userStore";
import { raofficerApi } from "./services/raOfficerApi";
import { ejbcaApi } from "./services/ejbcaApi";

export const store :any= configureStore({
  reducer: {
        user: userreducer,
        
    [formsApi.reducerPath]: formsApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [raofficerApi.reducerPath]: raofficerApi.reducer,
   ejbcaApi: ejbcaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formsApi.middleware,organizationsApi.middleware,requestsApi.middleware,requestsApi.middleware,usersApi.middleware, authApi.middleware,raofficerApi.middleware,ejbcaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
