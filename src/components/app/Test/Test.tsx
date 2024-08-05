import React, { useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Command, commands } from "../../../utils/commands";
import ButtonComponent from "../../reusableComponents/Button/Button";

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

  const [selectedCommand, setSelectedCommand] = useState<Command>();
  const [data, setData] = useState<{
    [key: string]: string;
  }>();

  const handleInput = (target: string, value: string) => {
    setData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const submit = () => {};

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
              onChange={(event, newValue) => {
                setSelectedCommand(newValue);
              }}
              style={{ height: "50px", width: "350px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f5f7f7",
                  }}
                  size="small"
                />
              )}
              disableClearable
            />
            {selectedCommand?.data ? (
              <>
                {" "}
                <Typography>Data</Typography>
                <TextField
                  name="data"
                  sx={{ width: "350px" }}
                  InputProps={{
                    sx: { fontSize: 15, padding: "1px", height: "40px" },
                  }}
                  onChange={(event) => {
                    handleInput("data", event.target.value);
                  }}
                  value={data?.data}
                />{" "}
              </>
            ) : null}
            {selectedCommand?.locator ? (
              <>
                {" "}
                <Typography>Locator</Typography>
                <TextField
                  name="locator"
                  sx={{ width: "350px" }}
                  InputProps={{
                    sx: { fontSize: 15, padding: "1px", height: "40px" },
                  }}
                  onChange={(event) => {
                    handleInput("locator", event.target.value);
                  }}
                  value={data?.locator}
                />
              </>
            ) : null}
            <Box sx={{ marginTop: "10px" }}>
              <ButtonComponent name="submit" onClick={submit} color="#38b000" />
            </Box>
          </TableWrapper>
        </Box>
      </Box>
    </ContentWrapper>
  );
}
