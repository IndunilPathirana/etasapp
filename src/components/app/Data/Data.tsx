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
import { addDataColumn, getDataColumns } from "../../../api/dataService";
import ColumnAddForm from "./ColumnAddForm/ColumnAddForm";
import DataForm from "./DataForm/DataForm";
import { useLocation } from "react-router-dom";

export default function Data() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDataForm, setOpenDataForm] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<GridRowId>("");
  const location = useLocation();

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
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => {
              // handleOpenConf();
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
      field: string;
      headerName: string;
      width: number;
      headerClassName: string;
      renderCell?: (params: GridRenderCellParams) => number | JSX.Element;
    }[]
  >(columns);
  const [loading, setLoading] = useState<boolean>(true);

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

  const rowSelect = (newSelectionModel: GridRowSelectionModel) => {
    console.log("row selected");
    console.log("Selected Row IDs:", newSelectionModel[0]);
    setSelectedRow(newSelectionModel[0]);
  };

  const getColumns = () => {
    
    const response = getDataColumns(location.pathname.split("/")[2]);
    console.log(response);
    const modifiedColumns: {
      field: string;
      headerName: string;
      width: number;
      headerClassName: string;
      renderCell?: (params: GridRenderCellParams) => number | JSX.Element;
    }[] = response.map((column: string) => ({
      field: column,
      headerName: column,
      width: 100,
      headerClassName: "#", // Replace this with a valid class or value
    }));
    setTableColumns([...columns, ...modifiedColumns]);
    setLoading(false);
  };

  const submitColumn = (column: string) => {
    const response = addDataColumn(location.pathname.split("/")[2], column);
    getColumns();
    handleClose();
  };

  useEffect(() => {
    setLoading(true)
    getColumns();
    console.log("data")
  }, [location]);

  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Data Details</TableHeaderText>
        <ButtonComponent
          name="Add Data"
          onClick={handleOpenData}
          color="#38b000"
        />
      </TableHeader>
      <Box sx={{ display: "flex" }}>
        <TableWrapper sx={{ width: "fit-content" }}>
          {loading === false && (
            <Table columns={tableColumns} data={data} onRowSelect={rowSelect} />
          )}
        </TableWrapper>
        <Box sx={{ padding: "20px" }}>
          <ButtonComponent
            name="Add Column"
            onClick={handleOpen}
            color="#38b000"
          />
        </Box>
      </Box>
      <ColumnAddForm
        confirmAction={submitColumn}
        formName=""
        handleClose={handleClose}
        open={openForm}
        confirmMsg=""
      />
      <DataForm
        handleClose={handleCloseData}
        open={openDataForm}
        confirmMsg=""
      />
    </ContentWrapper>
  );
}
