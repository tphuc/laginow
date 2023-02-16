import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import { trpc } from '@/lib/trpc';
import { ToastProvider } from "@/components/shared/toast/toast-context";
import { ToastContainer } from "@/components/shared/toast";
import { NextComponentType, NextPage } from "next";
import { ReactNode } from "react";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
  pageProps: { session: Session }
};



const MyApp = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  const getLayout = Component?.getLayout || ((page: React.ReactNode) => page);

  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <RWBProvider>

          <main className={cx(sfPro.variable, inter.variable)}>
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
          </main>
        </RWBProvider>
      </ToastProvider>
      <Analytics />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);