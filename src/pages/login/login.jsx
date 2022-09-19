import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginWithEmail } from "../../actions/auth.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, err } = useSelector((state) => state.user);

  const [data, setData] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithEmail(data.email, data.password));
  };

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
          <Typography variant="h5">Login</Typography>
        </Box>
        {Boolean(err) ? <Alert severity="error">{err}</Alert> : <></>}
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{ px: 4, pb: 3 }}
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
                    navigate("/forget-password", { replace: true });
                  }}
                >
                  Forget Password
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
