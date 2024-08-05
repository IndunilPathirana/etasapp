import React from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { commands } from "../../../utils/commands";

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

  const commandsArray: { name: string }[] = commands;

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <TableWrapper>
            <Table columns={columns} />
          </TableWrapper>
        </Box>
        <Box sx={{ width: "50%" }}>
          <TableWrapper sx={{ padding: "20px" }}>
            <Typography>Command</Typography>
            <Autocomplete
              id="makeName"
              options={commandsArray}
              getOptionLabel={(option) => option.name}
              // onChange={(event, newValue) => {
              //     inputHandler(newValue);
              // }}
              style={{ height: "50px", marginBottom: "10px", width: "350px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f5f7f7",
                  }}
                  margin="normal"
                  size="small"
                />
              )}
              disableClearable
            />
          </TableWrapper>
        </Box>
      </Box>
    </ContentWrapper>
  );
}
