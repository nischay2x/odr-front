import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducerList from "./reducers";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"

const store = createStore(reducerList, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
    typography: {
        fontFamily: [
          'Poppins',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    }
});

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
