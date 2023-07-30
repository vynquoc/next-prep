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
        {/* {user?.role === "user" ? (
          <Providers>
            <Navbar />
            <main>
              {children}
              <div id="modalPortal"></div>
            </main>
          </Providers>
        ) : (
          <Providers>
            <AdminNavbar />
            <main>
              {children}
              <div id="modalPortal"></div>
            </main>
          </Providers>
        )} */}
        <Providers>
          <Navbar />
          <main>
            {children}
            <div id="modalPortal"></div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
