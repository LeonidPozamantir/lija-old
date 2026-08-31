import { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "lija - dev"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <header className="header">
          <h1 className="title">
            <Link href="/" id="logo">lija</Link>
          </h1>
        </header>
        <div className="content">
          {children}
        </div>
      </body>
    </html>
  );
}
