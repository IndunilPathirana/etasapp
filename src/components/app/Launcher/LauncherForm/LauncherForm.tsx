import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

type LauncherFormProps = {
  confirmMsg?: string;
  open: boolean;
  handleClose: () => void;
  // confirmAction: () => void;
};

export default function LauncherForm(props: LauncherFormProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
      sx={{ 
        "& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop":{
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
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
          // onChange={handleInput}
          // value={testSuiteName}
        />
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Test Case
        </DialogContentText>
        <TextField
          sx={{ width: "350px" }}
          InputProps={{
            sx: { fontSize: 15, padding: "1px", height: "40px" },
          }}
          // onChange={handleInput}
          // value={testSuiteName}
        />
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Browser
        </DialogContentText>

        <Grid container sx={{ width: "350px" }}>
          <Grid item lg={6} >
            <FormControlLabel
              value="Chrome"
              control={<Radio />}
              label="Chrome"
            />
          </Grid>
          <Grid item lg={6} >
            <FormControlLabel
              value="Firefox"
              control={<Radio />}
              label="Firefox"
            />
          </Grid>
          <Grid item lg={6} >
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
        {/* <FormControl sx={{ width: "250px" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Chrome"
              control={<Radio />}
              label="Chrome"
            />
            <FormControlLabel
              value="Firefox"
              control={<Radio />}
              label="Firefox"
            />
            <FormControlLabel
              value="Microsoft Edge"
              control={<Radio />}
              label="Microsoft Edge"
            />
            <FormControlLabel
              value="Internet Explore"
              control={<Radio />}
              label="Internet Explore"
            />
          </RadioGroup>
        </FormControl> */}
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          Test Type
        </DialogContentText>
        <Select
          // value={formData?.salaryType || ""}
          // onChange={(e) =>
          //   handleChange(e?.target?.value || "", "salaryType")
          // }
          // disabled={state?.action === DEF_ACTIONS.VIEW}
          sx={{
            //   borderRadius: "8px",
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
          // value={formData?.salaryType || ""}
          // onChange={(e) =>
          //   handleChange(e?.target?.value || "", "salaryType")
          // }
          // disabled={state?.action === DEF_ACTIONS.VIEW}
          sx={{
            //   borderRadius: "8px",
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
          // value={formData?.salaryType || ""}
          // onChange={(e) =>
          //   handleChange(e?.target?.value || "", "salaryType")
          // }
          // disabled={state?.action === DEF_ACTIONS.VIEW}
          sx={{
            //   borderRadius: "8px",
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
          // onChange={handleInput}
          // value={testSuiteName}
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
          // onClick={props.confirmAction}
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
