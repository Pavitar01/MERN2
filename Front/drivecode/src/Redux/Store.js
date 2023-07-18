// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import ProductSlice from './Slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, ProductSlice);

const store = configureStore({
  reducer: {
    products: persistedReducer, 
  },

});

const persistor = persistStore(store);

export { store, persistor };
