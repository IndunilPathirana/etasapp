import React from "react";
import {
  DataGrid,
  GridColumnMenuProps,
  GridSlotsComponentsProps,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, MenuItem, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

type TableProps = {
  columns: {
    id?: string;
    field: string;
    headerName: string;
    width: number;
    headerClassName?: string;
    flex?: number;
  }[];
  data: {}[];
  onRowSelect?: (newSelectionModel: GridRowSelectionModel) => void;
  onRemoveColumn?: (columnId:string) => void;
};

// Define a custom interface that extends GridColumnMenuProps
interface CustomColumnMenuProps extends GridColumnMenuProps {
  onRemoveColumn?: (columnId: string) => void; // Add the custom prop
}

export default function Table(props: TableProps) {
  const getRowHeight = () => 40;

  // Custom Column Menu Component
  const CustomColumnMenu = (props: CustomColumnMenuProps) => {
    const { hideMenu, colDef, onRemoveColumn } = props;

    // Access the column ID (field) from colDef
    const columnId = colDef.field;

    return (
      <React.Fragment>
        <MenuItem
          onClick={() => {
            if (onRemoveColumn) {
              onRemoveColumn(columnId); // Call the function passed from the Table component
            }
            //hideMenu(); // Close the menu
          }}
        >
          Remove Column
        </MenuItem>
      </React.Fragment>
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          height: 400,
          // width: "99%",
        }}
      >
        <StyledDataGrid
          //checkboxSelection
          key={props.columns.length} // Force re-render when columns change
          rows={props.data}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          // getRowId={getRowId} // Specify the custom ID function
          //disableSelectionOnClick
          onRowSelectionModelChange={props?.onRowSelect}
          getRowHeight={getRowHeight}
          sx={{ width: "auto" }}
          slots={{
            columnMenu: CustomColumnMenu, // Use the custom column menu
          }}
          slotProps={{
            columnMenu: {
              onRemoveColumn: props.onRemoveColumn, // Pass the custom prop
            } as GridSlotsComponentsProps["columnMenu"], // Ensure type compatibility
          }}
        />
      </Box>
    </div>
  );
}

function customCheckbox(theme: Theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
      border: "none",
      color: "green",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "transparent",
      color: "green",
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: "10px",
  width: "100%",
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnHeaders": {
    borderRadius: "15px", // Adjust the border radius as needed
  },
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#E0E0E0",
    border: "1px solid " + "theme.coreColors.primary",

    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: "rgb(227,226,224)",
      zIndex: 20,
      boxShadow: "",
      cursor: "pointer",
    },
    borderBottom: `none`,
  },
  " .MuiDataGrid-cell": {
    borderRight: `1px solid #CCC`,
    borderLeft: `1px solid #CCC`,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#7ABBF5",
    color: "white",
    fontSize: "15px",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    fontSize: "15px",
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none", // Remove focus outline on cells
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .css-axafay-MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },
  "& .css-wop1k0-MuiDataGrid-footerContainer": {
    display: "none",
  },

  ...customCheckbox(theme),
}));
