import db from "../../../sequelize/models/index.js";
import { getMediaChildren } from "../../../lib/instagram/getMediaChildren.js";
import { withCors } from "../../../middleware/withCors.js";

async function handler(req, res) {
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
    const { accessToken } = integration;
    try {
      const mediaRes = await getMediaChildren(accessToken, mediaId);
      res.status(200).json(mediaRes.data);
    } catch (err) {
      console.log("GETTING MEDIA CHILDREN ERROR", err.response.data);
      res.status(500);
    }
  }
}

export default withCors(handler);
