import { getSession } from "next-auth/react";
import axios from "axios";
import url from "url";
import db from "../../../sequelize/models/index.js";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const code = req.query.code;
  const grant_type = "authorization_code";
  const client_id = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const client_secret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;

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
      const { access_token, user_id: providerAccountId } = resp.data;
      axios
        .get(
          `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${access_token}`
        )
        .then((response) => {
          console.log("LONG LIVE TOKEN RESPONSE", response.data);
          const {
            access_token: accessToken,
            token_type: tokenType,
            expires_in: expiresAt,
          } = response.data;
          const userId = String(session.user.id);
          const provider = "instagram";
          db.Integration.create({
            provider,
            providerAccountId,
            tokenType,
            expiresAt,
            userId,
            accessToken,
          })
            .then((success) => {
              console.log(success);
              return res.redirect(301, redirect_uri);
            })
            .catch((err) => console.log(err));
          return response.data;
        });
    })
    .catch((err) => {
      console.log("ERROR", err.response);
      return res.status(500);
    });
}
