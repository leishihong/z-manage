import React, { FC, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import LoadingComponent from "components/Loading/index";

import { store, persistor } from "store/index";

import router from "routers/index";

dayjs.locale("en");

import "./App.less";

const App: FC = () => {
  console.log(121212);
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <ConfigProvider
          componentSize="large"
          locale={zhCN}
          getPopupContainer={(triggerNode: any) => {
            if (triggerNode) {
              return triggerNode.parentNode;
            }
            return document.body;
          }}
          theme={{
            token: {
              colorPrimary: "#1F63FF",
            },
          }}
        >
          <div className="app-container">
            <RouterProvider router={router} />
          </div>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
