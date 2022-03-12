import axios from "axios";

export async function queryUserNode(userAccessToken) {
  const url = "https://graph.instagram.com/v12.0/me";

  return axios.get(url, {
    params: {
      fields: "id,username,account_type",
      access_token: userAccessToken,
    },
  });
}
