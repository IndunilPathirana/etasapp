import React, { useContext } from "react";
import "./App.css";
import styled from "styled-components";
import SideBar from "./components/global/sideBar/SideBar";
import PermissionWrapper from "./components/permissionWrapper/PermissionWrapper";
import { BrowserRouter, Routes } from "react-router-dom";
import { Router } from "./routes/router";
import TopBar from "./components/global/topBar/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const { theme, colorMode } = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Wrapper>
              <PermissionWrapper>
                <SideBar />
              </PermissionWrapper>
              <PageWrapper>
                <TopBar />
                <Routes>{Router}</Routes>
              </PageWrapper>
            </Wrapper>
          </BrowserRouter>
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
  background-color: #e5e4e2;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
