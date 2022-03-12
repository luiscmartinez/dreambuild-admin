import { getSession } from "next-auth/react";
import axios from "axios";
import url from "url";
import db from "../../../sequelize/models/index.js";

export default async function handler(req, res) {
  const code = req.query.code;
  const grant_type = "authorization_code";
  const client_id = process.env.INSTAGRAM_CLIENT_ID;
  const client_secret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirect_uri = process.env.INSTAGRAM_REDIRECT_URI;

  const params = new url.URLSearchParams({
    client_id,
    client_secret,
    code,
    grant_type,
    redirect_uri,
  }).toString();

  axios
    .post(`https://api.instagram.com/oauth/access_token`, params)
    .then((resp) => {
      const { access_token, user_id } = resp.data;
      axios
        .get(
          `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${access_token}`
        )
        .then((response) => {
          console.log("LONG LIVE TOKEN RESPONSE", response.data);
          const { access_token: accessToken } = response.data;
          db.Integration.create({
            id: 1,
            userId: String(user_id),
            accessToken,
          })
            .then((success) => {
              console.log(success);
            })
            .catch((err) => console.log(err));
          return response.data;
        });
    })
    .catch((err) => {
      console.log("ERROR", err.response);
    });
  return res.redirect(301, "https://8033-108-185-87-138.ngrok.io");
}
