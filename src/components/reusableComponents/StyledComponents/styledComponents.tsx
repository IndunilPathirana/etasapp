import { Box, Paper, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const TableWrapper = styled(Paper)`
  /* padding: 20px; */
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

export const TableHeader = styled(Box)`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-bottom: 0px;
`;

export const TableHeaderText = styled(Typography)`
  font-family: 'Open Sans';
  font-size: 18px;
  font-weight: 700;
  color: #76767a;
`;


