import React from "react";

import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import Repositories from "./Components/Repositories";
import CreateRepository from "./Components/CreateRepository";
import RepoDetail from "./Components/RepoDetail";
import IssueCreate from "./Components/IssueCreate";

const Home = () => {
  return <p>Home</p>;
};

export const appRoutes: RouteObject[] = [
  // ...authRoutes,
  //   ...dashboardLayoutRoutes,?
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "repos",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Repositories />,
      },
      {
        path: "new",
        element: <CreateRepository />,
      },
      {
        path: ":item",
        element: <RepoDetail />,
        children: [
          {
            path: "issues",
            element: <IssueCreate />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404: Page not found</div>,
  },
];

export const AppRoutes = (props: { children?: React.ReactNode }) =>
  useRoutes(appRoutes);

export default { appRoutes, AppRoutes };
