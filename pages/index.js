import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import AppointmentsPage from "./appointments/index.js";
import Instagram from "./instagram/index.js";

function AuthLinks() {
  const { data: session, status } = useSession(); //client side

  const loading = status === "loading";
  useEffect(() => {}, [session, status]);
  if (loading) return null;

  return (
    <>
      {session ? (
        <p>
          <span>Signed in as {session?.user?.username}</span>
          <button onClick={signOut}>Sign out</button>
          <AppointmentsPage />
          <Instagram />
        </p>
      ) : (
        <>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
    </>
  );
}

export default function IndexPage() {
  return <AuthLinks />;
}
