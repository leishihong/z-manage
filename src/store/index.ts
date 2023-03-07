import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
  whitelist: ['globalState', 'loginState', 'userState'], // 需要持久化的项
};

// 数据持久化
const persistedReducer = persistReducer(persistConfig, rootReducer);

const { VITE_APP_ENV } = import.meta.env;

export const store = configureStore({
  reducer: persistedReducer,
  devTools: VITE_APP_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export default store;

store.subscribe(() => {
  console.log(store.getState(), 'subscribe 数据订阅');
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
