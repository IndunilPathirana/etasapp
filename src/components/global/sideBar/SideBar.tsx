/* eslint-disable jsx-a11y/alt-text */
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./customSidebar.css";
import styled from "styled-components";
import { Icon, IconButton, styled as Styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import { Route, routes as staticRoutes } from "../../../routes/routes";
import { Link, useLocation } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import TestAddForm from "../../app/Test/TestAddForm/TestAddForm";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";
import { useSnackBars } from "../../../context/SnackBarContext";

type SideBarProps = {
  routes: Route[];
  addTestSuite: (newTestSuite: string) => boolean;
  deleteTestSuite: (testSuiteId: number) => Promise<void>;
};

export default function SideBar(props: SideBarProps) {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [openConf, setOpenConf] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { addSnackBar } = useSnackBars();
  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message: "Test Suite Added Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: "error",
      message: "Test sheet already exists",
    });
  };

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
      const response = props.addTestSuite(testSuite);
      console.log(response);
      if (response) {
        onSuccess();
        handleClose();
      } else {
        onError();
        handleClose();
      }
    } catch (error) {
      onError();

      console.log(error);
    }
  };

  const deleteTestSuiteA = () => {
    handleConfClose();
    props.deleteTestSuite(selectedIndex);
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
        {props.routes.map((route: Route) => {
          if (route.isSideBar === true) {
            if (route.name === "Test") {
              return (
                
                <SubMenu
                  label={route.name}
                  icon={
                    <IconButton onClick={handleOpen}>
                      <AddBoxIcon />
                    </IconButton>
                  }
                >
                  {route?.children?.map((subRoute, index) => (
                    <Link
                      to={subRoute.path}
                      style={{ textDecoration: "none", color: "#686868" }}
                    >
                      <StyledMenuItem
                        isActive={location.pathname.includes(subRoute.path)}
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
                        <ItemName style={{ fontSize: "15px" }}>
                          {subRoute.name}
                        </ItemName>
                      </StyledMenuItem>
                    </Link>
                  ))}
                </SubMenu>
              
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
                    ) : (
                      route.icon
                    )
                  }
                >
                  <ItemName>{route.name}</ItemName>
                </StyledMenuItem>
              </Link>
            );
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
        confirmAction={deleteTestSuiteA}
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
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>`
  color: ${(props) => (props.isActive ? "#7ABBF5" : "#686868")};
  background-color: ${(props) => (props.isActive ? "#f1f1f1" : "")};
  &:hover {
    color: #7abbf5; 
    background-color: ${(props) =>
      props.isActive
        ? "#e1e1e1"
        : "#f9f9f9"}; 
  }
`;

export const ItemName = Styled(Typography)`
  && {
    font-size: 14px;
    margin: 10px 0;
  }
`;
