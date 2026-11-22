'use client'
import "./reset.css"
import "./lija.css"
import "./layout.css";
import Link from "next/link";
import { StompSessionProvider } from "react-stomp-hooks";
import { ReactNode } from "react";

export default function ClientLayout({ elapsedMs, children }: { elapsedMs: number, children: ReactNode }) {

  return (
    <StompSessionProvider url={process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:8080/ws'}>
      <div className="content">
        <h1 className="site_title_wrap">
          <Link className="site_title" href="/" id="logo">Lija</Link>
          <div className="lija_time">{elapsedMs} ms.</div>
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
    </StompSessionProvider>
  );
}
