import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

export const metadata = {
  title: "Next Prep",
  description: "Interview Preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
