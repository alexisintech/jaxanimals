import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import "@uploadthing/react/styles.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={session}>
        <ThemeProvider>
          <div className="flex bg-gradient-to-br from-primary to-secondary">
            <div className="min-h-screen flex-grow">
              <Component {...pageProps} />
            </div>
          </div>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
