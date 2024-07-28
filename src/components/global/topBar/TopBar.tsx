import { Box, IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ColorModeContext } from "../../../theme";

export default function TopBar() {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      position="sticky"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#e9e9e9",
        height: "70px",
      }}
    >
      <Box></Box>
      <Box display="flex" borderRadius="310px">
        <IconButton onClick={toggleColorMode}>
          {true ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
