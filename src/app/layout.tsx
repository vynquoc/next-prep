import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { getCurrentUser } from "@/lib/session";
import AdminNavbar from "@/components/(admin)/Navbar";

export const metadata = {
  title: "Next Prep",
  description: "Interview Preparation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
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
