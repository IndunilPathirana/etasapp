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
import LocatorAddForm from "../../app/Locator/LocatorAddForm/LocatorAddForm";
import DataSheetAddForm from "../../app/Data/DataSheetAddForm/DataSheetAddForm";

type SideBarProps = {
  routes: Route[];
  addTestSuite: (newTestSuite: string) => boolean;
  deleteTestSuite: (testSuiteId: number) => Promise<void>;
  addLocator: (newLocator: string) => boolean;
  deleteLocator: (testSuiteId: number) => Promise<void>;
  addDataSheet: (newDataSheet: string) => boolean;
  deleteDataSheet: (dataSheetId: number) => Promise<void>;
};

export default function SideBar(props: SideBarProps) {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [openConf, setOpenConf] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [locatorOpen, setLocatorOpen] = useState<boolean>(false);
  const [dataOpen, setDataOpen] = useState<boolean>(false);

  const [openConfDeleteLocator, setOpenConfDeleteLocator] = useState(false);
  const [openConfDeleteData, setOpenConfDeleteData] = useState(false);

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

  const onSuccessLocator = () => {
    addSnackBar({
      type: "success",
      message: "Locator Added Successfully",
    });
  };
  const onErrorLocator = () => {
    addSnackBar({
      type: "error",
      message: "Locator already exists",
    });
  };

  const onSuccessDataSheet = () => {
    addSnackBar({
      type: "success",
      message: "Data Sheet Added Successfully",
    });
  };
  const onErrorDataSheet = () => {
    addSnackBar({
      type: "error",
      message: "Data Sheet already exists",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleLocatorClose = () => {
    setLocatorOpen(false);
  };
  const handleLocatorOpen = () => {
    setLocatorOpen(true);
  };
  const handleConfClose = () => {
    setOpenConf(false);
  };
  const handleConfOpen = (index: number) => {
    setSelectedIndex(index);
    setOpenConf(true);
  };

  const handleConfOpenLocator = (index: number) => {
    setSelectedIndex(index);
    setOpenConfDeleteLocator(true);
  };

  const handleConfCloseLocator = () => {
    setOpenConfDeleteLocator(false);
  };

  const handleConfOpenData = (index: number) => {
    setSelectedIndex(index);
    setOpenConfDeleteData(true);
  };

  const handleConfCloseData = () => {
    setOpenConfDeleteData(false);
  };

  const handleDataClose = () => {
    setDataOpen(false);
  };
  const handleDataOpen = () => {
    setDataOpen(true);
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

  const submitLocator = async (locator: string) => {
    try {
      const response = props.addLocator(locator);
      console.log(response);
      if (response) {
        onSuccessLocator();
        handleLocatorClose();
      } else {
        onError();
        handleLocatorClose();
      }
    } catch (error) {
      onError();
      console.log(error);
    }
  };

  const submitDataSheet = async (dataSheet: string) => {
    try {
      const response = props.addDataSheet(dataSheet);
      console.log(response);
      if (response) {
        onSuccessDataSheet();
        handleDataClose();
      } else {
        onError();
        handleDataClose();
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

  const deleteLocator = () => {
    handleConfCloseLocator();
    props.deleteLocator(selectedIndex);
  };

  const deleteDataSheet = () => {
    handleConfCloseData();
    props.deleteDataSheet(selectedIndex);
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
            if (
              route.name === "Test" ||
              route.name === "Locator" ||
              route.name === "Data"
            ) {
              return (
                <SubMenu
                  label={route.name}
                  icon={
                    <IconButton
                      onClick={() => {
                        if (route.name === "Test") {
                          handleOpen();
                        } else if (route.name === "Locator") {
                          handleLocatorOpen();
                        } else if (route.name === "Data") {
                          handleDataOpen(); // Assuming there's a separate function for 'Data'
                        }
                      }}
                    >
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
                          route.name === "Test" ||
                          route.name === "Locator" ||
                          route.name === "Data" ? (
                            <>
                              <IconButton onClick={handleOpen}>
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  if (route.name === "Test") {
                                    handleOpen();
                                  } else if (route.name === "Locator") {
                                    handleConfOpenLocator(index);
                                  } else if (route.name === "Data") {
                                    handleConfOpenData(index); // Assuming there's a separate function for 'Data'
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : null
                        }
                      >
                        <ItemName
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
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
      <LocatorAddForm
        open={locatorOpen}
        formName="Locator"
        handleClose={handleLocatorClose}
        confirmAction={submitLocator}
      />
      <DataSheetAddForm
        open={dataOpen}
        formName="Data Sheet"
        handleClose={handleDataClose}
        confirmAction={submitDataSheet}
      />
      <ConfirmationDialog
        open={openConf}
        formName="Test Suite"
        handleClose={handleConfClose}
        confirmAction={deleteTestSuiteA}
        confirmMsg="Are you sure to delete this test suite"
      />
      <ConfirmationDialog
        open={openConfDeleteData}
        formName="Data Sheet"
        handleClose={handleConfCloseData}
        confirmAction={deleteDataSheet}
        confirmMsg="Are you sure to delete this Data Sheet"
      />
      <ConfirmationDialog
        open={openConfDeleteLocator}
        formName="Locator"
        handleClose={handleConfCloseLocator}
        confirmAction={deleteLocator}
        confirmMsg="Are you sure to delete this Locator"
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
    background-color: ${(props) => (props.isActive ? "#e1e1e1" : "#f9f9f9")};
  }
`;

export const ItemName = Styled(Typography)`
  && {
    font-size: 14px;
    margin: 10px 0;
  }
`;
