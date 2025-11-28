import authReducer from '@/common/stores/authStore/authSlice';
import basketReducer from '@/common/stores/basketStore/basketSlice';
import { hasValidTokens } from '@/common/utils/hasValidTokens';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  basket: basketReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'basket'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store, null, () => {
  if (!hasValidTokens()) {
    persistor.purge();
    store.dispatch({ type: 'auth/logout/fulfilled' });
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
