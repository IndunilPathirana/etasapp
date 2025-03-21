import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import { Box, useTheme } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import { getJson } from "../../../api/exportService";

export default function Home() {
  const theme = useTheme();
  const submit = () => {
    getJson();
  };
  return (
    <ContentWrapper>
      <Box
        sx={{
          height: "200px",
          width: "100%",
          backgroundColor: theme.palette.primary.light,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonComponent name="Export Json" color="#38b000" onClick={submit} />
      </Box>
    </ContentWrapper>
  );
}
