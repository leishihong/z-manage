import { lazy, Suspense, ReactNode } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoadingComponent from "compontents/Loading";
import LayoutPage from "layout";
const Introduction = lazy(() => import("views/introduction"));
const Setup = lazy(() => import("views/setup"));
const Error404 = lazy(() => import("views/error/404"));

const load = (children: ReactNode): ReactNode => (
  <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
);
//定义路由数据
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: load(<Introduction />),
      },
      {
        path: "setup",
        element: load(<Setup />),
      },
      {
        path: "*",
        element: load(<Error404 />),
      },
    ],
  },
];
export default createBrowserRouter(routes);