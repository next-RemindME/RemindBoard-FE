import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./style/theme";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router/router";
import { GlobalStyle } from "./style/global";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <RouterProvider router={routers} />
    </ThemeProvider>
  </RecoilRoot>
);
