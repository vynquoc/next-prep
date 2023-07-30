import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

export const metadata = {
  title: "Next Prep",
  description: "Interview Preparation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <div id="modalPortal"></div>
        </Providers>
      </body>
    </html>
  );
}
