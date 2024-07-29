import React from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import { Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <ContentWrapper>
      <Box
        sx={{
          height: "200px",
          width: "200px",
          //backgroundColor: theme.palette.primary.main,
          
        }}
      ></Box>
    </ContentWrapper>
  );
}
