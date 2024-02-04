"use client";

import { useEffect } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./globals.css";
import "@mantine/notifications/styles.css";

// export const metadata = {
//   title: "FlavorFiesta",
//   description: "Explore foreign recipies and cuisines",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <title>FlavorFiesta</title>
      <meta
        name="description"
        content="Explore foreign recipies and cuisines"
      />
      <body>
        <MantineProvider>
          <Notifications />
          <Provider store={store}>{children}</Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
