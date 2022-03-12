export default function Instagram() {
  const redirectUrl = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  return (
    <button>
      <a
        href={`https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`}
        target="_blank"
      >
        connect to instagram
      </a>
    </button>
    // <button onClick={() => signIn("instagram")}>Sign in</button>
  );
}
