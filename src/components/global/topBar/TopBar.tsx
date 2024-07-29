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
        boxShadow:' 0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: "#e9e9e9",
        height: "70px",
      }}
    >
      <Box></Box>
      <Box  sx={{ display:'flex',alignItems:'center' }}>
        <IconButton onClick={toggleColorMode} sx={{ width:'50px', height:'50px'}}>
          {true ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton sx={{ width:'50px', height:'50px'}}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ width:'50px', height:'50px'}}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
