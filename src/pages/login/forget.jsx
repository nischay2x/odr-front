import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState, useReducer } from "react";

import { loginWithEmail } from "../../actions/auth.js";
import { forgetPassword, resetPassword } from "../../api/auth.js";

const initialState = { suspense: false, err: "", step: 1 };
const localReducer = (state, action) => {
  switch(action.type){
    case "SUSPENSE": return { ...state, suspense: true, err: "" };
    case "ERROR": return { ...state, err: action.payload, suspense: false };
    case "STEP-2": return { ...state, suspense: false, err: "", step: 2};
    case "STEP-1": return { ...state, suspense: false, err: "", step: 1};
  }
}

const emptyData = { email: "", newPassword: "", otp: "" };

export default function ForgetPassword() {
  const [state, dispatch] = useReducer(localReducer, initialState);

  const [data, setData] = useState(emptyData);
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUSPENSE" });
    try {
      dispatch({ type: "STEP-2" });
      await forgetPassword(data.email);
    } catch (error) {
      const res = error.response?.data;
      dispatch({ type: "ERROR", payload: res?.error || error.message });
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUSPENSE" });
    try {
      const res = await resetPassword(data.email, data.otp, data.newPassword);
      
    } catch (error) {
      const res = error.response?.data;
      dispatch({ type: "ERROR", payload: res?.error || error.message });
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      sx={{
        background:
          "linear-gradient(30deg, rgba(0,206,244,1) 35%, rgba(0,164,255,1) 100%)"
      }}
    >
      <Paper elevation={3}>
        <Box px={4} pt={2} pb={1}>
          <Typography variant="h5">
            { state.step === 1 ? "Forget Password": "Reset Password"}
          </Typography>
        </Box>
        {Boolean(state.err) ? <Alert severity="error">{state.err}</Alert> : <></>}
        {
          state.step === 1 ?
        <Box
          component="form"
          onSubmit={handleEmailSubmit}
          sx={{ px: 4, pb: 3, pt: 1 }}
          maxWidth={500}
        >
          <Grid container spacing={2}>
            <Grid item md={12} lg={12}>
              <TextField
                value={data.email}
                type="email"
                label="Email"
                onChange={handleInputChange}
                name="email"
                required
                fullWidth
                size="small"
              />
            </Grid>
            
            <Grid item md={12} lg={12}>
                <Button color="primary" type="submit" variant="contained">
                  Submit
                </Button>
            </Grid>
          </Grid>
        </Box>
        :
        <Box
          component="form"
          onSubmit={handleResetPassword}
          sx={{ px: 4, pb: 3, pt: 1 }}
          maxWidth={500}
        >
          <Grid container spacing={2}>
            <Grid item md={12} lg={12}>
              <TextField
                value={data.email}
                type="email"
                label="Email"
                onChange={() => {}}
                disabled={true}
                name="email"
                required
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <TextField
                value={data.otp}
                label="OTP"
                onChange={handleInputChange}
                name="otp"
                required
                fullWidth 
                size="small"
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <TextField
                value={data.password}
                type="password"
                label="Password"
                onChange={handleInputChange}
                name="password"
                required
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item md={12} lg={12}>
               <Grid container justifyContent="space-between">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setData(emptyData);
                    dispatch({ type: "STEP-1" });
                  }}
                >
                  Change Email
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        }
      </Paper>
    </Box>
  );
}
