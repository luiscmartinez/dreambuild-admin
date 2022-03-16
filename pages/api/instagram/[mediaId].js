import db from "../../../sequelize/models/index.js";
import { getMediaChildren } from "../../../lib/instagram/getMediaChildren.js";
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
  await runMiddleware(req, res, cors);

  const { mediaId } = req.query;
  if (!mediaId) {
    return res.status(400);
  }
  if (req.method === "GET") {
    const integration = await db.Integration.findOne({
      where: {
        provider: "instagram",
      },
    });
    if (integration === null) {
      console.log("INTEGRATIONNot found! alert someone");
      res.status(500);
    }
    console.log("INTEGRATION", integration);
    const { accessToken } = integration;
    try {
      const mediaRes = await getMediaChildren(accessToken, mediaId);
      console.log("MEDIA RESPONSE", mediaRes);
      res.status(200).json(mediaRes.data);
    } catch (err) {
      console.log("GETTING MEDIA CHILDREN ERROR", err.response.data);
      res.status(500);
    }
  }
}
