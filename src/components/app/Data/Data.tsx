import React, { useEffect, useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import ButtonComponent from "../../reusableComponents/Button/Button";
import Table from "../../reusableComponents/Table/Table";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import ConfirmationDialog from "../../reusableComponents/ConfirmationDialog/ConfirmationDialog";
import {
  addDataColumn,
  getData,
  getDataColumns,
  removeData,
  removeDataColumn,
} from "../../../api/dataService";
import ColumnAddForm from "./ColumnAddForm/ColumnAddForm";
import DataForm from "./DataForm/DataForm";
import { useLocation } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import { v4 as uuidv4 } from "uuid";

export default function Data() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDataForm, setOpenDataForm] = useState<boolean>(false);
  const [data, setData] = useState<{ id: string; [key: string]: string }[]>([]);
  const [selectedRow, setSelectedRow] = useState<GridRowId>("");
  const [selectedData, setSelectedData] = useState<{
    id: string;
    [key: string]: string;
  }>();
  const [action, setAction] = useState<"EDIT" | "ADD">("ADD");
  const location = useLocation();

  const { addSnackBar } = useSnackBars();

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
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "#",
      renderCell: () => (
        <Box>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={(event) => {
              // event.stopPropagation();
              console.log("edit");
              openEditDataForm();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => {
              handleOpenConf();
              console.log("delete row");
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [tableColumns, setTableColumns] = useState<
    {
      id?: string;
      field: string;
      headerName: string;
      width: number;
      headerClassName: string;
      renderCell?: (params: GridRenderCellParams) => number | JSX.Element;
    }[]
  >(columns);
  const [loading, setLoading] = useState<boolean>(true);
  const [openConf, setOpenConf] = useState<boolean>(false);

  const [openConfColumnDelete, setOpenConfColumnDelete] =
    useState<boolean>(false);

  const [removingColumn, setRemovingColumn] = useState<string>("");

  const deleteData = () => {
    console.log(selectedRow.toString());
    const response = removeData(
      location.pathname.split("/")[2],
      selectedRow.toString(),
      onSuccessDelete,
      onError
    );
    handleCloseConf();
    if (response) {
      getTableData();
    }
  };

  const handleOpenConf = () => {
    setOpenConf(true);
  };
  const handleCloseConf = () => {
    setOpenConf(false);
  };

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleOpenData = () => {
    setOpenDataForm(true);
  };

  const handleCloseData = () => {
    setOpenDataForm(false);
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: "warning",
      message: "Data Deleted Successfully",
    });
  };

  const onError = () => {
    addSnackBar({
      type: "error",
      message: "There is an error",
    });
  };

  const rowSelect = (newSelectionModel: GridRowSelectionModel) => {
    console.log("row selected");
    console.log("Selected Row IDs:", newSelectionModel[0]);
    setSelectedRow(newSelectionModel[0]);
    const filteredData = data.find((item) => item?.id === newSelectionModel[0]);
    console.log(filteredData);
    setSelectedData(filteredData);
  };

  const getColumns = () => {
    const decodedPath = decodeURIComponent(location.pathname);
    const response = getDataColumns(decodedPath.split("/")[2]);
    console.log(response);
    const modifiedColumns: {
      id?: string;
      field: string;
      headerName: string;
      width: number;
      headerClassName: string;
      renderCell?: (params: GridRenderCellParams) => number | JSX.Element;
    }[] = response.map((column: { id: string; column: string }) => ({
      id: column.id,
      field: column.column,
      headerName: column.column,
      width: 100,
      headerClassName: "#", // Replace this with a valid class or value
    }));
    let newColumns: {
      field: string;
      headerName: string;
      width: number;
      headerClassName: string;
      renderCell?: (params: GridRenderCellParams) => number | JSX.Element;
    }[] = [columns[0]];
    newColumns = newColumns.concat(modifiedColumns);
    newColumns.push(columns[1]);
    setTableColumns(newColumns);
    setLoading(false);
  };

  const submitColumn = (column: string) => {
    // Decode the pathname to replace %20 with spaces
    const decodedPath = decodeURIComponent(location.pathname);
    console.log(decodedPath.split("/")[2]);
    const response = addDataColumn(decodedPath.split("/")[2], {
      id: uuidv4(),
      column: column,
    });
    getColumns();
    handleClose();
    getTableData();
  };

  const getTableData = () => {
    const decodedPath = decodeURIComponent(location.pathname);
    const response = getData(decodedPath.split("/")[2]);
    setData(response);
  };

  useEffect(() => {
    setLoading(true);
    getColumns();
    getTableData();
    console.log("data");
  }, [location]);

  const openEditDataForm = () => {
    setAction("EDIT");
    setOpenDataForm(true);
  };

  const onRemoveColumn = (columnId: string) => {
    handleOpenConfDeleteColumn();
    console.log("Remove Collumn " + columnId);
    setRemovingColumn(columnId);
  };

  const handleOpenConfDeleteColumn = () => {
    setOpenConfColumnDelete(true);
  };
  const handleCloseConfDeleteColumn = () => {
    setOpenConfColumnDelete(false);
  };

  const onSuccessDeleteColumn = () => {
    addSnackBar({
      type: "warning",
      message: "Data Column Deleted Successfully",
    });
  };

  const onErrorDeleteColumn = () => {
    addSnackBar({
      type: "warning",
      message: "Data Column Deleted Successfully",
    });
  };

  const removeColumn = () => {
    const decodedPath = decodeURIComponent(location.pathname);

    const response = removeDataColumn(
      decodedPath.split("/")[2],
      removingColumn
    );
    if (response) {
      onSuccessDeleteColumn();
      handleCloseConfDeleteColumn();
      getColumns();
      getTableData();
    } else {
      onErrorDeleteColumn();
    }
  };

  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Data Details</TableHeaderText>
      </TableHeader>
      <Box sx={{ display: "flex" }}>
        <TableWrapper sx={{ width: "fit-content" }}>
          {loading === false && (
            <Table
              columns={tableColumns}
              data={data}
              onRowSelect={rowSelect}
              onRemoveColumn={onRemoveColumn}
            />
          )}
        </TableWrapper>
        <Box sx={{ padding: "20px", display: "flex" }}>
          <Box sx={{ padding: "10px" }}>
            <ButtonComponent
              name="Add Column"
              onClick={handleOpen}
              color="#38b000"
            />
          </Box>
          <Box sx={{ padding: "10px" }}>
            <ButtonComponent
              name="Add Data"
              onClick={handleOpenData}
              color="#38b000"
            />
          </Box>
        </Box>
      </Box>
      <ColumnAddForm
        confirmAction={submitColumn}
        formName=""
        handleClose={handleClose}
        open={openForm}
        confirmMsg=""
      />
      {openDataForm ? (
        <DataForm
          handleClose={handleCloseData}
          open={openDataForm}
          confirmMsg=""
          getTableData={getTableData}
          data={selectedData}
          action={action}
        />
      ) : null}
      <ConfirmationDialog
        confirmAction={deleteData}
        formName=""
        handleClose={handleCloseConf}
        open={openConf}
        confirmMsg="Are you sure to delete this data"
      />
      <ConfirmationDialog
        confirmAction={removeColumn}
        formName=""
        handleClose={handleCloseConfDeleteColumn}
        open={openConfColumnDelete}
        confirmMsg="Are you sure to remove this column"
      />
    </ContentWrapper>
  );
}
