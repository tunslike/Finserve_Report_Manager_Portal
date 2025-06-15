import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import subscriberReducer from './subscriberSlice';
import { PersistGate } from "redux-persist/integration/react";

// persist config
const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    subscriber: persistReducer(persistConfig, subscriberReducer),
});

export const store = configureStore({
    reducer: rootReducer,
})

export const persistor = persistStore(store);
export default store;