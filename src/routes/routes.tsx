import React, { useEffect, useMemo, useState } from "react";
import Launcher from "../components/app/Launcher/Launcher";
import Home from "../components/app/Home/Home";
import Test from "../components/app/Test/Test";
import Data from "../components/app/Data/Data";
import Locator from "../components/app/Locator/Locator";
import HomeIcon from "@mui/icons-material/Home";
import LaunchIcon from "@mui/icons-material/Launch";
import FolderIcon from "@mui/icons-material/Folder";
import NearMeIcon from "@mui/icons-material/NearMe";


export type Route = {
  name?: string;
  path: string;
  element: React.ReactNode;
  isSideBar: boolean;
  icon?: React.ReactNode;
  children?: {
    name: string;
    path: string;
    element: React.ReactNode;
    isSideBar?: boolean;
  }[];
};


export const routes: Route[] = [
  {
    name: "Home",
    path: "/home",
    element: <Home />,
    isSideBar: true,
    icon: <HomeIcon />,
  },
  {
    name: "Launcher",
    path: "/launcher",
    element: <Launcher />,
    isSideBar: true,
    icon: <LaunchIcon />,
  },
  {
    name: "Test",
    path: "/test",
    element: <Test />,
    isSideBar: true,
  },
  {
    name: "Data",
    path: "/data",
    element: <Data />,
    isSideBar: true,
    icon: <FolderIcon />,
  },
  {
    name: "Locator",
    path: "/locator",
    element: <Locator />,
    isSideBar: true,
    icon: <NearMeIcon />,
  },
];
