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
import {
  createTestSheet,
  getTestSheets,
  removeTestSheet,
} from "../../../api/testSheetService";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

export default function Test() {
  const columns = [
    {
      field: "",
      headerName: "#",
      width: 20,
      headerClassName: "#",
      renderCell: (params: GridRenderCellParams) => {
        if (
          params.api.getRowIndexRelativeToVisibleRows(params.id) === undefined
        ) {
          return 1;
        } else {
          return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
        }
      },
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
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.data === null) {
          return "null";
        }
      },
    },
    {
      field: "locator",
      headerName: "Locator",
      width: 100,
      headerClassName: "#",
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.locator === null) {
          return "null";
        }
      },
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
            onClick={(event) => {
              // event.stopPropagation();
              console.log("edit");
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => {
              handleOpenConf();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [tableData, setTableData] = useState([]);

  const [selectedCommand, setSelectedCommand] = useState<Command>();
  const [data, setData] = useState<{
    [key: string]: string | null;
  }>({
    id: null,
    command: null,
    data: null,
    locator: null,
  });
  const [selectedRow, setSelectedRow] = useState<GridRowId>("");
  const [openConf, setOpenConf] = useState<boolean>(false);

  const { addSnackBar } = useSnackBars();

  const handleInput = (target: string, value: string) => {
    setData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const location = useLocation();

  const submit = () => {
    console.log({ ...data, id: uuidv4() });
    const response = createTestSheet(
      { ...data, id: uuidv4() },
      location.pathname.split("/")[2],
      onSuccess,
      onError
    );
    if (response) {
      fetchTestSheets();
    }
  };

  useEffect(() => {
    fetchTestSheets();
  }, [location]);

  const rowSelect = (newSelectionModel: GridRowSelectionModel) => {
    console.log("row selected");
    console.log("Selected Row IDs:", newSelectionModel[0]);
    setSelectedRow(newSelectionModel[0]);
  };

  const deleteTestSheet = () => {
    const response = removeTestSheet(
      location.pathname.split("/")[2],
      selectedRow.toString(),
      onSuccessDelete,
      onError
    );
    handleCloseConf();
    if (response) {
      fetchTestSheets();
    }
  };
  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message: "Test Suite Added Successfully",
    });
  };
  const onSuccessEdit = () => {
    addSnackBar({
      type: "success",
      message: "Test Suite updated Successfully",
    });
  };
  const onSuccessDelete = () => {
    addSnackBar({
      type: "warning",
      message: "Test Suite Deleted Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: "error",
      message: "There is an error",
    });
  };

  const fetchTestSheets = () => {
    const data = getTestSheets(location.pathname.split("/")[2]);
    setTableData(data);
  };

  const handleOpenConf = () => {
    setOpenConf(true);
  };
  const handleCloseConf = () => {
    setOpenConf(false);
  };

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <TableWrapper>
            <Table columns={columns} data={tableData} onRowSelect={rowSelect} />
          </TableWrapper>
        </Box>
        <Box sx={{ width: "50%" }}>
          <TableWrapper sx={{ padding: "20px" }}>
            <Typography>Command</Typography>
            <Autocomplete
              id="commands"
              options={commands}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSelectedCommand(newValue);
                handleInput("command", newValue?.name);
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
      <ConfirmationDialog
        confirmAction={deleteTestSheet}
        formName=""
        handleClose={handleCloseConf}
        open={openConf}
        confirmMsg="Are you sure to delete this test sheet"
      />
    </ContentWrapper>
  );
}
