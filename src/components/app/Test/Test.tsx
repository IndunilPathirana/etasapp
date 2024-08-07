import React, { useEffect, useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import { TableWrapper } from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Command, commands } from "../../../utils/commands";
import ButtonComponent from "../../reusableComponents/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTestSheet, getTestSheets } from "../../../api/testSheetService";
import { useLocation } from "react-router-dom";

export default function Test() {
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 20,
      headerClassName: "#",
    },
    {
      field: "command",
      headerName: "Command",
      width: 200,
      headerClassName: "#",
    },
    {
      field: "data",
      headerName: "Data",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "locator",
      headerName: "Locator",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerClassName: "#",
      flex: 1,
      renderCell: () => (
        <Box>
          <IconButton
            color="primary"
            aria-label="delete"
            // onClick={() =>
            //    handleDelete(params.row._id)
            // }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            // onClick={() =>
            //    handleDelete(params.row._id)

            // }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [tableData, setTableData] = useState([
    {
      id: 1,
      command: "Based.Onvalue",
      data: "data",
      locator: "locator",
      action: "action",
    },
  ]);

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

  const location = useLocation();

  const submit = () => {
    const response = createTestSheet(
      { ...data, id:1},
      location.pathname.split("/")[2]
    );
    if(response){
      const data = getTestSheets(location.pathname.split("/")[2]);
      setTableData(data);
    }
  };

  useEffect(() => {
    const data = getTestSheets(location.pathname.split("/")[2]);
    setTableData(data);
  }, [location]);

  console.log(selectedCommand);

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <TableWrapper>
            <Table columns={columns} data={tableData} />
          </TableWrapper>
        </Box>
        <Box sx={{ width: "50%" }}>
          <TableWrapper sx={{ padding: "20px" }}>
            <Typography>Command</Typography>
            <Autocomplete
              id="makeName"
              options={commands}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSelectedCommand(newValue);
                handleInput('command',newValue?.name)
                console.log(newValue);
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
                />
              </>
            ) : null}
            {selectedCommand?.locator ? (
              <>
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
