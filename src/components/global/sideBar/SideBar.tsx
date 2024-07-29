/* eslint-disable jsx-a11y/alt-text */
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./customSidebar.css";
import styled from "styled-components";
import { Icon, IconButton, styled as Styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import { Route, routes } from "../../../routes/routes";
import { Link, useLocation } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import TestAddForm from "../../app/Test/TestAddForm/TestAddForm";
import { useState } from "react";
import {
  createTestSuite,
  getTestSuites,
  removeTestSuite,
} from "../../../api/testSuiteService";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";

export default function SideBar() {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [openConf, setOpenConf] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleConfClose = () => {
    setOpenConf(false);
  };
  const handleConfOpen = (index: number) => {
    setSelectedIndex(index);
    setOpenConf(true);
  };

  const submitTestSuite = async (testSuite: string) => {
    try {
      const response = createTestSuite(testSuite);
      if (response) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTestSuite = () => {
    handleConfClose()
    removeTestSuite(selectedIndex);
  };

  return (
    <StyledSidebar>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}
      >
        <img src={Logo} style={{ width: "40px" }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", paddingLeft: "5px" }}
        >
          <Typography sx={{ fontWeight: "700" }}>EvonSys</Typography>
          <Typography fontSize={"12px"} sx={{ color: "#7F7F7F" }}>
            Evolution Innovation
          </Typography>
        </Box>
      </Box>
      <Menu style={{ marginTop: "20px" }}>
        {routes.map((route: Route) => {
          if (route.isSideBar === true) {
            if (route.name === "Test") {
              return (
                <Link
                  to={route.path}
                  style={{ textDecoration: "none", color: "#686868" }}
                >
                  <SubMenu
                    label={route.name}
                    icon={
                      <IconButton onClick={handleOpen}>
                        <AddBoxIcon />
                      </IconButton>
                    }
                  >
                    {getTestSuites().map((testSuite, index) => (
                      <StyledMenuItem
                        isActive={location.pathname.includes(route.path)}
                        icon={
                          route.name === "Test" ? (
                            <>
                              <IconButton onClick={handleOpen}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleConfOpen(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : null
                        }
                      >
                        <ItemName style={{ fontSize:'15px'}}>{testSuite.name}</ItemName>
                      </StyledMenuItem>
                    ))}
                  </SubMenu>
                </Link>
              );
            }
            return (
              <Link
                to={route.path}
                style={{ textDecoration: "none", color: "#686868" }}
              >
                <StyledMenuItem
                  isActive={location.pathname.includes(route.path)}
                  icon={
                    route.name === "Test" ? (
                      <IconButton onClick={handleOpen}>
                        <AddBoxIcon />
                      </IconButton>
                    ) : null
                  }
                >
                  <ItemName>{route.name}</ItemName>
                </StyledMenuItem>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </Menu>
      <TestAddForm
        open={open}
        formName="Test Suite"
        handleClose={handleClose}
        confirmAction={submitTestSuite}
      />
      <ConfirmationDialog
        open={openConf}
        formName="Test Suite"
        handleClose={handleConfClose}
        confirmAction={deleteTestSuite}
        confirmMsg="Are you sure to delete this test suite"
      />
    </StyledSidebar>
  );
}

// Define an interface for the props
interface StyledMenuItemProps {
  isActive: boolean;
}

const StyledSidebar = styled(Sidebar)`
  background-color: #e9e9e9;
  box-shadow: rgba(48, 48, 48, 0.15) 1px 1.95px 1px;
`;

const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>`
  color: #686868;
  background-color: ${(props) => (props.isActive ? "white" : "")};
`;

export const ItemName = Styled(Typography)`
  && {
    font-size: 16px;
    margin: 10px 0;
    padding-left:10px;
    color:'red'
  }
`;
