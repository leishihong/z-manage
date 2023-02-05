import { combineReducers } from "@reduxjs/toolkit";

import globalSlice from "./globalSlice/index";
import loginSlice from "./loginSlice/index";

/**
 * Combine reducers
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript
 */
export const rootReducer = combineReducers({
  globalState: globalSlice,
  loginState: loginSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
