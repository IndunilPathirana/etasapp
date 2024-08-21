import React, { useEffect, useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import LauncherTable from "./table/LauncherTable";
import { Box, IconButton, Paper, styled, Typography } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import LauncherForm from "./LauncherForm/LauncherForm";
import { getLaunchers, removeLauncher } from "../../../api/launcherService";
import {
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";
import { useSnackBars } from "../../../context/SnackBarContext";

export default function Launcher() {
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
      field: "sheetName",
      headerName: "Sheet Name",
      width: 200,
      headerClassName: "#",
    },
    {
      field: "testSuite",
      headerName: "Test Case",
      width: 200,
      headerClassName: "#",
      // flex: 1,
    },
    {
      field: "browser",
      headerName: "Browser",
      width: 200,
      headerClassName: "#",
    },
    {
      field: "testType",
      headerName: "Test type",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "dataSheet",
      headerName: "Data Sheet",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 100,
      flex: 1,
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

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [openConf, setOpenConf] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<GridRowId>("");

  const { addSnackBar } = useSnackBars();

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    getAllLaunchers();
  }, []);

  const getAllLaunchers = () => {
    const response = getLaunchers();
    setData(response);
  };

  const deleteLauncher = () => {
    removeLauncher(selectedRow.toString(), onSuccessDelete, onError);
    getAllLaunchers();
    handleCloseConf();
  };
  const handleOpenConf = () => {
    setOpenConf(true);
  };
  const handleCloseConf = () => {
    setOpenConf(false);
  };

  const rowSelect = (newSelectionModel: GridRowSelectionModel) => {
    console.log("row selected");
    console.log("Selected Row IDs:", newSelectionModel[0]);
    setSelectedRow(newSelectionModel[0]);
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: "warning",
      message: "Launcher Deleted Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: "error",
      message: "There is an error",
    });
  };

  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Launcher Details</TableHeaderText>
        <ButtonComponent name="create" onClick={handleOpen} color="#38b000" />
      </TableHeader>
      <TableWrapper>
        <Table columns={columns} data={data} onRowSelect={rowSelect} />
      </TableWrapper>
      <LauncherForm
        handleClose={handleClose}
        open={openForm}
        getAllLaunchers={getAllLaunchers}
      />
      <ConfirmationDialog
        confirmAction={deleteLauncher}
        formName=""
        handleClose={handleCloseConf}
        open={openConf}
        confirmMsg="Are you sure to delete this launcher"
      />
    </ContentWrapper>
  );
}
