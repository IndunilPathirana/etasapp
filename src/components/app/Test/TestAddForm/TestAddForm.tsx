import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

type TestFormProps = {
  formName: string;
  confirmMsg?: string;
  open: boolean;
  handleClose: () => void;
  confirmAction: (action:string) => void;
};

export default function TestAddForm(props: TestFormProps) {
  const [testSuiteName, setTestSuiteName] = useState<string>("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTestSuiteName(event.target.value);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
    >
      <DialogTitle
        id="delete-object"
        sx={{
          fontSize: "18px",
          padding: "12px",
          width: "250px",
          fontWeight: "500",
        }}
      >
        {props.formName}
      </DialogTitle>
      <DialogContent sx={{ paddingInline: "12px" }}>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Enter page name
        </DialogContentText>
        <TextField
          sx={{ width: "250px" }}
          InputProps={{
            sx: { fontSize: 15, padding: "1px", height: "40px" },
          }}
          onChange={handleInput}
          value={testSuiteName}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.handleClose()}
          autoFocus
          variant="contained"
          color="warning"
        >
          Close
        </Button>
        <Button
          onClick={()=>props.confirmAction(testSuiteName)}
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
