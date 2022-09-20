// import "./App.css";
import {
  Routes, Route, Navigate,
  useNavigate, useLocation, Outlet
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Login, { ForgetPassword } from "./pages/login";
import { getUser } from "./actions/auth";

import { Button, Box, CircularProgress, Typography, Link } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { isLoggedIn, suspense } = user;
  const { pathname } = useLocation();

  useEffect(() => {
    if (user.isLoggedIn) {
      if (pathname) navigate(pathname);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(getUser(token));
        if (pathname) navigate(pathname);
      } else {
        if (pathname !== "/forget-password")
          navigate("/login", { replace: true });
      }
    }
  }, [user, dispatch, pathname, navigate]);

  return suspense ? (
    <Loading />
  ) : (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forget-password" element={<ForgetPassword />} />

      <Route
        path="/admin"
        element={<RequireAdminAuth role={user.role} loggedIn={isLoggedIn} />}
      >
        {/* <Route path="employees" element={<Layout><EmployeeList /></Layout>}/>
        <Route path="employees/:id" element={<Layout><EmployeeView /></Layout>}/>
        
        <Route path="projects" element={<Layout><ProjectList /></Layout>}/>
        <Route path="projects/:id" element={<Layout><ProjectView /></Layout>}/>

        <Route path="purchase-orders" element={<Layout><PurchaseList /></Layout>}/>
        <Route path="purchase-orders/:id" element={<Layout><PurchaseView /></Layout>}/>

        <Route path="vendor" element={<Layout><VendorList /></Layout>}/>
        <Route path="vendor/:id" element={<Layout><VendorView /></Layout>}/>

        <Route path="customer" element={<Layout><CustomerList/></Layout>}/>
        <Route path="customer/:id" element={<Layout><CustomerView /></Layout>}/> */}
      </Route>

      <Route path="/" element={<RequireAuth loggedIn={isLoggedIn} />}>
        {/* <Route path="/" element={<Layout><Home /></Layout>}/>
        <Route path="profile" element={<Layout><Profile /></Layout>}/>
        <Route path="projects/:id" element={<Layout><WorkerProject/></Layout>} /> */}
      </Route>

      <Route path="*" element={<Nothing />}></Route>
    </Routes>
  );
}

export default App;

function RequireAuth({ loggedIn }) {
  return loggedIn ? (
    <>
      <Outlet />
      {/* <AlertBox /> */}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

function RequireAdminAuth({ loggedIn, role = "user" }) {
  if (loggedIn) {
    if (role === "admin") {
      return (
        <>
          <Outlet />
          {/* <AlertBox />  */}
        </>
      );
    } else {
      return <AccessDenied />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
}

function Nothing() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" 
          sx={{width: "100%", height: "100vh"}}
        >
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="600"> 
            Nothing Here !!!
          </Typography>
          <br />
          <Link to="/">
            <Button variant="contained">Back To Home</Button>
          </Link>
        </Box>
      </Box>
  );
}

function AccessDenied() {
  return (
        <Box display="flex" alignItems="center" justifyContent="center" 
          sx={{width: "100%", height: "100vh"}}
        >
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="600"> 
            Access Denied !!!
          </Typography>
          <Typography variant="h6">
            Only Allowed to Admins.
          </Typography>
          <br />
          <Link to="/">
            <Button variant="contained">Back To Home</Button>
          </Link>
        </Box>
      </Box>
  );
}

function Loading() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" 
      sx={{width: "100%", height: "100vh"}}
    >
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="600">
          Logging In ...
        </Typography>
        <br />
        <CircularProgress />
      </Box>
    </Box>
  );
}
