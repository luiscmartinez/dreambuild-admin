import { SessionProvider } from "next-auth/react";
import LogRocket from "logrocket";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  if (process.env.NODE_ENV === "production") {
    LogRocket.init("dgb/dreambuild");
  }
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
