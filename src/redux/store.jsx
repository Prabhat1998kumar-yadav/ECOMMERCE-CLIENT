import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import cartReducer from "./cartSlice"

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';
import {thunk} from "redux-thunk";


const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    categoryReducer,
    cartReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

  

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }).concat(thunk),
  });

export const persistor=persistStore(store)