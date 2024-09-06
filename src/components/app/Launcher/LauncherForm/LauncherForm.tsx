import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTestSuites } from "../../../../api/testSuiteService";
import { useSnackBars } from "../../../../context/SnackBarContext";
import { createLauncher } from "../../../../api/launcherService";
import { v4 as uuidv4 } from "uuid";

type LauncherFormProps = {
  confirmMsg?: string;
  open: boolean;
  handleClose: () => void;
  getAllLaunchers: () => void;
};

export default function LauncherForm(props: LauncherFormProps) {
  const [formData, setFormData] = useState<{
    [key: string]: string | null;
  }>({
    id: null,
    sheetName: "null",
    testSuite: "null",
    browser: "null",
    testType: "null",
    status: "null",
    dataSheet: "null",
    comment: "null",
  });

  const [testSuites, setTestSuites] = useState<
    {
      name: string;
    }[]
  >([{ name: "" }]);

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
    props.handleClose()
    props.getAllLaunchers()
  };

  useEffect(() => {
    const testSuites = getTestSuites();
    setTestSuites(testSuites);
    console.log(testSuites);
  }, []);

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
        {"New Test Case"}
      </DialogTitle>
      <DialogContent sx={{ paddingInline: "15px" }}>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Sheet Name
        </DialogContentText>
        <TextField
          sx={{ width: "350px" }}
          InputProps={{
            sx: { fontSize: 15, padding: "1px", height: "40px" },
          }}
          onChange={(event) => handleInput("sheetName", event.target.value)}
          value={formData?.sheetName}
        />
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Test Case
        </DialogContentText>
        <Autocomplete
          id="commands"
          options={testSuites}
          getOptionLabel={(option) => option?.name}
          onChange={(event, newValue) => {
            handleInput("testSuite", newValue?.name);
          }}
          style={{ height: "50px", width: "350px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              variant="outlined"
              sx={{
                backgroundColor: "#f5f7f7",
              }}
              size="small"
            />
          )}
          disableClearable
        />

        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Browser
        </DialogContentText>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(event) => handleInput("browser", event.target.value)}
          value={formData?.browser}
        >
          <Grid container sx={{ width: "350px" }}>
            <Grid item lg={6}>
              <FormControlLabel
                value="Chrome"
                control={<Radio />}
                label="Chrome"
              />
            </Grid>
            <Grid item lg={6}>
              <FormControlLabel
                value="Firefox"
                control={<Radio />}
                label="Firefox"
              />
            </Grid>
            <Grid item lg={6}>
              <FormControlLabel
                value="Microsoft Edge"
                control={<Radio />}
                label="Microsoft Edge"
              />
            </Grid>
            <Grid item lg={6}>
              <FormControlLabel
                value="Internet Explore"
                control={<Radio />}
                label="Internet Explore"
              />
            </Grid>
          </Grid>
        </RadioGroup>

        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Test Type
        </DialogContentText>
        <Select
          value={formData?.testType || ""}
          onChange={(event) => handleInput("testType", event.target.value)}
          sx={{
            width: "350px",
          }}
          size="small"
        >
          <MenuItem value={"Sequential"}>Sequential</MenuItem>
          <MenuItem value={"Data Driven"}>Data Driven</MenuItem>
        </Select>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Status
        </DialogContentText>
        <Select
          value={formData?.status || ""}
          onChange={(event) => handleInput("status", event.target.value)}
          sx={{
            width: "350px",
          }}
          size="small"
        >
          <MenuItem value={"Enabled"}>Enabled</MenuItem>
          <MenuItem value={"Disabled"}>Disabled</MenuItem>
        </Select>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Data Sheet
        </DialogContentText>
        <Select
          value={formData?.dataSheet || ""}
          onChange={(event) => handleInput("dataSheet", event.target.value)}
          sx={{
            width: "350px",
          }}
          size="small"
        >
          {/* <MenuItem value={"DAILY"}>Daily</MenuItem>
          <MenuItem value={"MONTHLY"}>Monthly</MenuItem> */}
        </Select>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Comment
        </DialogContentText>
        <TextField
          sx={{ width: "350px" }}
          InputProps={{
            sx: { fontSize: 15, padding: "1px", height: "40px" },
          }}
          value={formData?.comment || ""}
          onChange={(event) => handleInput("comment", event.target.value)}
        />
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
