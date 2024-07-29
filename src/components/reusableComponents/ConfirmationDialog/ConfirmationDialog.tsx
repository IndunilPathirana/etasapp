import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

type ConfirmationProps = {
  formName: string;
  confirmMsg?: string;
  open: boolean;
  handleClose: () => void;
  confirmAction: () => void;
};

export default function ConfirmationDialog(props: ConfirmationProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-object" sx={{ fontSize: "17px" }}>
        {"Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          {props.confirmMsg}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          autoFocus
          variant="contained"
          color="warning"
        >
          No
        </Button>
        <Button
          onClick={props.confirmAction}
          variant="contained"
          color="success"
          sx={{
            "&:hover": {},
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
