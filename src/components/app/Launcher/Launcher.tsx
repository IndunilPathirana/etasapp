import React from "react";
import { ContentWrapper } from "../../global/contentWrapper/contentWrapper";
import LauncherTable from "./table/LauncherTable";
import { Box, Paper, styled, Typography } from "@mui/material";
import ButtonComponent from "../../reusableComponents/Button/Button";
import { TableHeader, TableHeaderText, TableWrapper } from "../../reusableComponents/StyledComponents/styledComponents";

export default function Launcher() {
  return (
    <ContentWrapper>
      <TableWrapper>
        <TableHeader>
         <TableHeaderText>Launcher Details</TableHeaderText>
         <ButtonComponent name="create"/>
        </TableHeader>
        <LauncherTable />
      </TableWrapper>
    </ContentWrapper>
  );
}
