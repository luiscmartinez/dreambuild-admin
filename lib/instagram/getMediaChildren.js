import axios from "axios";

export async function getMediaChildren(userAccessToken, mediaId) {
  const url = `https://graph.instagram.com/${mediaId}/children`;
  return axios.get(url, {
    params: {
      fields: "id,media_url,media_type",
      access_token: userAccessToken,
    },
  });
}
