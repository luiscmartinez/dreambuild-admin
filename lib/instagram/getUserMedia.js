import axios from "axios";

export async function getUserMedia(userAccessToken) {
  const url = "https://graph.instagram.com/v12.0/me/media";
  return axios.get(url, {
    params: {
      fields: "id,caption,media_type,media_url,thumbnail_url",
      access_token: userAccessToken,
    },
  });
}
