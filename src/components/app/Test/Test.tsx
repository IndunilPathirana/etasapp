import React from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import { Box } from "@mui/material";

export default function Test() {
  const columns = [
    {
      field: "#",
      headerName: "#",
      width: 20,
      headerClassName: "#",
    },
    {
      field: "command",
      headerName: "Command",
      width: 300,
      headerClassName: "#",
      flex: 1,
    },
    {
      field: "data",
      headerName: "Data",
      width: 70,
      headerClassName: "#",
    },
    {
      field: "locator",
      headerName: "Locator",
      width: 70,
      headerClassName: "#",
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerClassName: "#",
    },
  ];
  return (
    <ContentWrapper>
      <TableWrapper>
        <TableHeader>
          <TableHeaderText>Launcher Details</TableHeaderText>
        </TableHeader>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "50%" }}>
            <Table columns={columns} />
          </Box>
          <Box sx={{ width: "50%" }}>
          </Box>
        </Box>
      </TableWrapper>
    </ContentWrapper>
  );
}
