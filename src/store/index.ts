import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.slice";
import menuItemReducer from "./slices/menu/menu.slice";
import offerReducer from "./slices/offer/offer.slice";
import userMenuReducer from "./slices/publicMenu/publicMenu.slice";
import userOffersReducer from "./slices/publicOffers/publicOffers.slice";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuItemReducer,
  offer: offerReducer,
  userMenu: userMenuReducer,
  userOffers: userOffersReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "menu","offer","userMenu","userOffers"], // persist auth & menuItem slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
