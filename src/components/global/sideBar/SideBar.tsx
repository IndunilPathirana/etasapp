/* eslint-disable jsx-a11y/alt-text */
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./customSidebar.css";
import styled from "styled-components";
import { styled as Styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import { Route, routes } from "../../../routes/routes";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <StyledSidebar>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}
      >
        <img src={Logo} style={{ width: "40px" }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", paddingLeft: "5px" }}
        >
          <Typography>EvonSys</Typography>
          <Typography fontSize={"12px"}>Evolution Innovation</Typography>
        </Box>
      </Box>
      <Menu style={{ marginTop: "20px" }}>
        {routes.map((route: Route) => {
          if (route.isSideBar === true) {
            return (
              <Link
                to={route.path}
                style={{ textDecoration: "none", color: "#686868" }}
              >
                <StyledMenuItem
                  isActive={location.pathname.includes(route.path)}
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
    </StyledSidebar>
  );
}

// Define an interface for the props
interface StyledMenuItemProps {
  isActive: boolean;
}

const StyledSidebar = styled(Sidebar)`
  background-color: #e9e9e9;
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
