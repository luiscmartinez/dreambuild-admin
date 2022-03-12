import { getUserMedia } from "../../../lib/instagram/getUserMedia.js";
import db from "../../../sequelize/models/index.js";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: process.env.WHITELIST_DOMAIN,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors);
    const integration = await db.Integration.findOne({
      where: {
        provider: "instagram",
      },
    });
    const { accessToken } = integration;
    const mediaRes = await getUserMedia(accessToken);
    console.log("MEDIA RESPONSE", mediaRes);
    res.status(200).json(mediaRes.data);
    return;
  } catch (err) {
    console.log("GET INSTAGRAM MEDIA RESPONSE", err.response);
    res.status(500);
  }
}
