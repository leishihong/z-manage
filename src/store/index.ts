import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import indexSlice from './reducers/indexSlice';

//定义store
const store = configureStore({
	reducer: {
		index: indexSlice
	}
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
export default store;
