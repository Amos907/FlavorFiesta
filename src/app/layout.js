import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./globals.css";
import "@mantine/notifications/styles.css";

export const metadata = {
  title: "FlavorFiesta",
  description: "Explore foreign recipies and cuisines",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
