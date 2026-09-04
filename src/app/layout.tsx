import { Metadata } from "next";
import "./reset.css"
import "./lija.css"
import "./layout.css";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "lija - dev"
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const requestHeaders = await headers();
  const started = Number(requestHeaders.get('x-app-request-start'));
  const elapsedMs = Date.now() - started;

  return (
    <html>
      <body>
        <div className="content">
          <h1 className="site_title_wrap">
            <Link className="site_title" href="/" id="logo">Lija</Link>
            <div className="lija_time">{elapsedMs / 1000} s.</div>
          </h1>
          <div id="lija">
            {children}
          </div>
        </div>
        <footer className="footer_wrap">
          <div className="footer">
            Open source software built with Next.js <br />
            <a href="https://github.com/LeonidPozamantir/lija-old">Lija source code on Github</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
