import React, { useState } from "react";
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

export default function Launcher() {
  const columns = [
    {
      field: "Sheet Name",
      headerName: "Sheet Name",
      width: 200,
      headerClassName: "#",
    },
    {
      field: "Test Case",
      headerName: "Test Case",
      width: 200,
      headerClassName: "#",
      // flex: 1,
    },
    {
      field: "Browser",
      headerName: "Browser",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "Test type",
      headerName: "Test type",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "Data Sheet",
      headerName: "Data Sheet",
      width: 100,
      headerClassName: "#",
    },
    {
      field: "Comment",
      headerName: "Comment",
      width: 100,
      flex: 1,
      headerClassName: "#",
    },
  ];

  const [openForm,setOpenForm] = useState<boolean>(false)

  const handleOpen = ()=>{
    setOpenForm(true)
  }
  
  const handleClose = ()=>{
    setOpenForm(false)
  }
  
  return (
    <ContentWrapper>
      <TableHeader>
        <TableHeaderText>Launcher Details</TableHeaderText>
        <ButtonComponent name="create" onClick={handleOpen} color="#38b000"/>
      </TableHeader>
      <TableWrapper>
        <Table columns={columns} />
      </TableWrapper>
      <LauncherForm handleClose={handleClose} open={openForm} />
    </ContentWrapper>
  );
}
