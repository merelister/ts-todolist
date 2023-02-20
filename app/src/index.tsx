import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          primaryShade: {
            light: 6,
            dark: 8,
          },
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          fontFamilyMonospace:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          headings: {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
            fontWeight: 700,
            sizes: {
              h1: { fontSize: 34, lineHeight: 1.3, fontWeight: undefined },
              h2: { fontSize: 26, lineHeight: 1.35, fontWeight: undefined },
              h3: { fontSize: 22, lineHeight: 1.4, fontWeight: undefined },
              h4: { fontSize: 18, lineHeight: 1.45, fontWeight: undefined },
              h5: { fontSize: 16, lineHeight: 1.5, fontWeight: undefined },
              h6: { fontSize: 14, lineHeight: 1.5, fontWeight: undefined },
            },
          },
          white: "#fff",
          black: "#000",
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
