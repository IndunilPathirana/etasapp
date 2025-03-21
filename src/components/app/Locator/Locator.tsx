import React, { useEffect, useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";
import { useSnackBars } from "../../../context/SnackBarContext";
import { Locator as LocatorType, locators } from "../../../utils/locators";
import {
  createSubLocator,
  getSubLocators,
  removeSubLocator,
} from "../../../api/subLacatorService";

export default function Locator() {
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
      field: "locator_name",
      headerName: "Name",
      width: 200,
      headerClassName: "#",
    },
    {
      field: "locator_value",
      headerName: "Value",
      width: 200,
      headerClassName: "#",
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.data === null) {
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

  const [selectedCommand, setSelectedCommand] = useState<LocatorType>();
  const [data, setData] = useState<{
    [key: string]: string | null;
  }>({
    id: null,
    locator_name: null,
    locator_value: null,
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
    console.log(data?.locator_name?.length === 0);
    console.log(location.pathname);
    console.log(location.search);
    console.log(location.hash);

    if (data?.locator_name?.length === 0 || data?.locator_value?.length === 0) {
      onError();
      return;
    }
    console.log({ ...data, id: uuidv4() });
    const response = createSubLocator(
      { ...data, id: uuidv4() },
      location.hash,
      onSuccess,
      onError
    );
    clearData();
    if (response) {
      fetchSubLocators();
    }
  };

  useEffect(() => {
    fetchSubLocators();
  }, [location]);

  const rowSelect = (newSelectionModel: GridRowSelectionModel) => {
    console.log("row selected");
    console.log("Selected Row IDs:", newSelectionModel[0]);
    setSelectedRow(newSelectionModel[0]);
  };

  const deleteSubLocator = () => {
    const response = removeSubLocator(
      location.pathname.split("/")[2],
      selectedRow.toString(),
      onSuccessDelete,
      onError
    );
    handleCloseConf();
    if (response) {
      fetchSubLocators();
    }
  };
  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message: "Sub Locator Added Successfully",
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
      message: "Sub Locator Deleted Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: "error",
      message: "There is an error",
    });
  };

  const fetchSubLocators = () => {
    const data = getSubLocators(location.hash);
    console.log(data);
    setTableData(data);
  };

  const handleOpenConf = () => {
    setOpenConf(true);
  };
  const handleCloseConf = () => {
    setOpenConf(false);
  };

  const clearData = () => {
    setData({
      id: null,
      locator_name: "",
      locator_value: "",
    });
  };

  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Locator Details Details</TableHeaderText>
      </TableHeader>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <TableWrapper>
            <Table columns={columns} data={tableData} onRowSelect={rowSelect} />
          </TableWrapper>
        </Box>
        <Box sx={{ width: "50%" }}>
          <TableWrapper sx={{ padding: "20px" }}>
            <Typography>Locator Name</Typography>
            <TextField
              sx={{ width: "350px", backgroundColor: "#f5f7f7" }}
              InputProps={{
                sx: { fontSize: 15, padding: "1px", height: "40px" },
              }}
              onChange={(event) =>
                handleInput("locator_name", event.target.value)
              }
              value={data?.locator_name}
            />
            <Typography>Locator Value</Typography>
            <TextField
              sx={{ width: "350px", backgroundColor: "#f5f7f7" }}
              InputProps={{
                sx: { fontSize: 15, padding: "1px", height: "40px" },
              }}
              onChange={(event) =>
                handleInput("locator_value", event.target.value)
              }
              value={data?.locator_value}
            />
            <Box sx={{ marginTop: "10px" }}>
              <ButtonComponent name="submit" onClick={submit} color="#38b000" />
            </Box>
          </TableWrapper>
        </Box>
      </Box>
      <ConfirmationDialog
        confirmAction={deleteSubLocator}
        formName=""
        handleClose={handleCloseConf}
        open={openConf}
        confirmMsg="Are you sure to delete this sub locator"
      />
    </ContentWrapper>
  );
}
