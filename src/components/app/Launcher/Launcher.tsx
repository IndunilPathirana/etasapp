import React, { useEffect, useState } from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import LauncherTable from "./table/LauncherTable";
import { Box, Paper, styled, Typography } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import {
  TableHeader,
  TableHeaderText,
  TableWrapper,
} from "../../reusableComponents/StyledComponents/styledComponents";
import Table from "../../reusableComponents/Table/Table";
import LauncherForm from "./LauncherForm/LauncherForm";
import { getLaunchers } from "../../../api/launcherService";
import { GridRenderCellParams } from "@mui/x-data-grid";

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
  ];

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [data, setData] = useState([]);

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

  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Launcher Details</TableHeaderText>
        <ButtonComponent name="create" onClick={handleOpen} color="#38b000" />
      </TableHeader>
      <TableWrapper>
        <Table columns={columns} data={data} />
      </TableWrapper>
      <LauncherForm handleClose={handleClose} open={openForm} getAllLaunchers={getAllLaunchers}/>
    </ContentWrapper>
  );
}
