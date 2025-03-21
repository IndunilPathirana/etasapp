import React, { useContext } from "react";
import "./App.css";
import styled from "styled-components";
import SideBar from "./components/global/sideBar/SideBar";
import PermissionWrapper from "./components/permissionWrapper/PermissionWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/global/topBar/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import { routes as staticRoutes } from "../src/routes/routes";
import { useRoutes } from "./hooks/useRoutes";
import { SnackBarProvider } from "./context/SnackBarContext";
import SnackBars from "./components/SnackBar/SnackBars";

function App() {
  const { theme, colorMode } = useMode();
  const { routes, addTestSuite, deleteTestSuite, addLocator, deleteLocator ,addDataSheet,deleteDataSheet} =
  useRoutes(staticRoutes);
  console.log(routes);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <BrowserRouter>
              <Wrapper>
                <PermissionWrapper>
                  <SideBar
                    addTestSuite={addTestSuite}
                    deleteTestSuite={deleteTestSuite}
                    addLocator={addLocator}
                    deleteLocator={deleteLocator}
                    addDataSheet={addDataSheet}
                    deleteDataSheet={deleteDataSheet}
                    routes={routes}
                  />
                </PermissionWrapper>
                <PageWrapper>
                  <TopBar />
                  <Routes>
                    {routes.map(
                      (
                        route: {
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
                        },
                        index: number
                      ) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={route.element}
                        >
                          {route.children &&
                            route.children.map((child, childIndex) => (
                              <Route
                                key={childIndex}
                                path={child.path}
                                element={child.element}
                              />
                            ))}
                        </Route>
                      )
                    )}
                  </Routes>
                </PageWrapper>
              </Wrapper>
            </BrowserRouter>
            <SnackBars />
          </SnackBarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e7e8ed;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #e7e8ed;
`;
