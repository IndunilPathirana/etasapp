import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import { Box, useTheme } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import { getJson } from "../../../api/exportService";

export default function Home() {
  const downloadJSON = () => {
    const jsonData = getJson();

    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with 2 spaces

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json"; // File name
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ContentWrapper>
      <Box
        sx={{
          height: "200px",
          width: "100%",
          backgroundColor: "#9aacbc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonComponent
          name="Export Json"
          color="#38b000"
          onClick={downloadJSON}
        />
      </Box>
    </ContentWrapper>
  );
}
