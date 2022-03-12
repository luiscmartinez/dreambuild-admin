import { useEffect, useState } from "react";

export default function Instagram() {
  const redirectUrl = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("api/integrations")
      .then((res) => res.json())
      .then(({ integration }) => {
        console.log("DATA", integration);
        setData(integration);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data)
    return (
      <button>
        <a
          href={`https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`}
          target="_blank"
        >
          connect to instagram
        </a>
      </button>
    );
  return <div>instagram is connected to: {data.username.toUpperCase()}</div>;
}
