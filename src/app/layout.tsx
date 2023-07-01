import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
