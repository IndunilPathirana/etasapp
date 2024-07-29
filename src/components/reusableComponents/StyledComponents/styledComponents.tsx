import { Box, Paper, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const TableWrapper = styled(Paper)`
  padding: 20px;
  margin: 20px;
`;

export const TableHeader = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TableHeaderText = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
`;


