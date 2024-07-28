import React from "react";
import Launcher from "../components/app/Launcher/Launcher";
import Home from "../components/app/Home/Home";
import Test from "../components/app/Test/Test";
import Data from "../components/app/Data/Data";
import Locator from "../components/app/Locator/Locator";

export type Route = {
  name?:string,
  path: string;
  element: React.ReactNode;
  isSideBar: boolean;
  children?: {
    path: String;
    element: React.ReactNode;
    isSideBar: boolean;
  }[];
};

export const routes: Route[] = [
  {
    name:'Home',
    path: "/home",
    element: <Home />,
    isSideBar: true,
  },
  {
    name:'Launcher',
    path: "/launcher",
    element: <Launcher />,
    isSideBar: true,
  },
  {
    name:'Test',
    path: "/test",
    element: <Test/>,
    isSideBar: true,
  },
  {
    name:'Data',
    path: "/data",
    element: <Data />,
    isSideBar: true,
  },
  {
    name:'Locator',
    path: "/locator",
    element: <Locator />,
    isSideBar: true,
  },
];
