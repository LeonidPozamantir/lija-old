import { Metadata } from "next";
import "./reset.css"
import "./lija.css"
import "./layout.css";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import ClientLayout from "./clientLayout";


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
          <NextIntlClientProvider>
            <ClientLayout children={children} elapsedMs={elapsedMs} />
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
