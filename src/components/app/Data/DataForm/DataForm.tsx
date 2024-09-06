import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackBars } from "../../../../context/SnackBarContext";
import { createLauncher } from "../../../../api/launcherService";
import { v4 as uuidv4 } from "uuid";
import { getDataColumns } from "../../../../api/dataService";
import { useLocation } from "react-router-dom";

type DataFormProps = {
  confirmMsg?: string;
  open: boolean;
  handleClose: () => void;
};

export default function DataForm(props: DataFormProps) {
  const [formData, setFormData] = useState<{
    [key: string]: string | null;
  }>();
  const location = useLocation();
  const [dataFields, setDataFields] = useState<string[]>([]);

  const { addSnackBar } = useSnackBars();

  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message: "Launcher Added Successfully",
    });
  };

  const onError = () => {
    addSnackBar({
      type: "error",
      message: "There is an error",
    });
  };

  const handleInput = (target: string, value: string) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const submitForm = () => {
    createLauncher(
      {
        ...formData,
        id: uuidv4(),
      },
      onSuccess,
      onError
    );
    props.handleClose();
  };

  useEffect(() => {
    const response = getDataColumns(location.pathname.split("/")[2]);
    setDataFields(response);
    console.log(response);
  }, [location]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
      sx={{
        "& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        id="delete-object"
        sx={{
          fontSize: "18px",
          padding: "15px",
          width: "250px",
          fontWeight: "500",
        }}
      >
        {"Data Form"}
      </DialogTitle>
      <DialogContent sx={{ paddingInline: "15px" }}>
        {dataFields.map((field: string) => (
          <>
            <DialogContentText
              id="delete-description"
              sx={{ fontSize: "15px" }}
            >
              {field}
            </DialogContentText>
            <TextField
              sx={{ width: "350px" }}
              InputProps={{
                sx: { fontSize: 15, padding: "1px", height: "40px" },
              }}
              onChange={(event) => handleInput(`${field}`, event.target.value)}
              value={formData?.[field]}
            />
          </>
        ))}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={props.handleClose}
          autoFocus
          variant="contained"
          color="warning"
        >
          Cancel
        </Button>
        <Button
          onClick={submitForm}
          variant="contained"
          color="success"
          sx={{
            "&:hover": {},
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
