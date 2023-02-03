import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

import { getCatalog } from "@/api/category";
// 为 slice state 定义一个类型
interface IndexState {
  catalogList?: any[];
  status?: "idle" | "loading" | "failed";
}
// 使用该类型定义初始 state
const initialState: IndexState = {
  catalogList: [],
};
//获取首页左侧文档目录
export const getCatalogList = createAsyncThunk("index/getCatalog", async () => {
  const { data } = await getCatalog();
  return data;
});
export const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogList.fulfilled, (state, action) => {
      const { CatalogList } = action.payload;
      state.catalogList = CatalogList;
    });
  },
});
export const selectCatalogList = (state: RootState) => state.index.catalogList;
export default indexSlice.reducer;